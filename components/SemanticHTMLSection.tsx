import React from 'react';
import SectionCard from './shared/SectionCard';

const Code: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <code className="bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 rounded-md px-1.5 py-0.5 font-mono text-sm">
    {children}
  </code>
);

interface SectionProps {
  id: string;
}

const SemanticHTMLSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <SectionCard title="HTML Ngữ nghĩa & Cấu trúc trang" id={id}>
      <p>
        Sử dụng các thẻ HTML5 ngữ nghĩa phù hợp là nền tảng của khả năng tiếp cận. Chúng cung cấp ý nghĩa và cấu trúc cho nội dung, giúp trình đọc màn hình hiểu và điều hướng trang web của bạn.
      </p>
      <p>Trang này sử dụng các thẻ sau để tạo cấu trúc rõ ràng:</p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li><Code>&lt;header&gt;</Code>: Cho phần đầu trang chứa tiêu đề và điều hướng chính.</li>
        <li><Code>&lt;nav&gt;</Code>: Để xác định các liên kết điều hướng.</li>
        <li><Code>&lt;main&gt;</Code>: Bao bọc nội dung chính của trang.</li>
        <li><Code>&lt;section&gt;</Code>: Nhóm các nội dung liên quan với nhau (mỗi thẻ này là một section).</li>
        <li><Code>&lt;h1&gt;</Code>, <Code>&lt;h2&gt;</Code>: Để tạo một hệ thống phân cấp tiêu đề logic.</li>
        <li><Code>&lt;footer&gt;</Code>: Cho phần chân trang.</li>
      </ul>
      <p>
        Người dùng trình đọc màn hình có thể dễ dàng chuyển đến các "vùng" (landmarks) này để nhanh chóng tìm thấy thông tin họ cần.
      </p>
    </SectionCard>
  );
};

export default SemanticHTMLSection;