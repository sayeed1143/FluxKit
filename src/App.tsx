import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './pages/Home';
import AIMeetingAssistant from './pages/AIMeetingAssistant';
import IndianLanguageWriter from './pages/IndianLanguageWriter';
import GSTInvoiceGenerator from './pages/GSTInvoiceGenerator';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import TextCaseConverter from './pages/TextCaseConverter';
import ComingSoon from './pages/ComingSoon';

// Import the new tool pages
import AIMarketingBudgetCalculator from './pages/AIMarketingBudgetCalculator';
import CodeFormatter from './pages/CodeFormatter';
import ColorPaletteGenerator from './pages/ColorPaletteGenerator';
import QRCodeGenerator from './pages/QRCodeGenerator';
import AIBusinessPlanCalculator from './pages/AIBusinessPlanCalculator';
import HashtagGenerator from './pages/HashtagGenerator';

// Import newly implemented creator tools
import AudioConverter from './pages/AudioConverter';
import VideoConverter from './pages/VideoConverter';
import ImageResizer from './pages/ImageResizer';
import ImageFormatConverter from './pages/ImageFormatConverter';

// Import new Legal & Converter Hub pages
import LegalTools from './pages/LegalTools';
import PrivacyPolicyGenerator from './pages/PrivacyPolicyGenerator';
import TermsAndConditionsGenerator from './pages/TermsAndConditionsGenerator';
import AllConverters from './pages/AllConverters';
import GenericConverter from './pages/GenericConverter';

