import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Copy, Download, CheckCircle, Languages } from 'lucide-react';

const IndianLanguageWriter: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: 'hindi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'marathi', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'kannada', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'malayalam', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const sampleContent = {
        hindi: `आपके व्यापार के लिए एक प्रभावी रणनीति बनाना अत्यंत महत्वपूर्ण है। यह न केवल आपकी वर्तमान स्थिति को मजबूत बनाता है बल्कि भविष्य की चुनौतियों के लिए भी तैयार करता है।

मुख्य बिंदु:
• बाजार अनुसंधान और प्रतिस्पर्धी विश्लेषण
• ग्राहक आधार की पहचान और लक्ष्यीकरण
• उत्पाद या सेवा की गुणवत्ता में निरंतर सुधार
• डिजिटल मार्केटिंग और ऑनलाइन उपस्थिति

सफलता के लिए धैर्य, दृढ़ता और निरंतर सीखने की भावना आवश्यक है।`,
        
        tamil: `உங்கள் வணிகத்திற்கு ஒரு பயனுள்ள மூலோபாயத்தை உருவாக்குவது மிகவும் முக்கியம். இது உங்கள் தற்போதைய நிலையை வலுப்படுத்துவது மட்டுமின்றி எதிர்கால சவால்களுக்கும் தயார்படுத்துகிறது।

முக்கிய புள்ளிகள்:
• சந்தை ஆராய்ச்சி மற்றும் போட்டி பகுப்பாய்வு
• வாடிக்கையாளர் அடிப்படையை அடையாளம் காணுதல் மற்றும் இலக்கு வைத்தல்
• தயாரிப்பு அல்லது சேவையின் தரத்தில் தொடர்ச்சியான முன்னேற்றம்
• டிஜிட்டல் மார்க்கெட்டிங் மற்றும் ஆன்லைன் இருப்பு

வெற்றிக்கு பொறுமை, உறுதி மற்றும் தொடர்ந்து கற்றுக்கொள்ளும் மனப்பான்மை அவசியம்.`,
        
        bengali: `আপনার ব্যবসার জন্য একটি কার্যকর কৌশল তৈরি করা অত্যন্ত গুরুত্বপূর্ণ। এটি শুধুমাত্র আপনার বর্তমান অবস্থানকে শক্তিশালী করে না বরং ভবিষ্যতের চ্যালেঞ্জের জন্যও প্রস্তুত করে।

মূল বিষয়সমূহ:
• বাজার গবেষণা এবং প্রতিযোগিতামূলক বিশ্লেষণ
• গ্রাহক ভিত্তি চিহ্নিতকরণ এবং লক্ষ্য নির্ধারণ
• পণ্য বা সেবার গুণমানে ক্রমাগত উন্নতি
• ডিজিটাল মার্কেটিং এবং অনলাইন উপস্থিতি

সাফল্যের জন্য ধৈর্য, দৃঢ়তা এবং ক্রমাগত শেখার মানসিকতা প্রয়োজন।`
      };
      
      setGeneratedContent(sampleContent[selectedLanguage as keyof typeof sampleContent] || sampleContent.hindi);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pricingPlans = [
    {
      name: 'Freemium',
      price: '₹0',
      features: [
        '10 generations per month',
        'Basic content quality',
        '5 Indian languages',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: '₹799',
      popular: true,
      features: [
        'Unlimited generations',
        'High-quality content',
        'All Indian languages',
        'Advanced AI models',
        'Priority support',
        'Export options'
      ]
    },
    {
      name: 'Business',
      price: '₹1999',
      features: [
        'Everything in Pro',
        'Custom tone settings',
        'Bulk generation',
        'API access',
        'Team collaboration',
        'Dedicated support'
      ]
    }
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-brand-background text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            Indian Language AI Writer
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Generate high-quality content in multiple Indian languages using advanced AI technology
          </p>
        </motion.div>

        {/* Content Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-brand-card rounded-xl shadow-lg p-8 mb-8 border border-brand-border/50"
        >
          <h2 className="text-2xl font-semibold text-brand-foreground mb-6">
            Generate Content
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-2">
                  Select Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-2">
                  Topic or Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your topic or detailed prompt here. For example: 'Write a business strategy article for small businesses'"
                  className="w-full px-4 py-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent h-32 resize-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </button>
            </div>
            
            {/* Output Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-brand-muted">
                  Generated Content
                </label>
                {generatedContent && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-brand-background rounded-lg p-4 h-64 overflow-y-auto border border-brand-border/50">
                {generatedContent ? (
                  <div className="text-brand-muted whitespace-pre-wrap leading-relaxed">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-brand-muted">
                    <div className="text-center">
                      <Languages className="w-12 h-12 mx-auto mb-3" />
                      <p>Generated content will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-brand-card rounded-xl shadow-lg p-8 mb-8 border border-brand-border/50"
        >
          <h3 className="text-xl font-semibold text-brand-foreground mb-6">
            Supported Languages & Features
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedLanguage === lang.code
                    ? 'bg-accent/20 border-2 border-accent'
                    : 'bg-brand-background border-2 border-transparent hover:bg-brand-background/70'
                }`}
              >
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="text-sm font-medium text-brand-foreground">
                  {lang.name.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <PenTool className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-medium text-brand-foreground mb-2">Multiple Content Types</h4>
              <p className="text-sm text-brand-muted">Articles, blogs, social media posts, and more</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Languages className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-medium text-brand-foreground mb-2">Cultural Context</h4>
              <p className="text-sm text-brand-muted">Content adapted to local culture and context</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-medium text-brand-foreground mb-2">High Quality</h4>
              <p className="text-sm text-brand-muted">Grammar-perfect, contextually relevant content</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IndianLanguageWriter;
