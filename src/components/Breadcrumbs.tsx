import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const routeToCategory: Record<string, { path: string; label: string }> = {
  // Business
  '/ai-business-plan-calculator': { path: '/business-tools', label: 'Business Tools' },
  '/ai-marketing-budget-calculator': { path: '/business-tools', label: 'Business Tools' },
  '/ai-meeting-assistant': { path: '/business-tools', label: 'Business Tools' },
  '/gst-invoice-generator': { path: '/business-tools', label: 'Business Tools' },

  // Creator
  '/word-counter': { path: '/creator-tools', label: 'Creator Tools' },
  '/image-compressor': { path: '/creator-tools', label: 'Creator Tools' },
  '/image-cropper': { path: '/creator-tools', label: 'Creator Tools' },
  '/background-remover': { path: '/creator-tools', label: 'Creator Tools' },
  '/transparent-png': { path: '/creator-tools', label: 'Creator Tools' },
  '/watermark': { path: '/creator-tools', label: 'Creator Tools' },
  '/palette-from-image': { path: '/creator-tools', label: 'Creator Tools' },
  '/social-banner': { path: '/creator-tools', label: 'Creator Tools' },
  '/meme-maker': { path: '/creator-tools', label: 'Creator Tools' },
  '/color-contrast-checker': { path: '/creator-tools', label: 'Creator Tools' },
  '/favicon-generator': { path: '/creator-tools', label: 'Creator Tools' },
  '/svg-png': { path: '/creator-tools', label: 'Creator Tools' },
  '/svg-optimizer': { path: '/creator-tools', label: 'Creator Tools' },
  '/icon-sprite': { path: '/creator-tools', label: 'Creator Tools' },
  '/table-csv': { path: '/creator-tools', label: 'Creator Tools' },
  '/regex-tester': { path: '/creator-tools', label: 'Creator Tools' },
  '/uuid-slug': { path: '/creator-tools', label: 'Creator Tools' },
  '/code-formatter': { path: '/creator-tools', label: 'Creator Tools' },
  '/color-palette-generator': { path: '/creator-tools', label: 'Creator Tools' },
  '/qr-code-generator': { path: '/creator-tools', label: 'Creator Tools' },
  '/image-resizer': { path: '/creator-tools', label: 'Creator Tools' },
  '/image-format-converter': { path: '/creator-tools', label: 'Creator Tools' },
  '/indian-language-writer': { path: '/creator-tools', label: 'Creator Tools' },
  '/text-case-converter': { path: '/creator-tools', label: 'Creator Tools' },

  // Utilities / Converters
  '/image-to-text': { path: '/utilities', label: 'Utilities' },
  '/audio-to-text': { path: '/utilities', label: 'Utilities' },
  '/file-compressor': { path: '/utilities', label: 'Utilities' },
  '/audio-converter': { path: '/utilities', label: 'Utilities' },
  '/video-converter': { path: '/utilities', label: 'Utilities' },
  '/all-converters': { path: '/utilities', label: 'Utilities' },
  '/formats': { path: '/utilities', label: 'Utilities' },

  // Legal
  '/privacy-policy-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
  '/terms-and-conditions-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
  '/cookies-policy-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
  '/disclaimer-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
  '/eula-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
  '/return-and-refund-policy-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
  '/terms-of-service-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
  '/terms-of-use-generator': { path: '/legal-tools', label: 'Legal & Compliance' },
};

const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();

  if (pathname === '/') return null;

  const category = routeToCategory[pathname];

  // Only show breadcrumb bar on pages we know or on section pages
  const isSection = ['/business-tools', '/creator-tools', '/utilities', '/legal-tools', '/all-converters'].includes(pathname);
  if (!category && !isSection) return null;

  const categoryLink = category?.path || pathname;
  const categoryLabel = category?.label || (
    pathname === '/business-tools' ? 'Business Tools' :
    pathname === '/creator-tools' ? 'Creator Tools' :
    pathname === '/utilities' ? 'Utilities' :
    pathname === '/legal-tools' ? 'Legal & Compliance' : 'Converters'
  );

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="bg-brand-background/80 border-b border-brand-border/40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm">
          <div className="flex items-center gap-2 text-brand-muted">
            <Link to="/" className="hover:text-brand-foreground" aria-label="Back to Home">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={categoryLink} className="hover:text-brand-foreground">
              {categoryLabel}
            </Link>
            {category && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-brand-foreground/80 line-clamp-1">{pathname.split('/').slice(-1)[0].replace(/-/g,' ').replace(/\b\w/g, m => m.toUpperCase())}</span>
                <div className="ml-auto flex items-center gap-2">
                  <Link to={category.path} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-brand-card border border-brand-border hover:bg-brand-card/80 text-brand-foreground" data-cursor-hover>
                    <ArrowLeft className="w-4 h-4" />
                    Back to {category.label}
                  </Link>
                  <Link to="/" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-accent text-accent-foreground hover:bg-accent/90" data-cursor-hover>
                    <ArrowLeft className="w-4 h-4" />
                    Home
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Breadcrumbs;
