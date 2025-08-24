import React, { useState, useRef, useEffect } from 'react';
import SectionCard from './shared/SectionCard';

interface SectionProps {
  id: string;
}

const TabsWidgetSection: React.FC<SectionProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    { title: 'Hồ sơ', content: 'Đây là nội dung của tab Hồ sơ. Bạn có thể xem và chỉnh sửa thông tin cá nhân tại đây.' },
    { title: 'Mật khẩu', content: 'Đây là nội dung của tab Mật khẩu. Thay đổi mật khẩu của bạn để bảo mật tài khoản.' },
    { title: 'Thông báo', content: 'Đây là nội dung của tab Thông báo. Quản lý các tùy chọn thông báo qua email và SMS.' },
  ];

  useEffect(() => {
    // We only want to focus the tab if it was changed via keyboard.
    // A simple focus on activeTab change can be jarring for mouse users.
    // For this demo, keeping it simple. In a real app, you might track the interaction source.
    // tabRefs.current[activeTab]?.focus();
  }, [activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    }

    if (newIndex !== index) {
      e.preventDefault();
      setActiveTab(newIndex);
      // Focus the new tab immediately after state update
      setTimeout(() => tabRefs.current[newIndex]?.focus(), 0);
    }
  };

  return (
    <SectionCard title="Widget Phức hợp với ARIA: Tabs" id={id}>
      <p>
        Tabs là một thành phần giao diện người dùng phổ biến. Để làm cho chúng có thể truy cập, chúng ta cần sử dụng các vai trò ARIA và quản lý điều hướng bàn phím một cách chính xác.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-4 my-2">
        <li>Vùng chứa các tab có <code>role="tablist"</code>.</li>
        <li>Mỗi tab là một <code>&lt;button&gt;</code> với <code>role="tab"</code>.</li>
        <li>Tab đang hoạt động có <code>aria-selected="true"</code>, các tab khác có <code>aria-selected="false"</code>.</li>
        <li>Mỗi tab sử dụng <code>aria-controls</code> để trỏ đến ID của panel nội dung tương ứng.</li>
        <li>Mỗi panel nội dung có <code>role="tabpanel"</code> và được liên kết ngược lại với tab bằng <code>aria-labelledby</code>.</li>
        <li>Sử dụng các phím mũi tên Trái/Phải để điều hướng giữa các tab.</li>
      </ul>

      <div className="mt-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <div role="tablist" aria-label="Cài đặt tài khoản" className="flex border-b border-slate-200 dark:border-slate-700">
          {tabs.map((tab, index) => (
            <button
              key={index}
              id={`tab-${index}`}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              tabIndex={activeTab === index ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => { tabRefs.current[index] = el; }}
              className={`px-4 py-3 text-sm font-medium -mb-px border-b-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 ${
                activeTab === index
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div>
          {tabs.map((tab, index) => (
            <div
              key={index}
              id={`tabpanel-${index}`}
              role="tabpanel"
              aria-labelledby={`tab-${index}`}
              hidden={activeTab !== index}
              className="p-4 focus:outline-none"
              tabIndex={0}
            >
              <p>{tab.content}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default TabsWidgetSection;