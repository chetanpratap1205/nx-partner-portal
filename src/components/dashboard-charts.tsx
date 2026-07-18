'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = {
  new: '#3b82f6', // blue-500
  contacted: '#eab308', // yellow-500
  demo_scheduled: '#a855f7', // purple-500
  converted: '#10b981', // emerald-500
  rejected: '#ef4444', // red-500
};

export function DashboardCharts({ leads }: { leads: any[] }) {
  // Aggregate leads by status
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: 'New', value: statusCounts.new || 0, key: 'new' },
    { name: 'Contacted', value: statusCounts.contacted || 0, key: 'contacted' },
    { name: 'Demo', value: statusCounts.demo_scheduled || 0, key: 'demo_scheduled' },
    { name: 'Converted', value: statusCounts.converted || 0, key: 'converted' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="h-[300px] w-full mt-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={false} 
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.key as keyof typeof COLORS] || '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
