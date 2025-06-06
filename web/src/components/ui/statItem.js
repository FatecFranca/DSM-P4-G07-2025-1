"use client";

export function StatItem({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1 px-2">
      <span className="text-gray-600 text-sm">{label}:</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}