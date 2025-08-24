import React, { useState, useEffect } from 'react';
import SectionCard from './shared/SectionCard';

// Helper function to parse hex color to RGB array
const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};

// Helper function to calculate relative luminance
const getLuminance = (rgb: [number, number, number]): number => {
  const [r, g, b] = rgb.map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Helper function to calculate contrast ratio
const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

interface SectionProps {
  id: string;
}

const ColorContrastSection: React.FC<SectionProps> = ({ id }) => {
  const [textColor, setTextColor] = useState('#0f172a'); // slate-900
  const [bgColor, setBgColor] = useState('#ffffff'); // white
  const [contrastRatio, setContrastRatio] = useState(1);

  useEffect(() => {
    const ratio = getContrastRatio(textColor, bgColor);
    setContrastRatio(ratio);
  }, [textColor, bgColor]);
  
  const getWcagResult = (ratio: number, largeText: boolean = false) => {
    const aaThreshold = largeText ? 3 : 4.5;
    const aaaThreshold = largeText ? 4.5 : 7;
    
    if (ratio >= aaaThreshold) return { level: 'AAA', color: 'text-green-600 dark:text-green-400', text: 'Tuyệt vời' };
    if (ratio >= aaThreshold) return { level: 'AA', color: 'text-emerald-600 dark:text-emerald-400', text: 'Tốt' };
    return { level: 'Fail', color: 'text-red-600 dark:text-red-400', text: 'Không đạt' };
  };

  const normalTextResult = getWcagResult(contrastRatio);
  const largeTextResult = getWcagResult(contrastRatio, true);

  return (
    <SectionCard title="Tương phản Màu sắc" id={id}>
      <p>
        Đảm bảo độ tương phản màu sắc đủ giữa văn bản và nền là rất quan trọng đối với những người có thị lực kém. Theo Nguyên tắc Tiếp cận Nội dung Web (WCAG), tỷ lệ tương phản tối thiểu là:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li><strong>4.5:1</strong> cho văn bản thông thường (Mức AA).</li>
        <li><strong>3:1</strong> cho văn bản lớn (18pt hoặc 14pt in đậm) (Mức AA).</li>
      </ul>
      <p>
        Sử dụng công cụ bên dưới để kiểm tra các kết hợp màu của bạn.
      </p>

      <div className="mt-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Color Pickers */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="text-color-picker" className="block text-sm font-medium mb-1">Màu chữ</label>
                    <div className="flex items-center space-x-2">
                        <input id="text-color-picker" type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-10 rounded border border-slate-300"/>
                        <input type="text" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"/>
                    </div>
                </div>
                 <div>
                    <label htmlFor="bg-color-picker" className="block text-sm font-medium mb-1">Màu nền</label>
                    <div className="flex items-center space-x-2">
                        <input id="bg-color-picker" type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded border border-slate-300"/>
                        <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"/>
                    </div>
                </div>
            </div>

            {/* Preview and Results */}
            <div className="space-y-4">
                <div 
                    className="p-4 rounded-lg border border-dashed border-slate-400 dark:border-slate-500 min-h-[110px] flex flex-col justify-center"
                    style={{ backgroundColor: bgColor, color: textColor }}
                    aria-live="polite"
                >
                    <p className="font-bold text-lg">Văn bản lớn để xem trước</p>
                    <p>Văn bản thường để xem trước.</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-2xl">
                        Tỷ lệ tương phản: {contrastRatio.toFixed(2)}:1
                    </p>
                    <div className="flex justify-center space-x-6 mt-2">
                        <div>
                            <p className="text-sm font-medium">Văn bản thường</p>
                            <p className={`font-bold ${normalTextResult.color}`}>{normalTextResult.text} ({normalTextResult.level})</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium">Văn bản lớn</p>
                            <p className={`font-bold ${largeTextResult.color}`}>{largeTextResult.text} ({largeTextResult.level})</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default ColorContrastSection;