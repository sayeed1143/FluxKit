import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, BarChart2, BrainCircuit } from 'lucide-react';

interface BudgetResult {
  allocations: { channel: string; percentage: number; amount: number; color: string }[];
  totalBudget: number;
  recommendation: string;
}

const AIMarketingBudgetCalculator: React.FC = () => {
  const [formData, setFormData] = useState({ revenueGoal: 100000, industry: 'ecommerce', stage: 'growth' });
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<BudgetResult | null>(null);

  const handleCalculate = async () => {
    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      const budgetRatio = formData.stage === 'growth' ? 0.15 : 0.1;
      const totalBudget = formData.revenueGoal * budgetRatio;
      const allocations = [
        { channel: 'Google Ads', percentage: 35, amount: totalBudget * 0.35, color: 'bg-blue-500' },
        { channel: 'Meta Ads', percentage: 30, amount: totalBudget * 0.30, color: 'bg-sky-500' },
        { channel: 'Content Marketing', percentage: 20, amount: totalBudget * 0.20, color: 'bg-green-500' },
        { channel: 'Email Marketing', percentage: 10, amount: totalBudget * 0.10, color: 'bg-purple-500' },
        { channel: 'Affiliates', percentage: 5, amount: totalBudget * 0.05, color: 'bg-yellow-500' },
      ];
      setResult({
        allocations,
        totalBudget,
        recommendation: `For a ${formData.industry} business in the ${formData.stage} stage, a focus on performance marketing (Google/Meta) is key. Allocate a significant portion to content to build long-term authority.`
      });
      setIsCalculating(false);
    }, 2000);
  };
  
  const commonInputClass = "w-full p-3 bg-brand-background border border-brand-border rounded-lg text-brand-foreground focus:ring-2 focus:ring-accent focus:border-accent";

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-brand-foreground mb-4">
            AI Marketing Budget Calculator
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Get a strategic budget allocation and AI-powered recommendations.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">Revenue Goal (₹)</label>
              <input type="number" value={formData.revenueGoal} onChange={(e) => setFormData({...formData, revenueGoal: Number(e.target.value)})} className={commonInputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">Industry</label>
              <select value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} className={commonInputClass}>
                <option value="ecommerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="service">Service-based</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-brand-muted mb-2">Company Stage</label>
              <select value={formData.stage} onChange={(e) => setFormData({...formData, stage: e.target.value})} className={commonInputClass}>
                <option value="seed">Seed/Startup</option>
                <option value="growth">Growth</option>
                <option value="established">Established</option>
              </select>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button onClick={handleCalculate} disabled={isCalculating} className="bg-accent text-accent-foreground px-8 py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50 font-medium" data-cursor-hover>
              {isCalculating ? 'Calculating...' : 'Generate Budget Plan'}
            </button>
          </div>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-brand-card border border-brand-border rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <p className="text-brand-muted">Total Monthly Marketing Budget</p>
              <p className="text-4xl font-bold text-accent">₹{result.totalBudget.toLocaleString('en-IN')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><BarChart2 className="w-6 h-6 mr-2 text-accent" />Allocation Breakdown</h3>
                    <div className="space-y-4">
                      {result.allocations.map(alloc => (
                        <div key={alloc.channel}>
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="text-brand-muted">{alloc.channel}</span>
                            <span className="font-medium text-brand-foreground">₹{alloc.amount.toLocaleString('en-IN')} ({alloc.percentage}%)</span>
                          </div>
                          <div className="w-full bg-brand-background rounded-full h-2.5">
                            <div className={`${alloc.color} h-2.5 rounded-full`} style={{ width: `${alloc.percentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><BrainCircuit className="w-6 h-6 mr-2 text-accent" />AI Recommendation</h3>
                    <div className="bg-brand-background p-4 rounded-lg border border-brand-border">
                        <p className="text-brand-muted italic">{result.recommendation}</p>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIMarketingBudgetCalculator;
