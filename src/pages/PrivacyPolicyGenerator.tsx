import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, CheckCircle } from 'lucide-react';

const PrivacyPolicyGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    dataTypes: 'personal identification information (name, email address, etc.), non-personal identification information (browser name, type of computer, etc.)',
  });
  const [policy, setPolicy] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePolicy = () => {
    const { companyName, websiteUrl, dataTypes } = formData;
    if (!companyName || !websiteUrl) {
      alert('Please fill in Company Name and Website URL.');
      return;
    }
    const generated = `
# Privacy Policy for ${companyName}

Last updated: ${new Date().toLocaleDateString()}

${companyName} ("us", "we", or "our") operates the ${websiteUrl} website (the "Service").

This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

## Information Collection and Use

We collect several different types of information for various purposes to provide and improve our Service to you.

### Types of Data Collected

While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: ${dataTypes}.

## Use of Data

${companyName} uses the collected data for various purposes:
- To provide and maintain the Service
- To notify you about changes to our Service
- To allow you to participate in interactive features of our Service when you choose to do so
- To provide customer care and support
- To provide analysis or valuable information so that we can improve the Service
- To monitor the usage of the Service
- To detect, prevent and address technical issues

## Contact Us

If you have any questions about this Privacy Policy, please contact us.
    `;
    setPolicy(generated.trim());
  };

  const handleCopy = async () => {
    if (!policy) return;
    await navigator.clipboard.writeText(policy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commonInputClass = "w-full px-4 py-2 bg-brand-background border-2 border-brand-border rounded-lg text-brand-foreground focus:ring-accent focus:border-accent";

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Privacy Policy Generator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Generate a basic privacy policy for your website or app.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 space-y-6 bg-brand-card border border-brand-border rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold">Your Details</h3>
            <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">Company Name</label>
              <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className={commonInputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">Website URL</label>
              <input type="text" value={formData.websiteUrl} onChange={e => setFormData({...formData, websiteUrl: e.target.value})} className={commonInputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">Types of Data Collected</label>
              <textarea value={formData.dataTypes} onChange={e => setFormData({...formData, dataTypes: e.target.value})} className={`${commonInputClass} h-24 resize-none`} />
            </div>
            <button onClick={generatePolicy} className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 font-medium" data-cursor-hover>
              Generate Policy
            </button>
            <p className="text-xs text-brand-muted text-center">This is a basic template. For full legal compliance, consult a professional.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-brand-card border border-brand-border rounded-xl p-6 relative"
          >
            <h3 className="text-xl font-semibold mb-4">Generated Policy</h3>
            {policy && (
              <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-brand-background rounded-md hover:bg-brand-border/50" title="Copy" data-cursor-hover>
                {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-brand-muted" />}
              </button>
            )}
            <pre className="w-full h-[500px] p-4 bg-brand-background border-2 border-brand-border rounded-lg text-brand-foreground whitespace-pre-wrap overflow-y-auto font-sans text-sm">
              {policy || 'Your generated policy will appear here...'}
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyGenerator;
