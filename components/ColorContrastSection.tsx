
import React from 'react';
import SectionCard from './shared/SectionCard';

const ColorContrastSection: React.FC = () => {
  return (
    <SectionCard title="Tương phản Màu sắc">
      <p>
        Đảm bảo độ tương phản màu sắc đủ giữa văn bản và nền là rất quan trọng đối với những người có thị lực kém. Theo Nguyên tắc Tiếp cận Nội dung Web (WCAG), tỷ lệ tương phản tối thiểu là:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li><strong>4.5:1</strong> cho văn bản thông thường (Mức AA).</li>
        <li><strong>3:1</strong> cho văn bản lớn (18pt hoặc 14pt in đậm) (Mức AA).</li>
      </ul>
      <p>
        Bạn có thể sử dụng các công cụ trực tuyến như WebAIM Contrast Checker để kiểm tra các kết hợp màu của mình.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Ví dụ Tốt (Đạt chuẩn)</h3>
          <div className="p-4 rounded-lg border border-slate-300 space-y-4">
            <div className="bg-white p-3 rounded shadow">
              <p className="text-slate-900">Văn bản màu đen (#0F172A) trên nền trắng (#FFFFFF). Tỷ lệ tương phản: 17.36:1. Đạt chuẩn AAA.</p>
            </div>
            <div className="bg-indigo-600 p-3 rounded shadow">
              <p className="text-white text-lg">Văn bản lớn màu trắng (#FFFFFF) trên nền xanh (#4F46E5). Tỷ lệ tương phản: 4.67:1. Đạt chuẩn AA.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Ví dụ Kém (Không đạt chuẩn)</h3>
          <div className="p-4 rounded-lg border border-slate-300 space-y-4">
            <div className="bg-white p-3 rounded shadow">
              <p className="text-slate-400">Văn bản màu xám nhạt (#94A3B8) trên nền trắng (#FFFFFF). Tỷ lệ tương phản: 2.87:1. Không đạt chuẩn.</p>
            </div>
            <div className="bg-yellow-200 p-3 rounded shadow">
              <p className="text-lime-700">Văn bản màu xanh lá (#65A30D) trên nền vàng (#FEF08A). Tỷ lệ tương phản: 2.95:1. Không đạt chuẩn.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default ColorContrastSection;
