import React from 'react';
import { Bus, Search, RefreshCw } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Bus,
  title = 'No Buses Found',
  description = 'We could not find any buses matching your selected route or date. Try choosing another date or sample Maharashtra route.',
  actionLabel = 'Explore Popular Routes',
  onAction
}) => {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-xl mx-auto my-6">
      <div className="w-16 h-16 bg-saffron-50 text-saffron-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-saffron-100 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

