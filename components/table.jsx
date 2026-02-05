import React from 'react';

export const Table = ({ children }) => (
  <table className="min-w-full border border-gray-200 rounded">{children}</table>
);

export const TableHead = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableRow = ({ children }) => (
  <tr className="border-t">{children}</tr>
);

export const TableCell = ({ children }) => (
  <td className="px-4 py-2">{children}</td>
);

export const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);
export const TableHeaderCell = ({ children }) => (
  <th className="px-4 py-2 text-left font-semibold text-gray-700">{children}</th>
);