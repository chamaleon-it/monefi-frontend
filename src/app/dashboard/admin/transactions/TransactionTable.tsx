"use client";
export default function TransacionsTable() {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-monefi-black">Transactions</h1>
        <div className="flex items-center gap-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-monefi-pink focus:border-transparent">
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      <div className="bg-monefi-off-pink rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-inter font-medium border-b border-monefi-black">
                <th className="py-4 px-4 text-left">SL.No</th>
                <th className="py-4 px-4 text-left">User</th>
                <th className="py-4 px-4 text-left">Symbol</th>
                <th className="py-4 px-4 text-left">Quantity</th>
                <th className="py-4 px-4 text-left">Unit Price</th>
                <th className="py-4 px-4 text-left">Total Value</th>
                <th className="py-4 px-4 text-left">Transactions</th>
                <th className="py-4 px-4 text-left">Investment Type</th>
                <th className="py-4 px-4 text-left">Date</th>
                <th className="py-4 px-4 text-left">Status</th>
                <th className="py-4 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
