# ClearOne Advantage Call Script Training Platform

A comprehensive training website for studying debt settlement call scripts with interactive learning features, compliance tracking, and role-play scenarios.

## Features

### 🎯 Core Training Modules
- **Opening Techniques** - Outbound and inbound call openings with compliance requirements
- **Discovery & Information Gathering** - Dual-track questioning for current vs past due clients
- **Authorization & Credit Analysis** - FCRA compliance and credit pull procedures
- **Debt Verification & Credit Analysis** - 4-step verification process and analysis framework
- **5 Options Framework** - Master strategic presentation with process of elimination
- **Program Explanation** - Step-by-step debt settlement program details
- **Closing & Administrative** - Pre-approval, budget analysis, and enrollment process

### 🛡️ Compliance Features
- **Verbatim Script Highlighting** - All mandatory language clearly marked
- **Compliance Alerts** - Critical legal requirements with warning styling
- **Interactive Glossary** - Searchable reference for all terms and requirements
- **Fee Structure Calculator** - State-specific fee rates and calculations

### 🎮 Interactive Learning Tools
- **Role-Play Scenarios** - Practice with different client types and situations
- **Flashcard System** - Spaced repetition for key phrases and compliance terms
- **Progress Tracking** - Visual indicators of module completion and mastery
- **Audio Recording** - Practice and playback capability for script mastery

### 📱 User Experience
- **Mobile-First Design** - Fully responsive across all devices
- **Search Functionality** - Find any script content or compliance term instantly
- **Bookmark System** - Save important sections for quick access
- **Print-Friendly** - Clean layouts for offline study materials

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clearone-call-script-training
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── common/           # Shared UI components
│   ├── script/           # Script-specific display components
│   └── interactive/      # Learning tool components
├── pages/
│   ├── dashboard/        # Main dashboard and overview
│   ├── modules/          # Training module pages
│   └── tools/            # Study aids and tools
├── data/
│   └── scriptContent.ts  # All script content and compliance data
└── utils/                # Helper functions and utilities
```

## Key Components

### Script Display Components
- **VerbatimScript** - Highlights exact language requirements
- **ComplianceAlert** - Warning styling for mandatory legal language
- **BranchingLogic** - Interactive decision trees for call flow
- **AnalysisBox** - Strategy explanations and educational content

### Learning Tools
- **ScenarioSimulator** - Role-play different client situations
- **FlashcardSystem** - Spaced repetition for key concepts
- **ProgressTracker** - Visual progress indicators
- **SearchableGlossary** - Quick reference for all terms

## Compliance Requirements

### Critical Verbatim Language
- "calling on a recorded line" (outbound opening)
- "You can opt out at any time" (both openings)
- "All calls are recorded and monitored" (inbound opening)
- FCRA authorization script (before credit pull)

### Fee Structure by State
- Missouri: 18%
- Iowa: 18%
- Idaho: 28%
- All other states: 25%

## Customization

### Adding New Script Content
1. Update `src/data/scriptContent.ts` with new sections
2. Add corresponding module pages in `src/pages/modules/`
3. Update navigation in sidebar component

### Modifying Compliance Requirements
1. Edit compliance data in `src/data/scriptContent.ts`
2. Update glossary terms and definitions
3. Modify compliance alert styling as needed

### Styling Customization
1. Update color scheme in `tailwind.config.js`
2. Modify component styles in individual component files
3. Add new utility classes as needed

## Deployment

The application is ready for deployment to Vercel, Netlify, or any static hosting service.

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for ClearOne Advantage internal use only.

## Support

For technical support or questions about the training platform, contact the development team.
