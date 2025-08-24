
import React from 'react';
import SectionCard from './shared/SectionCard';

const LinkAndButtonSection: React.FC = () => {
  return (
    <SectionCard title="Liên kết và Nút mô tả">
      <p>
        Văn bản của các liên kết và nút phải có ý nghĩa khi đọc một mình, ngoài ngữ cảnh. Điều này giúp người dùng trình đọc màn hình hiểu được hành động sẽ xảy ra khi họ kích hoạt nó.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Ví dụ Kém</h3>
          <p className="mb-2">
            Để biết thêm thông tin, <a href="#" className="text-indigo-600 underline hover:text-indigo-800">bấm vào đây</a>.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Thêm
          </button>
          <p className="mt-2 text-sm text-slate-600">
            "Bấm vào đây" và "Thêm" không cho người dùng biết họ sẽ bấm vào cái gì hoặc thêm cái gì.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Ví dụ Tốt</h3>
          <p className="mb-2">
            Đọc thêm về <a href="#" className="text-indigo-600 underline hover:text-indigo-800">chính sách tiếp cận của chúng tôi</a>.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Thêm sản phẩm vào giỏ hàng
          </button>
          <p className="mt-2 text-sm text-slate-600">
            Các văn bản này rõ ràng và mô tả. Người dùng biết chính xác điều gì sẽ xảy ra.
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default LinkAndButtonSection;
