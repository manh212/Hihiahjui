import React, { useState } from 'react';
import SectionCard from './shared/SectionCard';

interface SectionProps {
  id: string;
}

const AriaControlsSection: React.FC<SectionProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionCard title="Điều khiển ARIA: Accordion có thể truy cập" id={id}>
      <p>
        Các thuộc tính ARIA (Accessible Rich Internet Applications) giúp làm cho các thành phần giao diện người dùng động, như accordion, có thể truy cập được.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li><code>aria-expanded</code>: Cho trình đọc màn hình biết liệu phần có thể thu gọn đang mở hay đóng.</li>
        <li><code>aria-controls</code>: Liên kết nút với nội dung mà nó kiểm soát.</li>
      </ul>
      
      <div className="mt-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="accordion-content"
            id="accordion-button"
            className="flex justify-between items-center w-full p-4 text-left font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-t-lg"
          >
            <span>Câu hỏi thường gặp: Làm thế nào để tạo một trang web có thể truy cập?</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </h3>
        <div
          id="accordion-content"
          role="region"
          aria-labelledby="accordion-button"
          className={`p-4 border-t border-slate-200 dark:border-slate-700 ${isOpen ? 'block' : 'hidden'}`}
        >
          <p>
            Bắt đầu bằng cách sử dụng HTML ngữ nghĩa, đảm bảo tất cả các hình ảnh đều có văn bản thay thế, cung cấp đủ độ tương phản màu sắc, làm cho trang web có thể điều hướng hoàn toàn bằng bàn phím, và sử dụng các thuộc tính ARIA khi cần thiết cho các thành phần động.
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default AriaControlsSection;