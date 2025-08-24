
import React from 'react';
import SectionCard from './shared/SectionCard';

const SemanticHTMLSection: React.FC = () => {
  return (
    <SectionCard title="HTML Ngữ nghĩa & Cấu trúc trang">
      <p>
        Sử dụng các thẻ HTML5 ngữ nghĩa phù hợp là nền tảng của khả năng tiếp cận. Chúng cung cấp ý nghĩa và cấu trúc cho nội dung, giúp trình đọc màn hình hiểu và điều hướng trang web của bạn.
      </p>
      <p>Trang này sử dụng các thẻ sau để tạo cấu trúc rõ ràng:</p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li><code>&lt;header&gt;</code>: Cho phần đầu trang chứa tiêu đề và điều hướng chính.</li>
        <li><code>&lt;nav&gt;</code>: Để xác định các liên kết điều hướng.</li>
        <li><code>&lt;main&gt;</code>: Bao bọc nội dung chính của trang.</li>
        <li><code>&lt;section&gt;</code>: Nhóm các nội dung liên quan với nhau (mỗi thẻ này là một section).</li>
        <li><code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code>: Để tạo một hệ thống phân cấp tiêu đề logic.</li>
        <li><code>&lt;footer&gt;</code>: Cho phần chân trang.</li>
      </ul>
      <p>
        Người dùng trình đọc màn hình có thể dễ dàng chuyển đến các "vùng" (landmarks) này để nhanh chóng tìm thấy thông tin họ cần.
      </p>
    </SectionCard>
  );
};

export default SemanticHTMLSection;
