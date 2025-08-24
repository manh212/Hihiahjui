
import React from 'react';

const SkipToContentLink: React.FC = () => {
  return (
    <a 
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Bỏ qua đến nội dung chính
    </a>
  );
};

export default SkipToContentLink;
