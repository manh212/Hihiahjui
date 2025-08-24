import React, { useState, useRef, useEffect } from 'react';
import SectionCard from '../shared/SectionCard';

interface FormValues {
  name: string;
  password: {
    value: string;
    strength: {
      score: number;
      label: string;
      color: string;
    }
  },
  confirmPassword: string;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

interface SectionProps {
  id: string;
}

const FormAccessibilitySection: React.FC<SectionProps> = ({ id }) => {
  const [formState, setFormState] = useState<FormValues>({
    name: '',
    password: { value: '', strength: { score: 0, label: '', color: 'bg-slate-200' }},
    confirmPassword: '',
    terms: false,
  });
  const [submittedData, setSubmittedData] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const termsInputRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strength = {
      0: { label: '', color: 'bg-slate-200 dark:bg-slate-700' },
      1: { label: 'Rất yếu', color: 'bg-red-500' },
      2: { label: 'Yếu', color: 'bg-orange-500' },
      3: { label: 'Trung bình', color: 'bg-yellow-500' },
      4: { label: 'Mạnh', color: 'bg-lime-500' },
      5: { label: 'Rất mạnh', color: 'bg-green-500' },
    }[score];

    return { score, ...strength };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    const strength = calculatePasswordStrength(newPassword);
    setFormState(prevState => ({
      ...prevState,
      password: { value: newPassword, strength }
    }));
  };
  
  const validateForm = (formData: FormValues): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên của bạn.';
    if (formData.password.strength.score < 3) newErrors.password = 'Mật khẩu quá yếu. Vui lòng sử dụng ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.';
    if (formData.password.value !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    if (!formData.terms) newErrors.terms = 'Bạn phải đồng ý với các điều khoản và điều kiện.';
    return newErrors;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(null);
    const validationErrors = validateForm(formState);
    
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const data = {
        name: formState.name,
        password: '***', // Don't show password
        terms: formState.terms,
    };
    setSubmittedData(JSON.stringify(data, null, 2));
    e.currentTarget.reset();
    setFormState({
        name: '',
        password: { value: '', strength: { score: 0, label: '', color: 'bg-slate-200' }},
        confirmPassword: '',
        terms: false,
    });
  };
  
  const handleFocusField = (ref: React.RefObject<HTMLInputElement>) => {
      ref.current?.focus();
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <SectionCard title="Biểu mẫu (Form) có thể truy cập" id={id}>
      <p>
        Biểu mẫu nâng cao với các ví dụ về kiểm tra độ mạnh mật khẩu và tóm tắt lỗi có thể điều hướng.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li><strong>Thanh đo độ mạnh mật khẩu:</strong> Sử dụng `aria-live` để thông báo cho người dùng trình đọc màn hình về độ mạnh của mật khẩu khi họ gõ.</li>
        <li><strong>Tóm tắt lỗi có thể điều hướng:</strong> Nhấp vào một lỗi trong tóm tắt sẽ cuộn mượt mà và đặt tiêu điểm vào trường nhập liệu tương ứng.</li>
      </ul>
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg" noValidate>
        {Object.keys(errors).length > 0 && (
          <div 
            ref={errorSummaryRef}
            role="alert" 
            aria-labelledby="error-summary-title"
            tabIndex={-1}
            className="p-4 border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <h3 id="error-summary-title" className="text-lg font-bold text-red-800 dark:text-red-300">
              Biểu mẫu có {Object.keys(errors).length} lỗi cần sửa
            </h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {Object.entries(errors).map(([key, message]) => {
                  const refs: { [key: string]: React.RefObject<HTMLInputElement> } = {
                      name: nameInputRef,
                      password: passwordInputRef,
                      confirmPassword: confirmPasswordInputRef,
                      terms: termsInputRef
                  };
                  return (
                    <li key={key}>
                      <a href={`#${key}`} onClick={(e) => { e.preventDefault(); handleFocusField(refs[key]); }} className="text-red-700 dark:text-red-400 underline">
                        {message}
                      </a>
                    </li>
                  )
              })}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Họ và tên <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name"
            ref={nameInputRef}
            value={formState.name}
            onChange={(e) => setFormState({...formState, name: e.target.value})}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-800 focus:outline-none sm:text-sm ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500 focus:border-indigo-500'}`}
            aria-errormessage="name-error"
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Mật khẩu <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input 
            type="password" 
            id="password" 
            name="password"
            ref={passwordInputRef}
            value={formState.password.value}
            onChange={handlePasswordChange}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-slate-800 focus:outline-none sm:text-sm ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500 focus:border-indigo-500'}`}
            aria-errormessage="password-error"
            aria-invalid={!!errors.password}
            required
          />
           <div className="mt-2" aria-live="polite" aria-atomic="true">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all duration-300 ${formState.password.strength.color}`} style={{ width: `${formState.password.strength.score * 20}%` }}></div>
                </div>
                {formState.password.value && <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Độ mạnh mật khẩu: {formState.password.strength.label}</p>}
           </div>
          {errors.password && <p id="password-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Xác nhận Mật khẩu <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            ref={confirmPasswordInputRef}
            value={formState.confirmPassword}
            onChange={(e) => setFormState({...formState, confirmPassword: e.target.value})}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-slate-800 focus:outline-none sm:text-sm ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500 focus:border-indigo-500'}`}
            aria-errormessage="confirmPassword-error"
            aria-invalid={!!errors.confirmPassword}
            required
          />
          {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input 
              id="terms"
              name="terms"
              ref={termsInputRef}
              type="checkbox"
              checked={formState.terms}
              onChange={(e) => setFormState({...formState, terms: e.target.checked})}
              aria-errormessage="terms-error"
              aria-invalid={!!errors.terms} 
              className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded bg-slate-100 dark:bg-slate-900 ${errors.terms ? 'ring-2 ring-red-500' : ''}`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-slate-700 dark:text-slate-300">
              Tôi đồng ý với các điều khoản và điều kiện <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            {errors.terms && <p id="terms-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.terms}</p>}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Đăng ký
        </button>
      </form>

      {submittedData && (
        <div className="mt-6">
            <h3 className="font-semibold text-lg">Dữ liệu đã gửi:</h3>
            <pre className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-md text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                <code>{submittedData}</code>
            </pre>
        </div>
      )}
    </SectionCard>
  );
};

export default FormAccessibilitySection;