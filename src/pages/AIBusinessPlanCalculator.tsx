import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, Download, FileText, BrainCircuit } from 'lucide-react';

interface PlanSection {
  title: string;
  content: string;
}

const AIBusinessPlanCalculator: React.FC = () => {
  const [formData, setFormData] = useState({ idea: '', audience: '', monetization: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<PlanSection[] | null>(null);
  const [swot, setSwot] = useState<Record<string, string[]>>({});
  const [openSection, setOpenSection] = useState<number | null>(0);

  const handleGenerate = async (type: 'plan' | 'swot') => {
    if (!formData.idea) return;
    setIsGenerating(true);
    if (type === 'plan') setPlan(null);
    if (type === 'swot') setSwot({});

    setTimeout(() => {
      if (type === 'plan') {
        setPlan([
          { title: 'Executive Summary', content: `A concise overview for ${formData.idea}, targeting ${formData.audience}. Key objective is to achieve success via ${formData.monetization}.` },
          { title: 'Company Description', content: `Detailed description of ${formData.idea}, including the problems it solves for ${formData.audience}.` },
          { title: 'Market Analysis', content: `An analysis of the industry, market trends, and target audience demographics for a business like ${formData.idea}.` },
          { title: 'Marketing & Sales Strategy', content: `Strategy to attract ${formData.audience} using digital marketing, focusing on the ${formData.monetization} model.` },
          { title: 'Financial Projections', content: 'Projected financial statements based on the proposed monetization strategy.' },
        ]);
        setOpenSection(0);
      }
      if (type === 'swot') {
        setSwot({
            Strengths: ['Innovative Idea', 'Clear Target Audience', 'Scalable Model'],
            Weaknesses: ['New Market Entry', 'Initial Funding Required', 'Brand Recognition'],
            Opportunities: ['Growing Market for ' + formData.audience, 'Potential for ' + formData.monetization, 'Partnership Integrations'],
            Threats: ['Established Competitors', 'Market Saturation', 'Changing Regulations'],
        });
      }
      setIsGenerating(false);
    }, 2500);
  };

  const toggleSection = (index: number) => setOpenSection(openSection === index ? null : index);
  const commonInputClass = "w-full p-3 bg-brand-background border border-brand-border rounded-lg text-brand-foreground focus:ring-2 focus:ring-accent focus:border-accent";

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            AI Business Plan Generator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Generate a structured business plan and SWOT analysis from your ideas.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-4">
            <input value={formData.idea} onChange={(e) => setFormData({...formData, idea: e.target.value})} placeholder="Your Business Idea (e.g., Eco-friendly pet toys)" className={commonInputClass} />
            <input value={formData.audience} onChange={(e) => setFormData({...formData, audience: e.target.value})} placeholder="Target Audience (e.g., Millennial pet owners)" className={commonInputClass} />
            <input value={formData.monetization} onChange={(e) => setFormData({...formData, monetization: e.target.value})} placeholder="Monetization Strategy (e.g., Subscription box)" className={commonInputClass} />
          </div>
          <div className="mt-6 text-center flex flex-wrap justify-center gap-4">
            <button onClick={() => handleGenerate('plan')} disabled={isGenerating || !formData.idea} className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50 font-medium" data-cursor-hover>
              <FileText className="w-5 h-5" /> {isGenerating ? 'Generating...' : 'Generate Plan Outline'}
            </button>
            <button onClick={() => handleGenerate('swot')} disabled={isGenerating || !formData.idea} className="inline-flex items-center gap-2 bg-brand-border/50 text-brand-foreground px-6 py-3 rounded-lg hover:bg-brand-border disabled:opacity-50 font-medium" data-cursor-hover>
              <BrainCircuit className="w-5 h-5" /> Generate SWOT Analysis
            </button>
          </div>
        </motion.div>

        {plan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Your Business Plan Outline</h2>
            <div className="space-y-2">
              {plan.map((section, index) => (
                <div key={index} className="border border-brand-border rounded-lg overflow-hidden">
                  <button onClick={() => toggleSection(index)} className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg bg-brand-background/50 hover:bg-brand-background">
                    <span>{section.title}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSection === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openSection === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-4 pb-4 pt-2"><p className="text-brand-muted leading-relaxed">{section.content}</p></div></motion.div>}
                  </AnimatePresence>
                </div>
              ))}
            </div>
             <div className="text-center mt-6"><button className="inline-flex items-center gap-2 text-accent/80 hover:text-accent"><Download className="w-4 h-4" /> Download as PDF</button></div>
          </motion.div>
        )}
        
        {Object.keys(swot).length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">SWOT Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(swot).map(([title, items]) => (
                        <div key={title} className="bg-brand-background p-4 rounded-lg border border-brand-border">
                            <h3 className={`font-bold text-lg mb-2 ${title === 'Strengths' || title === 'Opportunities' ? 'text-green-500' : 'text-red-500'}`}>{title}</h3>
                            <ul className="list-disc list-inside space-y-1 text-brand-muted">
                                {items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIBusinessPlanCalculator;
