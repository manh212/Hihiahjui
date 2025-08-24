import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SkipToContentLink from './components/SkipToContentLink';
import SemanticHTMLSection from './components/SemanticHTMLSection';
import ImageAccessibilitySection from './components/ImageAccessibilitySection';
import LinkAndButtonSection from './components/LinkAndButtonSection';
import FormAccessibilitySection from './components/FormAccessibilitySection';
import AriaLiveSection from './components/AriaLiveSection';
import AriaControlsSection from './components/AriaControlsSection';
import KeyboardFocusSection from './components/KeyboardFocusSection';
import DataTableSection from './components/DataTableSection';
import ModalAccessibilitySection from './components/ModalAccessibilitySection';
import ColorContrastSection from './components/ColorContrastSection';
import TabsWidgetSection from './components/TabsWidgetSection';
import LandmarksSection from './components/LandmarksSection';

const App: React.FC = () => {
  return (
    <>
      <SkipToContentLink />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          <SemanticHTMLSection />
          <LandmarksSection />
          <ImageAccessibilitySection />
          <LinkAndButtonSection />
          <ColorContrastSection />
          <FormAccessibilitySection />
          <DataTableSection />
          <KeyboardFocusSection />
          <AriaControlsSection />
          <TabsWidgetSection />
          <ModalAccessibilitySection />
          <AriaLiveSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;