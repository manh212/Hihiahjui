
import React, { useState, useEffect, useRef } from 'react';
import SectionCard from './shared/SectionCard';

const ModalAccessibilitySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (isOpen) {
      mainContent?.setAttribute('aria-hidden', 'true');
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      firstElement?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
        if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      mainContent?.removeAttribute('aria-hidden');
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <SectionCard title="Modal (Dialog) có thể truy cập">
      <p>
        Các hộp thoại modal đặt ra nhiều thách thức về khả năng truy cập. Một modal có thể truy cập cần:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li>Có vai trò ARIA là <code>dialog</code> và <code>aria-modal="true"</code>.</li>
        <li>Được đặt tên bằng <code>aria-labelledby</code>.</li>
        <li>"Bẫy" tiêu điểm bàn phím bên trong nó khi nó đang mở.</li>
        <li>Có thể được đóng bằng phím <code>Escape</code>.</li>
        <li>Trả lại tiêu điểm cho phần tử đã kích hoạt nó khi đóng.</li>
        <li>Ẩn nội dung nền khỏi trình đọc màn hình bằng <code>aria-hidden="true"</code>.</li>
      </ul>

      <button
        ref={triggerRef}
        onClick={openModal}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
      >
        Mở modal điều khoản
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="flex justify-between items-start">
              <h2 id="modal-title" className="text-xl font-bold text-slate-900">
                Điều khoản Dịch vụ
              </h2>
              <button 
                onClick={closeModal} 
                aria-label="Đóng modal"
                className="p-1 rounded-full text-slate-500 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-slate-600">
              Bằng cách tiếp tục, bạn đồng ý với các điều khoản và điều kiện của chúng tôi. Vui lòng đọc kỹ trước khi tiến hành.
            </p>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
};

export default ModalAccessibilitySection;
