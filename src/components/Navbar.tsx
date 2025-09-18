import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const NavLink: React.FC<{ to: string, children: React.ReactNode, isMobile?: boolean }> = ({ to, children, isMobile }) => (
    <Link 
      to={to} 
      className="block px-3 py-2 rounded-md text-base font-medium text-brand-muted hover:text-brand-foreground hover:bg-brand-card/50 transition-colors"
      data-cursor-hover
      onClick={() => {
        if (isMobile) setIsOpen(false);
        setOpenDropdown(null);
      }}
    >
      {children}
    </Link>
  );

  const Dropdown: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="relative" onMouseEnter={() => setOpenDropdown(title)} onMouseLeave={() => setOpenDropdown(null)}>
      <button className="flex items-center space-x-1 text-brand-muted hover:text-brand-foreground transition-colors" data-cursor-hover>
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === title ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {openDropdown === title && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-brand-card rounded-md shadow-lg p-2 border border-brand-border/50"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-brand-background/80 backdrop-blur-lg border-b border-brand-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" data-cursor-hover>
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">TF</span>
              </div>
              <span className="text-xl font-bold text-brand-foreground">ToolForge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            
            <Dropdown title="Tools">
              <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 space-y-2">
                    <h3 className="font-semibold text-brand-foreground px-3 mb-1">Business</h3>
                    <NavLink to="/ai-business-plan-calculator">Business Plan Calc</NavLink>
                    <NavLink to="/ai-marketing-budget-calculator">Marketing Budget Calc</NavLink>
                    <NavLink to="/gst-invoice-generator">GST Invoice Generator</NavLink>
                  </div>
                   <div className="p-2 space-y-2">
                    <h3 className="font-semibold text-brand-foreground px-3 mb-1">Creators</h3>
                    <NavLink to="/creator-tools">Creator Tools Hub</NavLink>
                    <NavLink to="/image-resizer">Image Resizer</NavLink>
                    <NavLink to="/color-palette-generator">Color Palette</NavLink>
                    <NavLink to="/word-counter">Word Counter</NavLink>
                  </div>
              </div>
            </Dropdown>

            <Dropdown title="Converters">
               <div className="p-2 space-y-2">
                  <NavLink to="/all-converters">All Converters</NavLink>
                  <NavLink to="/image-format-converter">Image Converter</NavLink>
                  <NavLink to="/audio-converter">Audio Converter</NavLink>
                  <NavLink to="/video-converter">Video Converter</NavLink>
                  <NavLink to="/formats">Supported Formats</NavLink>
               </div>
            </Dropdown>

            <Dropdown title="Resources">
               <div className="p-2 space-y-2">
                  <NavLink to="/documentation">Documentation</NavLink>
                  <NavLink to="/apps">Apps</NavLink>
                  <NavLink to="/blog">Blog</NavLink>
                  <NavLink to="/faq">FAQ</NavLink>
               </div>
            </Dropdown>

            <NavLink to="/pricing">Pricing</NavLink>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-brand-muted hover:text-brand-foreground transition-colors"
                  data-cursor-hover
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-brand-card rounded-md shadow-lg py-1 border border-brand-border/50"
                    >
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-brand-muted hover:bg-brand-background/50" onClick={() => setShowUserMenu(false)} data-cursor-hover>Dashboard</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-brand-muted hover:bg-brand-background/50 flex items-center space-x-2" data-cursor-hover>
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth" className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors shadow-[0_0_15px_rgba(47,69,114,0.5)] animate-subtle-glow" data-cursor-hover>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-muted hover:text-brand-foreground" data-cursor-hover>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brand-card border-t border-brand-border/50">
              <NavLink to="/" isMobile>Home</NavLink>
              <NavLink to="/pricing" isMobile>Pricing</NavLink>
              <NavLink to="/all-converters" isMobile>Converters</NavLink>
              <NavLink to="/legal-tools" isMobile>Legal Tools</NavLink>
              <NavLink to="/about" isMobile>About</NavLink>
              {user ? (
                <>
                  <NavLink to="/dashboard" isMobile>Dashboard</NavLink>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-muted hover:text-brand-foreground hover:bg-brand-background/50">Logout</button>
                </>
              ) : (
                <Link to="/auth" className="block px-3 py-2 rounded-md text-base font-medium text-accent" onClick={() => setIsOpen(false)}>Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
