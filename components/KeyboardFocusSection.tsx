import React from 'react';
import SectionCard from './shared/SectionCard';

const Kbd: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <kbd className="px-2 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-lg dark:bg-slate-600 dark:text-slate-100 dark:border-slate-500">
    {children}
  </kbd>
);

interface SectionProps {
  id: string;
}

const KeyboardFocusSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <SectionCard title="Điều hướng bằng Bàn phím & Quản lý Tiêu điểm (Focus)" id={id}>
      <p>
        Một trang web có thể truy cập phải cho phép người dùng tương tác với tất cả các yếu tố chức năng chỉ bằng bàn phím. Điều này rất quan trọng đối với người dùng bị suy giảm khả năng vận động và cả người dùng trình đọc màn hình.
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4 my-4">
        <li>
          <strong>Thứ tự Tab hợp lý:</strong> Thứ tự mà các phần tử nhận được tiêu điểm (khi nhấn phím <Kbd>Tab</Kbd>) phải tuân theo một trình tự logic, thường là theo thứ tự đọc trực quan.
        </li>
        <li>
          <strong>Chỉ báo tiêu điểm rõ ràng:</strong> Luôn phải có một chỉ báo trực quan rõ ràng về phần tử nào hiện đang có tiêu điểm. Tailwind CSS thực hiện rất tốt điều này với các tiện ích <code>focus:ring</code>.
        </li>
        <li>
          <strong>Không bao giờ ẩn tiêu điểm:</strong> Tránh sử dụng CSS như <code>outline: none;</code> mà không cung cấp một kiểu thay thế rõ ràng cho trạng thái tiêu điểm.
        </li>
      </ul>

      <div className="mt-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Thử điều hướng bằng phím Tab</h3>
        <p className="mb-4">
          Nhấn phím <Kbd>Tab</Kbd> để di chuyển qua các yếu tố bên dưới. Bạn sẽ thấy một vòng màu xanh lam sáng xuất hiện xung quanh phần tử đang được tập trung. Nhấn <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd> để di chuyển ngược lại.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <a 
            href="#" 
            className="text-indigo-600 dark:text-indigo-400 underline rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Một liên kết có thể focus
          </a>
          <button 
            className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
          >
            Một nút có thể focus
          </button>
          <input
            type="text"
            placeholder="Một trường nhập liệu"
            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default KeyboardFocusSection;