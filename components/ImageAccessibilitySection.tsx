
import React from 'react';
import SectionCard from './shared/SectionCard';

const ImageAccessibilitySection: React.FC = () => {
  return (
    <SectionCard title="Tiếp cận Hình ảnh với Văn bản thay thế (Alt Text)">
      <p>
        Mọi hình ảnh truyền tải thông tin đều phải có thuộc tính <code>alt</code> mô tả nội dung của hình ảnh. Nếu một hình ảnh chỉ mang tính trang trí, nó nên có thuộc tính <code>alt</code> rỗng (<code>alt=""</code>) để trình đọc màn hình bỏ qua.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Ví dụ Tốt: Hình ảnh cung cấp thông tin</h3>
          <img 
            src="https://picsum.photos/id/1062/400/250" 
            alt="Một chú chó pug dễ thương đang ngồi trên một con đường lát sỏi, nghiêng đầu nhìn máy ảnh." 
            className="rounded-lg shadow-md w-full"
          />
          <p className="mt-2 text-sm text-slate-600">
            <strong>Alt text:</strong> "Một chú chó pug dễ thương đang ngồi trên một con đường lát sỏi, nghiêng đầu nhìn máy ảnh."<br/>
            Văn bản thay thế này mô tả rõ ràng những gì có trong hình ảnh cho người dùng không thể nhìn thấy nó.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Ví dụ Tốt: Hình ảnh trang trí</h3>
          <img 
            src="https://picsum.photos/id/1056/400/250" 
            alt="" 
            className="rounded-lg shadow-md w-full"
          />
          <p className="mt-2 text-sm text-slate-600">
            <strong>Alt text:</strong> <code>alt=""</code><br/>
            Hình ảnh này chỉ là một dải phân cách trang trí. Văn bản thay thế rỗng yêu cầu trình đọc màn hình bỏ qua nó, tránh làm lộn xộn trải nghiệm của người dùng.
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default ImageAccessibilitySection;
