import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import SectionCard from './shared/SectionCard';

interface GeminiAltTextSectionProps {
  id: string;
}

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        } else {
            resolve('');
        }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const GeminiAltTextSection: React.FC<GeminiAltTextSectionProps> = ({ id }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAltText('');
      setError('');
    }
  };

  const generateAltText = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    setError('');
    setAltText('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const imagePart = await fileToGenerativePart(imageFile);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { text: 'Hãy mô tả hình ảnh này cho trình đọc màn hình. Văn bản mô tả phải ngắn gọn và súc tích, phù hợp để sử dụng làm thuộc tính alt của hình ảnh.' },
            imagePart
          ],
        },
      });

      const text = response.text;
      setAltText(text);

    } catch (err) {
      console.error(err);
      setError('Đã xảy ra lỗi khi tạo văn bản thay thế. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionCard title="Tạo Văn bản Thay thế (Alt Text) bằng AI" id={id}>
      <p>
        Sử dụng sức mạnh của các mô hình đa phương thức như Gemini để tự động tạo văn bản thay thế mang tính mô tả cho hình ảnh. Điều này có thể giúp đẩy nhanh quy trình làm việc và đảm bảo không có hình ảnh nào bị bỏ quên.
      </p>
      <div className="mt-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div className="flex flex-col items-center">
          <label htmlFor="image-upload" className="w-full text-center cursor-pointer bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-dashed border-slate-300 dark:border-slate-500 rounded-lg p-6">
            {previewUrl ? (
              <img src={previewUrl} alt="Bản xem trước đã tải lên" className="max-h-48 mx-auto rounded-md" />
            ) : (
              <div className="text-slate-500 dark:text-slate-400">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="mt-2 block font-medium">Nhấn để tải ảnh lên</span>
                <span className="text-xs">PNG, JPG, GIF lên đến 10MB</span>
              </div>
            )}
          </label>
          <input id="image-upload" name="image-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
          
          <button
            onClick={generateAltText}
            disabled={!imageFile || isLoading}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 disabled:bg-slate-400 disabled:cursor-not-allowed"
            aria-live="polite"
          >
            {isLoading ? 'Đang tạo...' : 'Tạo văn bản thay thế'}
          </button>
        </div>

        {isLoading && (
            <div className="flex justify-center mt-4" aria-label="Đang xử lý yêu cầu">
                <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-600 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
            </div>
        )}

        {error && <p className="mt-4 text-center text-red-600 dark:text-red-400">{error}</p>}
        
        {altText && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Văn bản thay thế được đề xuất:</h3>
            <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-md text-slate-800 dark:text-slate-200">
              <p><code>{altText}</code></p>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default GeminiAltTextSection;