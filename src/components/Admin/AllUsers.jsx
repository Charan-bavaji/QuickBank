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
    <div className="max-[90%] h-[34rem] p-2 mx-10 bg-[#202127] rounded-lg shadow-md overflow-y-scroll ">
      <h2 className=' p-3 text-lg font-bold' >All Users</h2>

      <div className=' w-full flex justify-center items-center my-3'>
        <section className='flex justify-center items-center border-[1px] border-gray-700 w-full rounded-lg'>
          <svg class="w-6 h-6 ml-5 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
          <input type="text" placeholder='Search Transactions' className=' w-full bg-inherit border-none focus:outline-none focus:ring-0' />
        </section>

      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-inherit border border-gray-700">
          <thead>
            <tr className='text-sm'>
              <th className="px-4 py-2 border border-gray-400">ID</th>
              <th className="px-4 py-2 border border-gray-400">Name</th>
              <th className="px-4 py-2 border border-gray-400">Last Name</th>
              <th className="px-4 py-2 border border-gray-400">Email</th>
              <th className="px-4 py-2 border border-gray-400">Account Number</th>
              <th className="px-4 py-2 border border-gray-400">Bank Account Type</th>
              <th className="px-4 py-2 border border-gray-400">Age</th>
              <th className="px-4 py-2 border border-gray-400">Phone Number</th>
              <th className="px-4 py-2 border border-gray-400">Address</th>
              <th className="px-4 py-2 border border-gray-400">DOB</th>
              <th className="px-4 py-2 border border-gray-400">Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center text-xs ">
                <td className="px-4 py-2 border border-gray-700">{user.id}</td>
                <td className="px-4 py-2 border border-gray-700">{user.name}</td>
                <td className="px-4 py-2 border border-gray-700">{user.lastName}</td>
                <td className="px-4 py-2 border border-gray-700">{user.email}</td>
                <td className="px-4 py-2 border border-gray-700">{user.accountNumber}</td>
                <td className="px-4 py-2 border border-gray-700">{user.bankAcountType}</td>
                <td className="px-4 py-2 border border-gray-700">{user.age}</td>
                <td className="px-4 py-2 border border-gray-700">{user.phoneNumber}</td>
                <td className="px-4 py-2 border border-gray-700">{user.address}</td>
                <td className="px-4 py-2 border border-gray-700">{new Date(user.dob).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-700">{user.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
