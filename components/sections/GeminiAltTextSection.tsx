import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import SectionCard from '../shared/SectionCard';

interface GeminiAltTextSectionProps {
  id: string;
}

interface AltTextOption {
  style: string;
  text: string;
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
  const [altTextOptions, setAltTextOptions] = useState<AltTextOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [refinement, setRefinement] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAltTextOptions([]);
      setError('');
    }
  };

  const generateAltText = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    setError('');
    setAltTextOptions([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const imagePart = await fileToGenerativePart(imageFile);
      
      const prompt = `Tạo 3 văn bản thay thế (alt text) cho hình ảnh này, phù hợp cho trình đọc màn hình. Mỗi văn bản nên có phong cách khác nhau: một cái "Ngắn gọn", một cái "Mô tả chi tiết", và một cái "Tập trung vào ngữ cảnh". ${refinement ? `Hãy xem xét thêm gợi ý này: "${refinement}"` : ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [{ text: prompt }, imagePart],
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        style: { type: Type.STRING, description: 'Phong cách của alt text (ví dụ: Ngắn gọn, Mô tả chi tiết, Tập trung vào ngữ cảnh).' },
                        text: { type: Type.STRING, description: 'Nội dung của alt text.' },
                    },
                    required: ["style", "text"],
                },
            },
        },
      });

      const result = JSON.parse(response.text);
      setAltTextOptions(result);

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
        Sử dụng Gemini để tự động tạo nhiều phương án văn bản thay thế cho hình ảnh. Bạn cũng có thể thêm gợi ý để tinh chỉnh kết quả.
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
          
          <div className="w-full mt-4">
             <label htmlFor="refinement" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gợi ý (tùy chọn)
            </label>
             <input 
                type="text" 
                id="refinement"
                value={refinement}
                onChange={(e) => setRefinement(e.target.value)}
                placeholder="Ví dụ: tập trung vào màu sắc, cảm xúc của nhân vật..."
                className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!imageFile}
            />
          </div>

          <button
            onClick={generateAltText}
            disabled={!imageFile || isLoading}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang tạo...' : 'Tạo các phương án Alt Text'}
          </button>
        </div>

        {isLoading && (
            <div className="flex justify-center items-center mt-4" role="status" aria-live="polite">
                <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-600 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                <span className="sr-only">Đang tạo văn bản thay thế...</span>
            </div>
        )}

        {error && <p className="mt-4 text-center text-red-600 dark:text-red-400">{error}</p>}
        
        {altTextOptions.length > 0 && (
          <div className="mt-6 w-full text-left">
            <h3 className="font-semibold text-lg">Văn bản thay thế được đề xuất:</h3>
            <ul className="mt-2 space-y-3">
              {altTextOptions.map((option, index) => (
                <li key={index} className="p-4 bg-slate-100 dark:bg-slate-900 rounded-md">
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">{option.style}</p>
                  <p className="text-slate-800 dark:text-slate-200 mt-1"><code>{option.text}</code></p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default GeminiAltTextSection;