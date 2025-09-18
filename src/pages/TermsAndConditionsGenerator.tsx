import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSignature, Copy, CheckCircle } from 'lucide-react';

const TermsAndConditionsGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    governingLaw: 'India',
  });
  const [terms, setTerms] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTerms = () => {
    const { companyName, websiteUrl, governingLaw } = formData;
    if (!companyName || !websiteUrl) {
      alert('Please fill in Company Name and Website URL.');
      return;
    }
    const generated = `
# Terms and Conditions for ${companyName}

Last updated: ${new Date().toLocaleDateString()}

Welcome to ${websiteUrl}!

These terms and conditions outline the rules and regulations for the use of ${companyName}'s Website, located at ${websiteUrl}.

By accessing this website we assume you accept these terms and conditions. Do not continue to use ${websiteUrl} if you do not agree to take all of the terms and conditions stated on this page.

## License

Unless otherwise stated, ${companyName} and/or its licensors own the intellectual property rights for all material on ${websiteUrl}. All intellectual property rights are reserved. You may access this from ${websiteUrl} for your own personal use subjected to restrictions set in these terms and conditions.

You must not:
- Republish material from ${websiteUrl}
- Sell, rent or sub-license material from ${websiteUrl}
- Reproduce, duplicate or copy material from ${websiteUrl}
- Redistribute content from ${websiteUrl}

## Governing Law

These Terms shall be governed and construed in accordance with the laws of ${governingLaw}, without regard to its conflict of law provisions.

## Contact Us

If you have any questions about these Terms, please contact us.
    `;
    setTerms(generated.trim());
  };

  const handleCopy = async () => {
    if (!terms) return;
    await navigator.clipboard.writeText(terms);
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
            <FileSignature className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Terms & Conditions Generator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Set rules, protect your business, and manage user expectations.
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
              <label className="block text-sm font-medium text-brand-muted mb-2">Governing Law (Country/State)</label>
              <input type="text" value={formData.governingLaw} onChange={e => setFormData({...formData, governingLaw: e.target.value})} className={commonInputClass} />
            </div>
            <button onClick={generateTerms} className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 font-medium" data-cursor-hover>
              Generate T&C
            </button>
            <p className="text-xs text-brand-muted text-center">This is a basic template. For full legal compliance, consult a professional.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-brand-card border border-brand-border rounded-xl p-6 relative"
          >
            <h3 className="text-xl font-semibold mb-4">Generated T&C</h3>
            {terms && (
              <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-brand-background rounded-md hover:bg-brand-border/50" title="Copy" data-cursor-hover>
                {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-brand-muted" />}
              </button>
            )}
            <pre className="w-full h-[500px] p-4 bg-brand-background border-2 border-brand-border rounded-lg text-brand-foreground whitespace-pre-wrap overflow-y-auto font-sans text-sm">
              {terms || 'Your generated T&C will appear here...'}
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsGenerator;
