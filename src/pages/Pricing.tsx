import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const allPlans = [
    {
      name: 'Freemium',
      price: '₹0',
      description: 'Perfect for trying out our tools',
      features: {
        'AI Meeting Assistant': ['5 transcriptions/month', 'Basic transcription', 'Email support'],
        'Indian Language Writer': ['10 generations/month', 'Basic content quality', '5 Indian languages'],
        'GST Invoice Generator': ['3 invoices/month', 'Basic templates', 'PDF export']
      },
      cta: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: '₹1999',
      popular: true,
      description: 'Best for growing businesses and freelancers',
      features: {
        'AI Meeting Assistant': ['Unlimited transcriptions', 'AI-powered insights', 'Priority support'],
        'Indian Language Writer': ['Unlimited generations', 'High-quality content', 'All Indian languages'],
        'GST Invoice Generator': ['Unlimited invoices', 'Custom branding', 'Client management']
      },
      cta: 'Start Pro Trial'
    },
    {
      name: 'Business',
      price: '₹4999',
      description: 'For teams and larger organizations',
      features: {
        'AI Meeting Assistant': ['Everything in Pro', 'Team collaboration', 'Custom integrations'],
        'Indian Language Writer': ['Everything in Pro', 'Bulk generation', 'API access'],
        'GST Invoice Generator': ['Everything in Pro', 'Advanced reporting', 'Team management']
      },
      cta: 'Contact Sales'
    }
  ];

  const comparisonFeatures = [
    {
      category: 'AI Meeting Assistant',
      features: [
        { name: 'Monthly transcriptions', free: '5', pro: 'Unlimited', business: 'Unlimited' },
        { name: 'AI-powered insights', free: false, pro: true, business: true },
        { name: 'Action item extraction', free: false, pro: true, business: true },
        { name: 'Team collaboration', free: false, pro: false, business: true },
        { name: 'Custom integrations', free: false, pro: false, business: true }
      ]
    },
    {
      category: 'Indian Language Writer',
      features: [
        { name: 'Monthly generations', free: '10', pro: 'Unlimited', business: 'Unlimited' },
        { name: 'Content quality', free: 'Basic', pro: 'High', business: 'Premium' },
        { name: 'Indian languages', free: '5', pro: 'All', business: 'All + Custom' },
        { name: 'Bulk generation', free: false, pro: false, business: true },
        { name: 'API access', free: false, pro: false, business: true }
      ]
    },
    {
      category: 'GST Invoice Generator',
      features: [
        { name: 'Monthly invoices', free: '3', pro: 'Unlimited', business: 'Unlimited' },
        { name: 'Custom branding', free: false, pro: true, business: true },
        { name: 'Client management', free: false, pro: true, business: true },
        { name: 'Advanced reporting', free: false, pro: false, business: true },
        { name: 'Team management', free: false, pro: false, business: true }
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-brand-foreground mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-brand-muted max-w-3xl mx-auto">
            Scale your business with our comprehensive suite of AI-powered tools. 
            Start free and upgrade as you grow.
          </p>
        </motion.div>

        {/* Main Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {allPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${
                plan.popular
                  ? 'border-accent/50 bg-brand-card shadow-xl relative shadow-accent/10'
                  : 'border-brand-border bg-brand-card shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-brand-muted mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-brand-foreground mb-2">
                  {plan.price}
                  {plan.price !== '₹0' && (
                    <span className="text-lg font-normal text-brand-muted">/month</span>
                  )}
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {Object.entries(plan.features).map(([tool, features]) => (
                  <div key={tool}>
                    <h4 className="font-semibold text-brand-foreground mb-3">{tool}</h4>
                    <ul className="space-y-2">
                      {features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-brand-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-brand-border/50 text-brand-foreground hover:bg-brand-border'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-brand-card rounded-2xl shadow-lg p-8 mb-16 border border-brand-border/50"
        >
          <h2 className="text-3xl font-bold text-brand-foreground text-center mb-8">
            Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-border">
                  <th className="text-left py-4 px-6 font-semibold text-brand-foreground">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-brand-foreground">Freemium</th>
                  <th className="text-center py-4 px-6 font-semibold text-accent">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold text-brand-foreground">Business</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-brand-background/50">
                      <td colSpan={4} className="py-3 px-6 font-semibold text-brand-foreground">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, index) => (
                      <tr key={index} className="border-b border-brand-border/50">
                        <td className="py-4 px-6 text-brand-muted">{feature.name}</td>
                        <td className="py-4 px-6 text-center">
                          {typeof feature.free === 'boolean' ? (
                            feature.free ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-brand-muted mx-auto" />
                            )
                          ) : (
                            <span className="text-brand-muted">{feature.free}</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {typeof feature.pro === 'boolean' ? (
                            feature.pro ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-brand-muted mx-auto" />
                            )
                          ) : (
                            <span className="text-accent font-medium">{feature.pro}</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {typeof feature.business === 'boolean' ? (
                            feature.business ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-brand-muted mx-auto" />
                            )
                          ) : (
                            <span className="text-brand-muted">{feature.business}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-brand-card rounded-2xl shadow-lg p-8 border border-brand-border/50"
        >
          <h2 className="text-3xl font-bold text-brand-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-brand-foreground mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-brand-muted">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-brand-foreground mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-brand-muted">
                We accept all major credit cards, UPI, net banking, and digital wallets through Razorpay.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-brand-foreground mb-2">
                Is there a free trial for paid plans?
              </h3>
              <p className="text-brand-muted">
                Yes, you get a 7-day free trial for Pro and Business plans with full access to all features.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-brand-foreground mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-brand-muted">
                We offer a 30-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-brand-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-brand-muted mb-8">
            Join thousands of businesses using A-Plus Tools to streamline their operations
          </p>
          <button className="bg-accent text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-colors">
            Start Your Free Trial
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
