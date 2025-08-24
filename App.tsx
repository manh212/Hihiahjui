import React, { useState, useEffect } from 'react';
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
import ReducedMotionSection from './components/ReducedMotionSection';
import GeminiAltTextSection from './components/GeminiAltTextSection';

const sections = [
  { id: 'html-ngu-nghia', title: 'HTML Ngữ nghĩa' },
  { id: 'vung-aria-landmarks', title: 'Vùng ARIA' },
  { id: 'hinh-anh-alt-text', title: 'Tiếp cận Hình ảnh' },
  { id: 'ai-tao-alt-text', title: 'Tạo Alt Text bằng AI'},
  { id: 'lien-ket-va-nut', title: 'Liên kết & Nút' },
  { id: 'tuong-phan-mau', title: 'Tương phản Màu sắc' },
  { id: 'bieu-mau-forms', title: 'Biểu mẫu' },
  { id: 'bang-du-lieu', title: 'Bảng dữ liệu' },
  { id: 'dieu-huong-ban-phim', title: 'Điều hướng Bàn phím' },
  { id: 'aria-controls-accordion', title: 'Accordion (ARIA Controls)' },
  { id: 'widget-tabs', title: 'Tabs (Widget phức hợp)' },
  { id: 'modal-dialog', title: 'Modal (Dialog)' },
  { id: 'khu-vuc-dong-aria-live', title: 'Khu vực Động (ARIA Live)' },
  { id: 'giam-thieu-chuyen-dong', title: 'Giảm thiểu Chuyển động' },
];


const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <SkipToContentLink />
      <Header theme={theme} setTheme={setTheme} sections={sections} />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          <SemanticHTMLSection id="html-ngu-nghia" />
          <LandmarksSection id="vung-aria-landmarks" />
          <ImageAccessibilitySection id="hinh-anh-alt-text" />
          <GeminiAltTextSection id="ai-tao-alt-text" />
          <LinkAndButtonSection id="lien-ket-va-nut" />
          <ColorContrastSection id="tuong-phan-mau" />
          <FormAccessibilitySection id="bieu-mau-forms" />
          <DataTableSection id="bang-du-lieu" />
          <KeyboardFocusSection id="dieu-huong-ban-phim" />
          <AriaControlsSection id="aria-controls-accordion" />
          <TabsWidgetSection id="widget-tabs" />
          <ModalAccessibilitySection id="modal-dialog" />
          <AriaLiveSection id="khu-vuc-dong-aria-live" />
          <ReducedMotionSection id="giam-thieu-chuyen-dong" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;