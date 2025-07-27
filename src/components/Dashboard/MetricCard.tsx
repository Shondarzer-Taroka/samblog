import React from 'react';

const MetricCard = ({ title, value, change }: { title: string; value: string; change: string }) => {
  const days = ['s', 's', 'm', 't', 'w', 't', 'f'];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <span className={`ml-2 text-sm font-medium ${change.includes('↑') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-end space-x-1 h-12">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-3 rounded-t-sm ${index < 5 ? 'bg-blue-500' : 'bg-gray-200'}`}
                style={{ height: `${(index % 7) + 1}0%` }}
              />
              <span className="text-xs text-gray-500 mt-1">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;