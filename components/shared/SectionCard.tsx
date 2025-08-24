
import React from 'react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-slate-200" aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}>
      <h2 id={title.replace(/\s+/g, '-').toLowerCase()} className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">
        {title}
      </h2>
      <div className="text-slate-700 space-y-4">
        {children}
      </div>
    </section>
  );
};

export default SectionCard;