// Import new Utility Tools and Info Pages
import ImageToText from './pages/ImageToText';
import AudioToText from './pages/AudioToText';
import FileCompressor from './pages/FileCompressor';
import About from './pages/About';
import Formats from './pages/Formats';
import { AnimatePresence } from 'framer-motion';
import CreatorTools from './pages/CreatorTools';
import BusinessTools from './pages/BusinessTools';
import Utilities from './pages/Utilities';
import WordCounter from './pages/WordCounter';
import ImageCompressor from './pages/ImageCompressor';
import ImageCropper from './pages/ImageCropper';
import BackgroundRemover from './pages/BackgroundRemover';
import TransparentPngMaker from './pages/TransparentPngMaker';
import WatermarkTool from './pages/WatermarkTool';
import PaletteFromImage from './pages/PaletteFromImage';
import SocialBannerGenerator from './pages/SocialBannerGenerator';
import MemeMaker from './pages/MemeMaker';
import ColorContrastChecker from './pages/ColorContrastChecker';
import FaviconGenerator from './pages/FaviconGenerator';
import WatermarkRemover from './pages/WatermarkRemover';
import UnmotivationalQuotes from './pages/UnmotivationalQuotes';
import SvgPngConverter from './pages/SvgPngConverter';
import SvgOptimizer from './pages/SvgOptimizer';
import IconSpriteBuilder from './pages/IconSpriteBuilder';
import TableCsvConverter from './pages/TableCsvConverter';
import RegexTester from './pages/RegexTester';
import UUIDSlugGenerator from './pages/UUIDSlugGenerator';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomCursor />
        <div className="min-h-screen bg-brand-background">
          <div className="relative z-10">
            <Navbar />
            <Breadcrumbs />
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />

                  {/* Sections */}
                  <Route path="/business-tools" element={<BusinessTools />} />
                  <Route path="/utilities" element={<Utilities />} />

                  {/* Business Tools */}
                  <Route path="/ai-meeting-assistant" element={<AIMeetingAssistant />} />
                  <Route path="/gst-invoice-generator" element={<GSTInvoiceGenerator />} />
                  <Route path="/ai-business-plan-calculator" element={<AIBusinessPlanCalculator />} />
                  <Route path="/ai-marketing-budget-calculator" element={<AIMarketingBudgetCalculator />} />
                  <Route path="/hashtag-generator" element={<HashtagGenerator />} />

                  {/* Creator Tools */}
                  <Route path="/creator-tools" element={<CreatorTools />} />
                  <Route path="/word-counter" element={<WordCounter />} />
                  <Route path="/image-compressor" element={<ImageCompressor />} />
                  <Route path="/image-cropper" element={<ImageCropper />} />
                  <Route path="/background-remover" element={<BackgroundRemover />} />
                  <Route path="/transparent-png" element={<TransparentPngMaker />} />
                  <Route path="/watermark" element={<WatermarkTool />} />
                  <Route path="/palette-from-image" element={<PaletteFromImage />} />
                  <Route path="/social-banner" element={<SocialBannerGenerator />} />
                  <Route path="/meme-maker" element={<MemeMaker />} />
                  <Route path="/color-contrast-checker" element={<ColorContrastChecker />} />
                  <Route path="/favicon-generator" element={<FaviconGenerator />} />
                  <Route path="/svg-png" element={<SvgPngConverter />} />
                  <Route path="/svg-optimizer" element={<SvgOptimizer />} />
                  <Route path="/icon-sprite" element={<IconSpriteBuilder />} />
                  <Route path="/table-csv" element={<TableCsvConverter />} />
                  <Route path="/regex-tester" element={<RegexTester />} />
                  <Route path="/uuid-slug" element={<UUIDSlugGenerator />} />
                  <Route path="/video-to-gif" element={<ComingSoon toolName="Video → GIF" />} />
                  <Route path="/audio-trimmer" element={<ComingSoon toolName="Audio Trimmer" />} />

                  <Route path="/indian-language-writer" element={<IndianLanguageWriter />} />
                  <Route path="/text-case-converter" element={<TextCaseConverter />} />
                  <Route path="/code-formatter" element={<CodeFormatter />} />
                  <Route path="/color-palette-generator" element={<ColorPaletteGenerator />} />
                  <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
                  <Route path="/image-resizer" element={<ImageResizer />} />
                  <Route path="/image-format-converter" element={<ImageFormatConverter />} />
                  <Route path="/audio-converter" element={<AudioConverter />} />
                  <Route path="/video-converter" element={<VideoConverter />} />

                  {/* New Utility Tools */}
                  <Route path="/image-to-text" element={<ImageToText />} />
                  <Route path="/audio-to-text" element={<AudioToText />} />
                  <Route path="/file-compressor" element={<FileCompressor />} />

                  {/* Legal Tools */}
                  <Route path="/legal-tools" element={<LegalTools />} />
                  <Route path="/privacy-policy-generator" element={<PrivacyPolicyGenerator />} />
                  <Route path="/terms-and-conditions-generator" element={<TermsAndConditionsGenerator />} />
                  <Route path="/cookies-policy-generator" element={<ComingSoon toolName="Cookies Policy Generator" />} />
                  <Route path="/disclaimer-generator" element={<ComingSoon toolName="Disclaimer Generator" />} />
                  <Route path="/eula-generator" element={<ComingSoon toolName="EULA Generator" />} />
                  <Route path="/return-and-refund-policy-generator" element={<ComingSoon toolName="Return and Refund Policy Generator" />} />
                  <Route path="/terms-of-service-generator" element={<ComingSoon toolName="Terms of Service Generator" />} />
                  <Route path="/terms-of-use-generator" element={<ComingSoon toolName="Terms of Use Generator" />} />


                  {/* Converter Hub */}
                  <Route path="/all-converters" element={<AllConverters />} />
                  <Route path="/formats" element={<Formats />} />
                  <Route path="/convert/:from/:to" element={<GenericConverter />} />

                  {/* Core & Info Pages */}
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<ComingSoon toolName="FAQ" />} />
                  <Route path="/support" element={<ComingSoon toolName="Support Center" />} />
                  <Route path="/status" element={<ComingSoon toolName="System Status" />} />
                  <Route path="/documentation" element={<ComingSoon toolName="API Documentation" />} />
                  <Route path="/apps" element={<ComingSoon toolName="Desktop & Mobile Apps" />} />
                  <Route path="/blog" element={<ComingSoon toolName="Blog" />} />
                  <Route path="/terms" element={<TermsAndConditionsGenerator />} />
                  <Route path="/privacy" element={<PrivacyPolicyGenerator />} />


                  {/* Fallback Coming Soon */}
                  <Route path="/api-testing-tool" element={<ComingSoon toolName="API Testing Tool" />} />
                  <Route path="/ai-pricing-calculator" element={<ComingSoon toolName="AI Pricing Calculator" />} />
                  <Route path="/ai-salary-negotiator" element={<ComingSoon toolName="AI Salary Negotiator" />} />
                  <Route path="/website-speed-analyzer" element={<ComingSoon toolName="Website Speed & SEO Analyzer" />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
