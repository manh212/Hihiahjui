import React from 'react';
import SectionCard from './shared/SectionCard';

interface SectionProps {
  id: string;
}

const ReducedMotionSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <>
      <style>{`
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #e2e8f0; /* slate-200 */
          border-top: 5px solid #4f46e5; /* indigo-600 */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .dark .spinner {
           border-color: #334155; /* slate-700 */
           border-top-color: #818cf8; /* indigo-400 */
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .spinner {
            animation: none;
            /* Provide a subtle alternative for feedback */
            transform: rotate(0deg) !important;
            transition: border-color 0.5s;
          }
        }
      `}</style>
      <SectionCard title="Giảm thiểu Chuyển động" id={id}>
        <p>
          Một số người dùng có thể cảm thấy khó chịu hoặc mất phương hướng với các hiệu ứng chuyển động, chẳng hạn như hoạt ảnh, video tự động phát, hoặc hiệu ứng cuộn parallax.
        </p>
        <p>
          Hệ điều hành cung cấp một tùy chọn để người dùng thể hiện sự ưa thích của họ đối với việc giảm chuyển động. Với CSS, chúng ta có thể tôn trọng lựa chọn này bằng cách sử dụng media query <code>@media (prefers-reduced-motion: reduce)</code>.
        </p>
        
        <div className="mt-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="spinner" aria-label="Ví dụ về spinner đang tải"></div>
            <div>
                <h3 className="font-semibold text-lg">Ví dụ về hiệu ứng chuyển động</h3>
                <p className="text-sm">
                    Spinner bên trái sẽ quay liên tục. Tuy nhiên, nếu bạn bật tùy chọn "Giảm chuyển động" trong cài đặt hệ thống của mình (ví dụ: Cài đặt &gt; Trợ năng &gt; Chuyển động), hoạt ảnh quay sẽ bị tắt.
                </p>
            </div>
        </div>
      </SectionCard>
    </>
  );
};

export default ReducedMotionSection;