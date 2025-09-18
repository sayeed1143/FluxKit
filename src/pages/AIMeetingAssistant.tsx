import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mic, FileAudio, Play, Download, CheckCircle, Star } from 'lucide-react';

const AIMeetingAssistant: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([]);
  const [actionItems, setActionItems] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleTranscribe = async () => {
    if (!file) return;
    
    setIsTranscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setTranscription(`
        [00:01] John: Good morning everyone, thanks for joining today's product strategy meeting.
        [00:15] Sarah: I've prepared the quarterly review slides. Our user engagement is up 25%.
        [00:30] Mike: That's great news. We should focus on the mobile app improvements for Q2.
        [00:45] John: Agreed. Sarah, can you prepare a detailed roadmap by Friday?
        [01:00] Sarah: Absolutely, I'll have it ready.
        [01:15] Mike: We also need to address the customer feedback about the checkout process.
        [01:30] John: Good point. Let's schedule a UX review session next week.
      `);
      
      setKeyTakeaways([
        'User engagement increased by 25% this quarter',
        'Mobile app improvements are priority for Q2',
        'Customer feedback indicates checkout process needs improvement',
        'Team performance exceeding expectations'
      ]);
      
      setActionItems([
        'Sarah to prepare detailed Q2 roadmap by Friday',
        'Schedule UX review session for checkout process next week',
        'Review mobile app feature prioritization',
        'Follow up on user engagement metrics'
      ]);
      
      setIsTranscribing(false);
    }, 3000);
  };

  const pricingPlans = [
    {
      name: 'Freemium',
      price: '₹0',
      features: [
        '5 transcriptions per month',
        'Basic transcription',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: '₹999',
      popular: true,
      features: [
        'Unlimited transcriptions',
        'AI-powered key takeaways',
        'Action item extraction',
        'Priority support',
        'Export to multiple formats'
      ]
    },
    {
      name: 'Business',
      price: '₹2499',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom integrations',
        'Advanced analytics',
        'Dedicated account manager'
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
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            AI Meeting Assistant
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Transform your meeting recordings into actionable insights with AI-powered transcription and analysis
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-brand-card rounded-xl shadow-lg p-8 mb-8 border border-brand-border/50"
        >
          <h2 className="text-2xl font-semibold text-brand-foreground mb-6">
            Upload Your Meeting Recording
          </h2>
          
          <div className="border-2 border-dashed border-brand-border rounded-lg p-8 text-center">
            {!file ? (
              <div>
                <Upload className="w-12 h-12 text-brand-muted mx-auto mb-4" />
                <p className="text-brand-muted mb-4">
                  Drag and drop your audio file here, or click to browse
                </p>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg cursor-pointer hover:bg-accent/90 transition-colors"
                >
                  <FileAudio className="w-5 h-5" />
                  <span>Choose File</span>
                </label>
                <p className="text-sm text-brand-muted mt-4">
                  Supported formats: MP3, WAV, M4A (Max size: 50MB)
                </p>
              </div>
            ) : (
              <div>
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-brand-foreground font-medium mb-2">{file.name}</p>
                <p className="text-brand-muted mb-6">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  onClick={handleTranscribe}
                  disabled={isTranscribing}
                  className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-5 h-5" />
                  <span>{isTranscribing ? 'Transcribing...' : 'Transcribe Meeting'}</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        {transcription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Transcription */}
            <div className="bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-brand-foreground">
                  Full Transcription
                </h3>
                <button className="text-accent hover:text-accent/80">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-brand-background rounded-lg p-4 max-h-64 overflow-y-auto">
                <pre className="text-sm text-brand-muted whitespace-pre-wrap">
                  {transcription}
                </pre>
              </div>
            </div>

            {/* Key Takeaways & Action Items */}
            <div className="space-y-6">
              <div className="bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border/50">
                <h3 className="text-xl font-semibold text-brand-foreground mb-6">
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-brand-muted">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border/50">
                <h3 className="text-xl font-semibold text-brand-foreground mb-6">
                  Action Items
                </h3>
                <ul className="space-y-3">
                  {actionItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-brand-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-brand-card rounded-xl shadow-lg p-8 border border-brand-border/50"
        >
          <h2 className="text-2xl font-semibold text-brand-foreground text-center mb-8">
            Choose Your Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-6 border-2 ${
                  plan.popular
                    ? 'border-accent/50 bg-accent/10'
                    : 'border-brand-border bg-brand-card'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-brand-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-brand-foreground">
                    {plan.price}
                    <span className="text-sm font-normal text-brand-muted">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-brand-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-brand-border text-brand-foreground hover:bg-brand-border/70'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIMeetingAssistant;
