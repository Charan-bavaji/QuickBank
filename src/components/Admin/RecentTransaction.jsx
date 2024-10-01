import React, { useState, useEffect } from 'react';
import { databases } from '../../appwrite/config'
import { Query } from 'appwrite';
const RecentTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async (page) => {
    try {
      const response = await databases.listDocuments(
        '66e4443f003bfa937d45',
        '66e5d5380029ec306103',
        [
          // Limit results to 15 per page
          Query.limit(15),
          // Skip documents based on the current page
          Query.offset((page - 1) * 15),
        ]
      );
      setTransactions(response.documents);
      // Set total pages if needed (assuming response has total count)
      setTotalPages(Math.ceil(response.total / 15));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="max-[90%] h-[34rem] p-2 mx-10 bg-[#202127] rounded-lg shadow-md overflow-y-scroll ">
      <h1 className="text-2xl font-semibold m-4">Your Transactions</h1>
      {transactions.length === 0 ? (
        <div>No transactions found.</div>
      ) : (
        <table className="min-w-full table-auto border-black">
          <thead>
            <tr>
              <th className="px-4 border py-2 border-gray-400">Date</th>
              <th className="px-4 border py-2 border-gray-400">Type</th>
              <th className="px-4 border py-2 border-gray-400">Amount</th>
              <th className="px-4 border py-2 border-gray-400">Balance Before</th>
              <th className="px-4 border py-2 border-gray-400">Balance After</th>
              <th className="px-4 border py-2 border-gray-400">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.$id}>
                <td className="border px-4 py-2 border-gray-700">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2 border-gray-700">{transaction.type}</td>
                <td className="border px-4 py-2 border-gray-700">{transaction.amount}</td>
                <td className="border px-4 py-2 border-gray-700">{!transaction.balanceBefore ? "null" : transaction.balanceBefore}</td>
                <td className="border px-4 py-2 border-gray-700">{!transaction.balanceAfter ? "null" : transaction.balanceAfter}</td>
                <td className="border px-4 py-2 border-gray-700">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentTransaction;

