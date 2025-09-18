import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, FileSignature, Cookie, AlertTriangle, FileLock, Undo2, Globe, Building, Code, RefreshCw, Pencil, Apple, Bot, Facebook, ShoppingCart } from 'lucide-react';

const LegalTools: React.FC = () => {
  const mainTools = [
    { name: 'Privacy Policy Generator', icon: FileText, link: '/privacy-policy-generator', description: 'For collecting personal data legally and ensuring compliance.' },
    { name: 'Terms & Conditions Generator', icon: FileSignature, link: '/terms-and-conditions-generator', description: 'Set rules, protect your business, and manage user expectations.' },
    { name: 'Privacy Consent (Cookies)', icon: Cookie, link: '/cookies-policy-generator', description: 'Manage cookie banners, embedded content, and full user consent.' },
  ];

  const allTools = [
      ...mainTools,
      { name: 'EULA Generator', icon: FileLock, link: '/eula-generator', description: 'Safeguard your app with an End-User License Agreement (EULA).' },
      { name: 'Disclaimer Generator', icon: AlertTriangle, link: '/disclaimer-generator', description: 'Create legal disclaimers and disclosures to protect your business.' },
      { name: 'Return and Refund Policy', icon: Undo2, link: '/return-and-refund-policy-generator', description: 'Provide transparency and protect your ecommerce business.' },
      { name: 'Terms of Service Generator', icon: FileSignature, link: '/terms-of-service-generator', description: 'Establish terms to protect your business and set clear user rules.' },
      { name: 'Terms of Use Generator', icon: FileSignature, link: '/terms-of-use-generator', description: 'Define acceptable use and protect your business.' },
  ];

  const complianceRegions = [
    { name: 'United States', description: 'Various state laws like CCPA and CPRA require a Privacy Policy, opt-out mechanisms, and additional compliance measures.' },
    { name: 'Europe', description: 'Regulations such as the GDPR and ePrivacy Directive require a Privacy Policy, user consent for cookies, and other compliance steps.' },
    { name: 'Canada', description: 'Laws like PIPEDA mandate a Privacy Policy, opt-out mechanisms, and additional privacy requirements.' },
    { name: 'United Kingdom (UK)', description: 'UK regulations require businesses to have a Privacy Policy, Return & Refund Policy, disclosures, and opt-out mechanisms.' },
    { name: 'Australia', description: 'Australia\'s privacy laws require a Privacy Policy and compliance with multiple privacy-related requirements.' },
  ];
  
  const complianceLaws = ['CCPA+CPRA', 'CalOPPA', 'GDPR', 'PIPEDA', 'ePrivacy'];

  const toolboxFeatures = [
      { name: 'Agreements & Policies', icon: FileText, description: 'Generate policies your business needs to stay compliant with laws like GDPR, CCPA+CPRA, CalOPPA, and more.' },
      { name: 'Consent Management', icon: Cookie, description: 'Use our free tools for cookie consent, or upgrade to an all-in-one platform for managing cookies, scripts, and embeds.' },
      { name: 'Stay Up to Date', icon: RefreshCw, description: 'Get notified when laws change and know exactly when to update your agreements and policies.' },
      { name: 'Make it Yours', icon: Pencil, description: 'Customize everything to match your business and brand—tailor your agreements, policies, and even your cookie consent banner.' },
  ];

  const thirdPartyCompliance = [
      { name: 'Google Analytics', icon: Bot, description: 'Requires a Privacy Policy and consent management for all websites using analytics tools.' },
      { name: 'Apple App Store', icon: Apple, description: 'All app developers must provide a Privacy Policy, Terms and Conditions (T&C), or EULA.' },
      { name: 'Google Play Store', icon: Bot, description: 'App developers are required to have a Privacy Policy and meet additional compliance requirements.' },
      { name: 'PayPal', icon: Building, description: 'Businesses must comply with privacy laws and regulations, which includes having a Privacy Policy.' },
      { name: 'Google Ads', icon: Bot, description: 'A Privacy Policy and consent management are mandatory before running ad campaigns like remarketing.' },
      { name: 'Facebook', icon: Facebook, description: 'A Privacy Policy is required if you run ad remarketing campaigns, manage a Facebook Page, or have a Facebook app.' },
      { name: 'Amazon', icon: ShoppingCart, description: 'Website owners who post affiliate links must include an affiliate disclaimer.' },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-foreground mb-4">
            Privacy Compliance, All-in-One Place.
          </h1>
          <p className="text-xl text-brand-muted max-w-3xl mx-auto">
            Stay ahead of ever-changing privacy regulations with our powerful compliance platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {mainTools.map((tool, index) => (
            <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-brand-card border border-brand-border rounded-xl p-8 text-center group hover:border-accent/50 transition-all" data-cursor-hover>
              <div className="w-12 h-12 bg-brand-background rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/10 transition-colors">
                <tool.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-brand-foreground mb-2">{tool.name}</h3>
              <p className="text-brand-muted mb-4">{tool.description}</p>
              <Link to={tool.link} className="font-semibold text-accent hover:text-accent/80">Try it now &rarr;</Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">Compliance Everywhere? Covered.</h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto mb-10">A Privacy Policy is legally required if you collect personal data from users. Terms & Conditions are essential if your site has user-generated content. Using affiliate links? A Disclaimer is a must. Whatever compliance requirement you have, we've got you covered.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {complianceRegions.map(region => (
                    <div key={region.name} className="bg-brand-card border border-brand-border rounded-lg p-4">
                        <h4 className="font-bold text-lg mb-2">{region.name}</h4>
                        <p className="text-sm text-brand-muted">{region.description}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                {complianceLaws.map(law => <span key={law} className="px-4 py-2 bg-brand-card border border-brand-border rounded-full text-brand-muted font-medium">{law}</span>)}
            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">All Compliance Solutions, with A-Plus Tools.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allTools.map((tool, index) => (
                     <Link to={tool.link} key={index} className="block bg-brand-card border border-brand-border rounded-xl p-6 group hover:border-accent/50 transition-all" data-cursor-hover>
                        <div className="flex items-center space-x-4 mb-3">
                            <div className="w-10 h-10 bg-brand-background rounded-lg flex items-center justify-center">
                                <tool.icon className="w-5 h-5 text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold text-brand-foreground">{tool.name}</h3>
                        </div>
                        <p className="text-brand-muted">{tool.description}</p>
                    </Link>
                ))}
            </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">The perfect compliance toolbox at your fingertips.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {toolboxFeatures.map(feature => (
                    <div key={feature.name} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
                            <feature.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-brand-foreground mb-2">{feature.name}</h4>
                            <p className="text-brand-muted">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-center mb-4">Third-Party Compliance? Checked.</h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto text-center mb-10">Third-party services and platforms often come with legal requirements, from privacy laws to mandatory disclosures. We'll help you stay compliant with ease.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {thirdPartyCompliance.map(item => (
                    <div key={item.name} className="bg-brand-card border border-brand-border rounded-lg p-4 flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-brand-background rounded-md flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-brand-muted" />
                        </div>
                        <div>
                            <h5 className="font-semibold text-brand-foreground">{item.name}</h5>
                            <p className="text-xs text-brand-muted">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LegalTools;
