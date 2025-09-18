import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { title: 'AI Business Plan Calculator', link: '/ai-business-plan-calculator' },
  { title: 'AI Marketing Budget Calculator', link: '/ai-marketing-budget-calculator' },
  { title: 'AI Meeting Assistant', link: '/ai-meeting-assistant' },
  { title: 'GST Invoice Generator', link: '/gst-invoice-generator' },
];

const BusinessTools: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Business Tools</h1>
    <p className="text-brand-muted text-lg mb-8">Streamline your operations, from invoicing to strategic planning.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.sort((a,b)=>a.title.localeCompare(b.title)).map(i=> (
        <Link key={i.title} to={i.link} className="bg-brand-card border border-brand-border rounded-lg p-4 hover:border-accent transition-colors" data-cursor-hover>
          {i.title}
        </Link>
      ))}
    </div>
  </div>
);

export default BusinessTools;
