import React, { useState, useEffect } from 'react';
import { Query } from 'appwrite';
import { databases } from '../../appwrite/config'

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page) => {
    try {
      const response = await databases.listDocuments(
        '66e4443f003bfa937d45',
        '66e58919001f63dd5d2f',
        [
          Query.limit(10), // Limit to 10 users per page
          Query.offset((page - 1) * 10), // Skip users for previous pages
        ]
      );
      setUsers(response.documents);
      setTotalPages(Math.ceil(response.total / 10)); // Assuming 'total' is returned in the response
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.$id}>
            {user.name || user.email} {/* Assuming profile collection has name or email field */}
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

export default AllUsers;
