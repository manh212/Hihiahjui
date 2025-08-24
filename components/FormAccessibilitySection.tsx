
import React, { useState, useRef } from 'react';
import SectionCard from './shared/SectionCard';

interface FormErrors {
  name?: string;
}

const FormAccessibilitySection: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (formData: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    const name = formData.get('name');
    if (!name || typeof name !== 'string' || name.trim() === '') {
      newErrors.name = 'Vui lòng nhập họ và tên của bạn.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(null);
    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);
    
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      }
      return;
    }

    const data = Object.fromEntries(formData.entries());
    setSubmittedData(JSON.stringify(data, null, 2));
    e.currentTarget.reset();
  };

  return (
    <SectionCard title="Biểu mẫu (Form) có thể truy cập">
      <p>
        Biểu mẫu có thể truy cập yêu cầu mỗi trường nhập liệu phải được liên kết rõ ràng với một nhãn (label). Điều này cũng bao gồm việc cung cấp thông báo lỗi rõ ràng và có thể truy cập khi người dùng nhập dữ liệu không hợp lệ.
      </p>
       <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li><code>aria-invalid="true"</code>: Cho trình đọc màn hình biết một trường nhập liệu có lỗi.</li>
        <li><code>aria-errormessage</code>: Liên kết trường nhập liệu với phần tử chứa thông báo lỗi.</li>
        <li>Quản lý tiêu điểm (focus) được chuyển đến trường đầu tiên có lỗi để người dùng có thể sửa nó ngay lập tức.</li>
      </ul>
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-6 p-4 border border-slate-200 rounded-lg" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Họ và tên <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name"
            ref={nameInputRef}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none sm:text-sm ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            aria-describedby="name-hint"
            aria-errormessage="name-error"
            aria-invalid={!!errors.name}
            required
          />
          <p id="name-hint" className="mt-1 text-xs text-slate-500">
            Vui lòng nhập họ tên đầy đủ của bạn.
          </p>
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
            Dịch vụ quan tâm
          </label>
          <select 
            id="service"
            name="service"
            className="block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Tư vấn Web</option>
            <option>Phát triển ứng dụng di động</option>
            <option>Tối ưu hóa SEO</option>
          </select>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-700 mb-2">Mức độ ưu tiên</legend>
          <div className="space-y-2">
            <div className="flex items-center">
              <input id="priority-low" name="priority" type="radio" value="low" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300"/>
              <label htmlFor="priority-low" className="ml-3 block text-sm text-slate-700">Thấp</label>
            </div>
            <div className="flex items-center">
              <input id="priority-medium" name="priority" type="radio" value="medium" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300"/>
              <label htmlFor="priority-medium" className="ml-3 block text-sm text-slate-700">Trung bình</label>
            </div>
             <div className="flex items-center">
              <input id="priority-high" name="priority" type="radio" value="high" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300"/>
              <label htmlFor="priority-high" className="ml-3 block text-sm text-slate-700">Cao</label>
            </div>
          </div>
        </fieldset>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input 
              id="terms"
              name="terms"
              type="checkbox" 
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-slate-700">
              Tôi đồng ý với các điều khoản và điều kiện
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Gửi thông tin
        </button>
      </form>

      {submittedData && (
        <div className="mt-6">
            <h3 className="font-semibold text-lg">Dữ liệu đã gửi:</h3>
            <pre className="mt-2 p-4 bg-slate-100 rounded-md text-sm text-slate-800 whitespace-pre-wrap">
                <code>{submittedData}</code>
            </pre>
        </div>
      )}
    </SectionCard>
  );
};

export default FormAccessibilitySection;
