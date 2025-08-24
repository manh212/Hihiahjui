import React from 'react';

interface SectionCardProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ id, title, children }) => {
  const headingId = `${id}-heading`;
  return (
    <section 
      id={id}
      className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 scroll-mt-20" 
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
        {title}
      </h2>
      <div className="text-slate-700 dark:text-slate-300 space-y-4">
        {children}
      </div>
    </section>
  );
};

export default SectionCard;