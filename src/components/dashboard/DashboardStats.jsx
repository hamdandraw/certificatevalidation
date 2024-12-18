import { useMemo } from 'react';

export const DashboardStats = ({ certificates }) => {
  const stats = useMemo(() => ({
    total: certificates.length,
    beginner: certificates.filter(c => c.level === 'Beginner').length,
    intermediate: certificates.filter(c => c.level === 'Intermediate').length,
    advanced: certificates.filter(c => c.level === 'Advanced').length,
  }), [certificates]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCard title="Total Certificates" value={stats.total} bgColor="bg-blue-500" />
      <StatCard title="Beginner" value={stats.beginner} bgColor="bg-green-500" />
      <StatCard title="Intermediate" value={stats.intermediate} bgColor="bg-yellow-500" />
      <StatCard title="Advanced" value={stats.advanced} bgColor="bg-red-500" />
    </div>
  );
};

const StatCard = ({ title, value, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-sm p-4 text-white`}>
    <h3 className="text-sm font-medium opacity-90">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);