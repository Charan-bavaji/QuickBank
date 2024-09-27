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
    <div>
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.$id}>
            {transaction.description} - ${transaction.amount}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentTransaction;

