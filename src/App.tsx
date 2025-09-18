import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomCursor />
        <div className="min-h-screen bg-brand-background">
          <div className="relative z-10">
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  
                  {/* Business Tools */}
                  <Route path="/ai-meeting-assistant" element={<AIMeetingAssistant />} />
                  <Route path="/gst-invoice-generator" element={<GSTInvoiceGenerator />} />
                  <Route path="/ai-business-plan-calculator" element={<AIBusinessPlanCalculator />} />
                  <Route path="/ai-marketing-budget-calculator" element={<AIMarketingBudgetCalculator />} />

                  {/* Creator Tools */}
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
