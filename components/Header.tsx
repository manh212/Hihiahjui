
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl font-extrabold text-indigo-600">
          <h1>Demo Tiếp Cận</h1>
        </div>
        <nav aria-label="Điều hướng chính">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-slate-600 hover:text-indigo-600 font-medium">Trang chủ</a></li>
            <li><a href="#" className="text-slate-600 hover:text-indigo-600 font-medium">Giới thiệu</a></li>
            <li><a href="#" className="text-slate-600 hover:text-indigo-600 font-medium">Liên hệ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
