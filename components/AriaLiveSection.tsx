
import React, { useState, useEffect } from 'react';
import SectionCard from './shared/SectionCard';

const AriaLiveSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSuccess = () => {
    setMessageType('success');
    setMessage('Hành động đã được thực hiện thành công!');
  };

  const handleError = () => {
    setMessageType('error');
    setMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
  };
  
  const getBackgroundColor = () => {
    if (messageType === 'success') return 'bg-green-100 border-green-400 text-green-800';
    if (messageType === 'error') return 'bg-red-100 border-red-400 text-red-800';
    return '';
  };


  return (
    <SectionCard title="Khu vực Động (Live Regions) với ARIA">
      <p>
        <code>aria-live="polite"</code> được sử dụng để thông báo cho người dùng trình đọc màn hình về các cập nhật nội dung không quan trọng mà không làm gián đoạn công việc hiện tại của họ (ví dụ: thông báo xác nhận).
        Trình đọc màn hình sẽ đọc nội dung của vùng này khi nó thay đổi.
      </p>

      <div className="mt-4 space-x-4">
        <button 
          onClick={handleSuccess}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Mô phỏng hành động thành công
        </button>
        <button 
          onClick={handleError}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Mô phỏng hành động lỗi
        </button>
      </div>

      <div 
        aria-live="polite"
        role="status"
        className={`mt-4 p-4 border rounded-lg transition-opacity duration-300 ${message ? `opacity-100 ${getBackgroundColor()}` : 'opacity-0'}`}
      >
        {message || 'Thông báo sẽ xuất hiện ở đây.'}
      </div>
    </SectionCard>
  );
};

export default AriaLiveSection;
