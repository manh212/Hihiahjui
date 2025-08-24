import React, { useState } from 'react';
import SectionCard from './shared/SectionCard';

interface SectionProps {
  id: string;
}

const AriaLiveSection: React.FC<SectionProps> = ({ id }) => {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');

  const handlePoliteUpdate = () => {
    setPoliteMessage(`Thông báo lịch sự được cập nhật lúc: ${new Date().toLocaleTimeString()}`);
    setTimeout(() => setPoliteMessage(''), 5000);
  };

  const handleAssertiveUpdate = () => {
    setAssertiveMessage(`Cảnh báo khẩn cấp! Cập nhật lúc: ${new Date().toLocaleTimeString()}`);
    setTimeout(() => setAssertiveMessage(''), 5000);
  };
  
  return (
    <SectionCard title="Khu vực Động (Live Regions) với ARIA" id={id}>
      <p>
        Khu vực động thông báo cho người dùng trình đọc màn hình về các thay đổi nội dung mà không cần di chuyển tiêu điểm của họ.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <h3 className="font-semibold text-lg mb-2"><code>aria-live="polite"</code></h3>
          <p className="mb-4 text-sm">
            Thông báo cho người dùng khi họ không có hoạt động gì. Thích hợp cho các thông báo không khẩn cấp như "Sản phẩm đã được thêm vào giỏ hàng".
          </p>
          <button 
            onClick={handlePoliteUpdate}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Kích hoạt thông báo "Lịch sự"
          </button>
          <div 
            aria-live="polite"
            role="status"
            className={`mt-4 p-4 border rounded-lg transition-opacity duration-300 min-h-[70px] ${politeMessage ? 'opacity-100 bg-green-100 border-green-400 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200' : 'opacity-0'}`}
          >
            {politeMessage}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2"><code>aria-live="assertive"</code></h3>
          <p className="mb-4 text-sm">
            Ngắt lời người dùng để thông báo ngay lập tức. Chỉ sử dụng cho các thông báo quan trọng, khẩn cấp như "Đã xảy ra lỗi nghiêm trọng".
          </p>
          <button 
            onClick={handleAssertiveUpdate}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Kích hoạt thông báo "Khẩn cấp"
          </button>
          <div 
            aria-live="assertive"
            role="alert"
            className={`mt-4 p-4 border rounded-lg transition-opacity duration-300 min-h-[70px] ${assertiveMessage ? 'opacity-100 bg-red-100 border-red-400 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200' : 'opacity-0'}`}
          >
            {assertiveMessage}
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default AriaLiveSection;