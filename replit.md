# Vite React TypeScript Multi-Tool Application

## Overview
This is a comprehensive React application built with TypeScript and Vite that provides various business, creator, and utility tools. The application has been successfully configured to run in the Replit environment.

## Project Architecture
- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5 
- **Styling**: Tailwind CSS with custom brand colors
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React, React Icons

## Key Features
The application includes multiple tool categories:

### Business Tools
- AI Meeting Assistant
- GST Invoice Generator
- AI Business Plan Calculator
- AI Marketing Budget Calculator

### Creator Tools
- Indian Language Writer
- Text Case Converter
- Code Formatter
- Color Palette Generator
- QR Code Generator
- Image Tools (Resizer, Format Converter)
- Audio/Video Converters

### Utility Tools
- Image to Text (OCR)
- Audio to Text
- File Compressor

### Legal & Compliance
- Privacy Policy Generator
- Terms and Conditions Generator
- Legal document generators

## Recent Changes (2025-09-18)
- Configured Vite development server to bind to 0.0.0.0:5000 for Replit environment
- Resolved React 19 dependency conflicts using --legacy-peer-deps
- Created missing Orb animation component
- Added qr-code-styling dependency
- Set up development workflow for frontend server
- Configured deployment settings for production builds
- Added serve package for production static file serving

## Development Setup
- Development server runs on port 5000 (configured for Replit)
- Uses legacy peer dependencies due to React 19 compatibility
- Hot module replacement enabled
- Development server allows all hosts for proxy compatibility

## Deployment Configuration
- **Target**: Autoscale (stateless web application)
- **Build Command**: `npm run build`
- **Run Command**: `npx serve -s dist -l 5000`
- Build produces optimized static assets in `dist/` directory

## Project Structure
```
src/
├── components/
│   ├── animations/ (CardSwap, Dock, SpotlightCard, Orb)
│   ├── CustomCursor, Footer, Navbar
├── contexts/
│   └── AuthContext
├── pages/ (30+ tool pages)
├── App.tsx (main router)
├── main.tsx (entry point)
└── index.css (global styles)
```

## Dependencies Status
- All required dependencies installed successfully
- React 19 compatibility resolved with legacy peer deps
- No LSP diagnostics reported
- Build process working correctly (22s build time)
- Bundle size: ~1.7MB (with optimization recommendations noted)

## User Preferences
- No specific user preferences documented yet

## Notes
- Application serves a comprehensive set of business and utility tools
- All tools are accessible via React Router
- Custom cursor and animations enhance user experience
- Authentication context available but implementation varies by tool