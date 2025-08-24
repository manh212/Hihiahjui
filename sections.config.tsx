import React from 'react';

import SemanticHTMLSection from './components/sections/SemanticHTMLSection';
import ImageAccessibilitySection from './components/sections/ImageAccessibilitySection';
import LinkAndButtonSection from './components/sections/LinkAndButtonSection';
import FormAccessibilitySection from './components/sections/FormAccessibilitySection';
import AriaLiveSection from './components/sections/AriaLiveSection';
import AriaControlsSection from './components/sections/AriaControlsSection';
import KeyboardFocusSection from './components/sections/KeyboardFocusSection';
import DataTableSection from './components/sections/DataTableSection';
import ModalAccessibilitySection from './components/sections/ModalAccessibilitySection';
import ColorContrastSection from './components/sections/ColorContrastSection';
import TabsWidgetSection from './components/sections/TabsWidgetSection';
import LandmarksSection from './components/sections/LandmarksSection';
import ReducedMotionSection from './components/sections/ReducedMotionSection';
import GeminiAltTextSection from './components/sections/GeminiAltTextSection';

export interface SectionConfig {
  id: string;
  title: string;
  Component: React.FC<{ id: string }>;
}

export const sections: SectionConfig[] = [
  { id: 'html-ngu-nghia', title: 'HTML Ngữ nghĩa', Component: SemanticHTMLSection },
  { id: 'vung-aria-landmarks', title: 'Vùng ARIA', Component: LandmarksSection },
  { id: 'hinh-anh-alt-text', title: 'Tiếp cận Hình ảnh', Component: ImageAccessibilitySection },
  { id: 'ai-tao-alt-text', title: 'Tạo Alt Text bằng AI', Component: GeminiAltTextSection },
  { id: 'lien-ket-va-nut', title: 'Liên kết & Nút', Component: LinkAndButtonSection },
  { id: 'tuong-phan-mau', title: 'Tương phản Màu sắc', Component: ColorContrastSection },
  { id: 'bieu-mau-forms', title: 'Biểu mẫu', Component: FormAccessibilitySection },
  { id: 'bang-du-lieu', title: 'Bảng dữ liệu', Component: DataTableSection },
  { id: 'dieu-huong-ban-phim', title: 'Điều hướng Bàn phím', Component: KeyboardFocusSection },
  { id: 'aria-controls-accordion', title: 'Accordion (ARIA Controls)', Component: AriaControlsSection },
  { id: 'widget-tabs', title: 'Tabs (Widget phức hợp)', Component: TabsWidgetSection },
  { id: 'modal-dialog', title: 'Modal (Dialog)', Component: ModalAccessibilitySection },
  { id: 'khu-vuc-dong-aria-live', title: 'Khu vực Động (ARIA Live)', Component: AriaLiveSection },
  { id: 'giam-thieu-chuyen-dong', title: 'Giảm thiểu Chuyển động', Component: ReducedMotionSection },
];
