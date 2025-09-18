import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Link as LinkIcon, Wifi, User, Mail, Square, Circle, Eye } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

type QRType = 'url' | 'wifi' | 'vcard' | 'email';
type DotStyle = 'squares' | 'dots' | 'rounded';
type CornerStyle = 'square' | 'extra-rounded' | 'dot';

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    margin: 5,
    type: 'svg',
    dotsOptions: {
        color: "#0D0D0D",
        type: "squares"
    },
    backgroundOptions: {
        color: "#FFFFFF",
    },
    cornersSquareOptions: {
        type: "square"
    },
    cornersDotOptions: {
        type: "square"
    }
});

const QRCodeGenerator: React.FC = () => {
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrData, setQrData] = useState({
    url: 'https://aplus.tools',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    vcard: { name: '', phone: '', email: '' },
    email: { to: '', subject: '', body: '' },
  });
  
  const [fgColor, setFgColor] = useState('#0D0D0D');
  const [dotStyle, setDotStyle] = useState<DotStyle>('squares');
  const [cornerStyle, setCornerStyle] = useState<CornerStyle>('square');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  const getQrValue = () => {
    const data = qrData[qrType];
    switch (qrType) {
      case 'url': return qrData.url;
      case 'wifi': return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};;`;
      case 'vcard': return `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTEL:${data.phone}\nEMAIL:${data.email}\nEND:VCARD`;
      case 'email': return `mailto:${data.to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
      default: return '';
    }
  };

  useEffect(() => {
    qrCode.update({
        data: getQrValue(),
        dotsOptions: { color: fgColor, type: dotStyle },
        cornersSquareOptions: { type: cornerStyle },
        cornersDotOptions: { type: cornerStyle },
    });
  }, [qrData, qrType, fgColor, dotStyle, cornerStyle]);

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (qrType === 'url') {
        setQrData(prev => ({...prev, url: value}));
    } else {
        setQrData(prev => ({ ...prev, [qrType]: { ...prev[qrType], [name]: value } }));
    }
  };

  const downloadQRCode = () => qrCode.download({ name: "qrcode", extension: "png" });
  
  const renderForm = () => {
    const commonInputClass = "w-full px-4 py-2 bg-brand-background border border-brand-border rounded-lg text-brand-foreground focus:ring-2 focus:ring-accent focus:border-accent";
    switch(qrType) {
        case 'wifi': return (<div className="space-y-4">
            <input name="ssid" value={qrData.wifi.ssid} onChange={handleDataChange} placeholder="Network Name (SSID)" className={commonInputClass} />
            <input name="password" type="password" value={qrData.wifi.password} onChange={handleDataChange} placeholder="Password" className={commonInputClass} />
            <select name="encryption" value={qrData.wifi.encryption} onChange={handleDataChange} className={commonInputClass}><option>WPA</option><option>WEP</option><option>nopass</option></select>
        </div>);
        case 'vcard': return (<div className="space-y-4">
            <input name="name" value={qrData.vcard.name} onChange={handleDataChange} placeholder="Full Name" className={commonInputClass} />
            <input name="phone" type="tel" value={qrData.vcard.phone} onChange={handleDataChange} placeholder="Phone Number" className={commonInputClass} />
            <input name="email" type="email" value={qrData.vcard.email} onChange={handleDataChange} placeholder="Email Address" className={commonInputClass} />
        </div>);
        case 'email': return (<div className="space-y-4">
            <input name="to" type="email" value={qrData.email.to} onChange={handleDataChange} placeholder="Recipient Email" className={commonInputClass} />
            <input name="subject" value={qrData.email.subject} onChange={handleDataChange} placeholder="Subject" className={commonInputClass} />
            <textarea name="body" value={qrData.email.body} onChange={handleDataChange} placeholder="Email Body" className={`${commonInputClass} h-20 resize-none`}></textarea>
        </div>);
        default: return <input name="url" value={qrData.url} onChange={handleDataChange} placeholder="Enter URL or text" className={commonInputClass} />;
    }
  };

  const qrTypes = [ { id: 'url', name: 'URL', icon: LinkIcon }, { id: 'wifi', name: 'WiFi', icon: Wifi }, { id: 'vcard', name: 'vCard', icon: User }, { id: 'email', name: 'Email', icon: Mail }];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">Advanced QR Code Generator</h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">Create custom QR codes with advanced styling options.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center">
              <div ref={ref} className="p-4 bg-white rounded-lg shadow-lg" />
              <button onClick={downloadQRCode} className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium mt-6" data-cursor-hover>
                <Download className="w-5 h-5" /><span>Download PNG</span>
              </button>
            </div>

            <div className="space-y-6">
                <div className="flex space-x-1 bg-brand-background p-1 rounded-lg">
                    {qrTypes.map(type => (
                        <button key={type.id} onClick={() => setQrType(type.id as QRType)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${qrType === type.id ? 'bg-accent text-accent-foreground' : 'hover:bg-brand-border/50'}`}>
                            <type.icon className="w-4 h-4" /><span>{type.name}</span>
                        </button>
                    ))}
                </div>

                <div className="space-y-4">{renderForm()}</div>
                
                <div className="border-t border-brand-border pt-4 space-y-4">
                    <h3 className="text-lg font-medium">Customization</h3>
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-brand-muted">Color:</label>
                        <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 bg-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-muted mb-2">Dot Style</label>
                        <div className="flex gap-2">
                           <button onClick={() => setDotStyle('squares')} className={`p-2 rounded-md ${dotStyle === 'squares' ? 'bg-accent text-accent-foreground' : 'bg-brand-background'}`}><Square/></button>
                           <button onClick={() => setDotStyle('dots')} className={`p-2 rounded-md ${dotStyle === 'dots' ? 'bg-accent text-accent-foreground' : 'bg-brand-background'}`}><Circle/></button>
                           <button onClick={() => setDotStyle('rounded')} className={`p-2 rounded-md ${dotStyle === 'rounded' ? 'bg-accent text-accent-foreground' : 'bg-brand-background'}`}><div className="w-6 h-6 rounded-md border-2 border-current"/></button>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-brand-muted mb-2">Corner Style</label>
                        <div className="flex gap-2">
                           <button onClick={() => setCornerStyle('square')} className={`p-2 rounded-md ${cornerStyle === 'square' ? 'bg-accent text-accent-foreground' : 'bg-brand-background'}`}><Eye/></button>
                           <button onClick={() => setCornerStyle('dot')} className={`p-2 rounded-md ${cornerStyle === 'dot' ? 'bg-accent text-accent-foreground' : 'bg-brand-background'}`}><Circle className="fill-current"/></button>
                           <button onClick={() => setCornerStyle('extra-rounded')} className={`p-2 rounded-md ${cornerStyle === 'extra-rounded' ? 'bg-accent text-accent-foreground' : 'bg-brand-background'}`}><div className="w-6 h-6 rounded-lg border-2 border-current"/></button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
