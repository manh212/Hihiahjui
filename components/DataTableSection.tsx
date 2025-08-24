import React from 'react';
import SectionCard from './shared/SectionCard';

interface SectionProps {
  id: string;
}

const DataTableSection: React.FC<SectionProps> = ({ id }) => {
  return (
    <SectionCard title="Bảng dữ liệu có thể truy cập" id={id}>
      <p>
        Để bảng dữ liệu có thể truy cập, chúng cần có cấu trúc HTML chính xác để trình đọc màn hình có thể diễn giải và điều hướng mối quan hệ giữa các ô và tiêu đề.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li><code>&lt;caption&gt;</code>: Cung cấp một tiêu đề mô tả cho bảng.</li>
        <li><code>&lt;thead&gt;</code>: Nhóm các nội dung tiêu đề của bảng.</li>
        <li><code>&lt;tbody&gt;</code>: Nhóm các nội dung thân của bảng.</li>
        <li><code>&lt;th&gt;</code> với thuộc tính <code>scope</code>: Xác định một ô là tiêu đề cho một cột (<code>scope="col"</code>) hoặc một hàng (<code>scope="row"</code>). Điều này giúp trình đọc màn hình liên kết các ô dữ liệu với các tiêu đề chính xác của chúng.</li>
      </ul>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
          <caption className="caption-bottom text-sm text-slate-600 dark:text-slate-400 mt-2">
            Bảng 1: Thông tin nhân viên và vai trò của họ trong dự án.
          </caption>
          <thead className="bg-slate-100 dark:bg-slate-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider border-b border-slate-300 dark:border-slate-700">Tên</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider border-b border-slate-300 dark:border-slate-700">Chức vụ</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider border-b border-slate-300 dark:border-slate-700">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">An Nguyễn</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">Trưởng dự án</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">an.nguyen@example.com</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">Bình Trần</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">Lập trình viên Frontend</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">binh.tran@example.com</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">Cẩm Lê</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">Nhà thiết kế UX/UI</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">cam.le@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

export default DataTableSection;