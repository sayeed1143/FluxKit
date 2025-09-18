import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerLinks = {
    Info: [
      { name: 'Pricing', path: '/pricing' },
      { name: 'Formats', path: '/formats' },
    ],
    Help: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Support', path: '/support' },
      { name: 'Status', path: '/status' },
    ],
    Resources: [
      { name: 'Documentation', path: '/documentation' },
      { name: 'Apps', path: '/apps' },
      { name: 'Blog', path: '/blog' },
    ],
    Company: [
      { name: 'About', path: '/about' },
      { name: 'Terms', path: '/terms' },
      { name: 'Privacy', path: '/privacy' },
    ],
  };

  return (
    <footer className="bg-brand-card text-brand-foreground border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">A+</span>
              </div>
              <span className="text-xl font-bold">A-Plus Tools</span>
            </div>
            <p className="text-brand-muted max-w-xs">
              A comprehensive suite of AI-powered tools to streamline your workflow.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4 text-brand-foreground">{title}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-brand-muted hover:text-accent transition-colors" data-cursor-hover>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-brand-border/30 mt-12 pt-8 text-center">
          <p className="text-brand-muted">
            © 2025 A-Plus Tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
