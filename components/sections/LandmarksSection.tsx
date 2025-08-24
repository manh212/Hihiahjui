import React from 'react';
import SectionCard from '../shared/SectionCard';

interface SectionProps {
  id: string;
}

const LandmarksSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <SectionCard title="Vùng ARIA (Landmarks)" id={id}>
      <p>
        Các vùng ARIA (Landmarks) giúp xác định các khu vực của một trang, cho phép người dùng trình đọc màn hình dễ dàng hiểu được bố cục và điều hướng trực tiếp đến các phần cụ thể.
      </p>
      <p>
        Mặc dù các thẻ HTML5 hiện đại như <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, và <code>&lt;main&gt;</code> tự động tạo ra các vùng này, bạn có thể sử dụng thuộc tính <code>role</code> để thêm chúng vào các thẻ chung chung như <code>&lt;div&gt;</code> khi cần thiết.
      </p>
      <h3 className="font-semibold text-lg mt-4 mb-2">Các vai trò Landmark phổ biến</h3>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li><code>role="banner"</code>: Phần đầu trang web. Thường là thẻ <code>&lt;header&gt;</code>.</li>
        <li><code>role="navigation"</code>: Chứa các liên kết để điều hướng trang web. Thường là thẻ <code>&lt;nav&gt;</code>.</li>
        <li><code>role="main"</code>: Nội dung chính của tài liệu. Thường là thẻ <code>&lt;main&gt;</code>.</li>
        <li><code>role="search"</code>: Một phần chứa biểu mẫu tìm kiếm.</li>
        <li><code>role="complementary"</code>: Nội dung hỗ trợ cho nội dung chính, nhưng vẫn có ý nghĩa khi tách rời. Thường là một thanh bên (sidebar). Thường là thẻ <code>&lt;aside&gt;</code>.</li>
        <li><code>role="contentinfo"</code>: Chứa thông tin về tài liệu mẹ như bản quyền và liên kết bảo mật. Thường là thẻ <code>&lt;footer&gt;</code>.</li>
        <li><code>role="region"</code>: Một vùng chung cần được đặt tên có thể truy cập bằng cách sử dụng <code>aria-label</code> hoặc <code>aria-labelledby</code>.</li>
      </ul>

      <div className="mt-6 p-4 border border-dashed border-slate-400 dark:border-slate-600 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Ví dụ trực quan về Vùng Tìm kiếm</h3>
        <p>Toàn bộ hộp này được xác định là một khu vực tìm kiếm cho các công nghệ hỗ trợ.</p>
        <div role="search" aria-label="Tìm kiếm trên trang" className="mt-2 p-4 bg-slate-100 dark:bg-slate-900/50 rounded">
          <label htmlFor="search-input" className="sr-only">Tìm kiếm</label>
          <input 
            type="search" 
            id="search-input"
            placeholder="Tìm kiếm trên trang này..."
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="mt-2 px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400">
            Tìm kiếm
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Mã nguồn: <code>&lt;div role="search" aria-label="Tìm kiếm trên trang"&gt;...&lt;/div&gt;</code>
        </p>
      </div>
    </SectionCard>
  );
};

export default LandmarksSection;
