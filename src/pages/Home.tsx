import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Paintbrush, ShieldCheck, Shuffle, Wrench, User } from 'lucide-react';
import SpotlightCard from '../components/animations/SpotlightCard';
import CardSwap, { Card } from '../components/animations/CardSwap';

const Home: React.FC = () => {
  const mainCategories = [
    {
      icon: BriefcaseBusiness,
      title: 'Business Tools',
      description: 'Streamline your operations, from invoicing to strategic planning.',
      link: '/business-tools',
    },
    {
      icon: Paintbrush,
      title: 'Creator Tools',
      description: 'Unleash your creativity with AI writers, image tools, and more.',
      link: '/creator-tools',
    },
     {
      icon: Wrench,
      title: 'Utilities',
      description: 'Powerful utilities like OCR, transcription, and file compression.',
      link: '/utilities',
    },
    {
      icon: ShieldCheck,
      title: 'Legal & Compliance',
      description: 'Generate privacy policies, T&Cs, and stay compliant effortlessly.',
      link: '/legal-tools',
    },
    {
      icon: Shuffle,
      title: 'File Converters',
      description: 'Convert documents, images, audio, and video formats with ease.',
      link: '/all-converters',
    },
  ];

  const businessTools = [
    { title: 'AI Business Plan Calculator', link: '/ai-business-plan-calculator' },
    { title: 'AI Marketing Budget Calculator', link: '/ai-marketing-budget-calculator' },
    { title: 'AI Meeting Assistant', link: '/ai-meeting-assistant' },
    { title: 'GST Invoice Generator', link: '/gst-invoice-generator' },
  ].sort((a, b) => a.title.localeCompare(b.title));

  const creatorTools = [
    { title: 'Code Formatter', link: '/code-formatter' },
    { title: 'Color Palette Generator', link: '/color-palette-generator' },
    { title: 'Image Format Converter', link: '/image-format-converter' },
    { title: 'Image Resizer', link: '/image-resizer' },
    { title: 'Indian Language AI Writer', link: '/indian-language-writer' },
    { title: 'Text Case Converter', link: '/text-case-converter' },
  ].sort((a, b) => a.title.localeCompare(b.title));

  const utilityTools = [
    { title: 'Audio to Text', link: '/audio-to-text' },
    { title: 'File Compressor', link: '/file-compressor' },
    { title: 'Image to Text (OCR)', link: '/image-to-text' },
    { title: 'QR Code Generator', link: '/qr-code-generator' },
  ].sort((a, b) => a.title.localeCompare(b.title));

  const testimonials = [
    {
      name: 'Sarah L.',
      role: 'Freelance Designer',
      quote: 'FluxKit has become my go-to. The Color Palette Generator is a lifesaver, and the invoice tool is so simple. It saves me hours every week!',
    },
    {
      name: 'Amit P.',
      role: 'Small Business Owner',
      quote: 'The GST Invoice Generator is a game-changer for my business. Professional, compliant, and incredibly easy to use. Highly recommended!',
    },
    {
      name: 'Rina K.',
      role: 'Digital Marketer',
      quote: 'I use the AI Writer and Marketing Budget Calculator daily. The quality of the output is fantastic and helps me strategize much more effectively.',
    },
  ];
  
  const ToolListSection: React.FC<{id: string, title: string, description: string, tools: {title: string, link: string}[], icon: React.ElementType}> = ({id, title, description, tools, icon: Icon}) => (
     <section id={id} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-brand-foreground mb-4 flex items-center justify-center gap-4">
              <Icon className="w-10 h-10 text-accent" />
              {title}
            </h2>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <SpotlightCard className="hover:-translate-y-0.5 transition-transform">
                  <Link to={tool.link} className="flex justify-between items-center h-full">
                    <h3 className="text-lg font-semibold text-brand-foreground">{tool.title}</h3>
                    <ArrowRight className="w-5 h-5 text-accent opacity-100 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );

  return (
    <div className="text-brand-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-brand-background"></div>
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_center,rgba(47,70,115,0.6)_0%,transparent_45%)]"></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -inset-40 bg-[conic-gradient(from_180deg_at_50%_50%,#2F4673_0%,#7c8aa8_25%,#2F4673_50%,#7c8aa8_75%,#2F4673_100%)] opacity-10 blur-3xl" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-brand-foreground leading-tight">
              <span className="block">The Ultimate Toolkit for</span>
              <span className="block text-accent">Creators & Modern Businesses</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-brand-foreground max-w-3xl mx-auto">
              AI-powered design and productivity tools to create, publish, and grow your brand — fast and beautifully.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-[0_12px_30px_rgba(56,59,67,0.12)] hover:shadow-[0_18px_40px_rgba(56,59,67,0.18)] animate-subtle-glow"
              data-cursor-hover
            >
              <span>Start Creating — It's Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {mainCategories.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <SpotlightCard className="flex flex-col h-full">
                  <div className={`w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6`}>
                    <tool.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-foreground mb-4">
                    {tool.title}
                  </h3>
                  <p className="text-brand-foreground mb-6 flex-grow">
                    {tool.description}
                  </p>
                  <Link
                    to={tool.link}
                    className="inline-flex items-center space-x-2 text-accent font-medium hover:underline mt-auto"
                  >
                    <span>Explore Tools</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-brand-foreground mb-4">
              How FluxKit Works
            </h2>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto">
              Pick a category, choose a tool, follow the guided steps, and export your result.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              title: 'Browse Categories',
              desc: 'Business, Creator, Legal & Compliance, and Utilities.',
              icon: BriefcaseBusiness
            }, {
              title: 'Choose a Tool',
              desc: 'Each tool has a clean UI with helpful defaults.',
              icon: Paintbrush
            }, {
              title: 'Use Guided Steps',
              desc: 'Inputs, previews, and tips to get great results.',
              icon: ShieldCheck
            }, {
              title: 'Export & Share',
              desc: 'Download, copy, or keep working in other tools.',
              icon: Shuffle
            }].map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.06 }} viewport={{ once: true, amount: 0.4 }}>
                <SpotlightCard>
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-foreground mb-2">{item.title}</h3>
                  <p className="text-brand-muted">{item.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-brand-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto">
              Trusted by freelancers and businesses worldwide.
            </p>
          </motion.div>
          <CardSwap>
            {testimonials.map((t, i) => (
              <Card key={i}>
                <p className="text-brand-muted text-lg italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-foreground">{t.name}</p>
                    <p className="text-brand-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-brand-card/50 rounded-2xl p-12 border border-accent/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-foreground mb-6">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-brand-muted/80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using FluxKit to streamline their operations
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-brand-foreground text-brand-background px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-foreground/90 transition-colors"
              data-cursor-hover
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
