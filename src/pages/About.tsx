import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Users, Linkedin } from 'lucide-react';

const About: React.FC = () => {
    const teamMembers = [
        { name: 'Alex Johnson', role: 'Founder & CEO', image: 'https://i.pravatar.cc/150?u=alex' },
        { name: 'Samantha Lee', role: 'Lead Designer', image: 'https://i.pravatar.cc/150?u=samantha' },
        { name: 'Michael Chen', role: 'Lead Engineer', image: 'https://i.pravatar.cc/150?u=michael' },
    ];

    const missionPoints = [
        { icon: Zap, title: 'Efficiency', description: 'To provide fast, reliable, and easy-to-use tools that save you time and effort.' },
        { icon: Target, title: 'Accessibility', description: 'To make powerful digital tools accessible to everyone, from freelancers to large enterprises.' },
        { icon: Users, title: 'Innovation', description: 'To continuously innovate and expand our toolkit to meet the evolving needs of modern professionals.' },
    ];

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 text-brand-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-brand-foreground mb-4">
            About A-Plus Tools
          </h1>
          <p className="text-xl text-brand-muted max-w-3xl mx-auto">
            We're building the ultimate toolkit to empower modern businesses and creators.
          </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="py-16"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {missionPoints.map((point, index) => (
                    <div key={index} className="bg-brand-card border border-brand-border rounded-xl p-8 text-center">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 border border-accent/20">
                            <point.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold text-brand-foreground mb-2">{point.title}</h3>
                        <p className="text-brand-muted">{point.description}</p>
                    </div>
                ))}
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="py-16 flex flex-col md:flex-row items-center gap-12"
        >
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-brand-muted leading-relaxed mb-4">
                    A-Plus Tools started from a simple idea: the best tools should be powerful, beautifully designed, and accessible to everyone. Frustrated by clunky, single-purpose websites, our founders set out to create a single, unified platform that brings together a comprehensive suite of utilities for businesses, developers, and creators.
                </p>
                <p className="text-brand-muted leading-relaxed">
                    Launched in 2025, we've grown from a small collection of converters to a full-fledged ecosystem of AI-powered solutions. Our journey is driven by our community, and we're committed to building the tools you need to succeed.
                </p>
            </div>
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" alt="Team working" className="rounded-xl shadow-lg" />
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="py-16"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <div key={index} className="bg-brand-card border border-brand-border rounded-xl p-8 text-center group">
                        <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-accent" />
                        <h3 className="text-xl font-semibold text-brand-foreground">{member.name}</h3>
                        <p className="text-accent mb-4">{member.role}</p>
                        <a href="#" className="text-brand-muted hover:text-brand-foreground transition-colors opacity-0 group-hover:opacity-100" data-cursor-hover>
                            <Linkedin className="w-5 h-5 mx-auto" />
                        </a>
                    </div>
                ))}
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
