import React, { useState, useEffect } from 'react';
import SectionCard from '../shared/SectionCard';

const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

const rgbToHex = (r: number, g: number, b: number): string => 
  "#" + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

const getLuminance = (rgb: [number, number, number]): number => {
  const [r, g, b] = rgb.map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 1;
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

// Function to adjust color lightness
const adjustLightness = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const amount = Math.floor(255 * (percent / 100));
  const newRgb = rgb.map(c => Math.max(0, Math.min(255, c + amount))) as [number, number, number];
  return rgbToHex(newRgb[0], newRgb[1], newRgb[2]);
}

interface SectionProps {
  id: string;
}

const ColorContrastSection: React.FC<SectionProps> = ({ id }) => {
  const [textColor, setTextColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [contrastRatio, setContrastRatio] = useState(21);

  useEffect(() => {
    const ratio = getContrastRatio(textColor, bgColor);
    setContrastRatio(ratio);
  }, [textColor, bgColor]);
  
  const getWcagResult = (ratio: number, largeText: boolean = false) => {
    const aaThreshold = largeText ? 3 : 4.5;
    const aaaThreshold = largeText ? 4.5 : 7;
    if (ratio >= aaaThreshold) return { level: 'AAA', color: 'text-green-600 dark:text-green-400', text: 'Tuyệt vời', pass: true };
    if (ratio >= aaThreshold) return { level: 'AA', color: 'text-emerald-600 dark:text-emerald-400', text: 'Tốt', pass: true };
    return { level: 'Fail', color: 'text-red-600 dark:text-red-400', text: 'Không đạt', pass: false };
  };

  const suggestColor = () => {
    const targetRatio = 4.5;
    let newTextColor = textColor;
    const bgRgb = hexToRgb(bgColor);
    if (!bgRgb) return;

    const bgLuminance = getLuminance(bgRgb);
    const step = bgLuminance > 0.5 ? -1 : 1; // Darken text on light bg, lighten on dark bg

    for (let i = 0; i < 100; i++) {
        newTextColor = adjustLightness(newTextColor, step);
        if (getContrastRatio(newTextColor, bgColor) >= targetRatio) {
            setTextColor(newTextColor);
            return;
        }
    }
  };

  const normalTextResult = getWcagResult(contrastRatio);
  const largeTextResult = getWcagResult(contrastRatio, true);

  return (
    <SectionCard title="Tương phản Màu sắc" id={id}>
      <p>Theo WCAG, tỷ lệ tương phản tối thiểu là 4.5:1 cho văn bản thường và 3:1 cho văn bản lớn.</p>
      
      <div className="mt-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
                <div>
                    <label htmlFor="text-color-picker" className="block text-sm font-medium mb-1">Màu chữ</label>
                    <div className="flex items-center space-x-2">
                        <input id="text-color-picker" type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-10 rounded border-none cursor-pointer"/>
                        <input type="text" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"/>
                    </div>
                </div>
                 <div>
                    <label htmlFor="bg-color-picker" className="block text-sm font-medium mb-1">Màu nền</label>
                    <div className="flex items-center space-x-2">
                        <input id="bg-color-picker" type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded border-none cursor-pointer"/>
                        <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"/>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div 
                    className="p-4 rounded-lg border border-dashed border-slate-400 dark:border-slate-500 min-h-[110px] flex flex-col justify-center transition-colors"
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
                    {!normalTextResult.pass && (
                        <button onClick={suggestColor} className="mt-3 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-md font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900">
                           Gợi ý màu
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default ColorContrastSection;