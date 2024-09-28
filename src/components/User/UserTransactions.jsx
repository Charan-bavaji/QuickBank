import React, { useState, useEffect } from 'react';
import { account, databases } from '../../appwrite/config';  // Import Appwrite configuration
import { Query } from 'appwrite';
import NoProfile from '../NoProfile';

const UserTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Step 1: Get the current logged-in user
                const user = await account.get(); // Fetch the current logged-in user
                const userId = user.$id;          // Get the user's Appwrite ID
                // Step 2: Fetch the user's profile to get their balance and account number
                const profileResponse = await databases.listDocuments(
                    '66e4443f003bfa937d45',             // Replace with your database ID
                    '66e58919001f63dd5d2f',    // Replace with your profile collection ID
                    [Query.equal('id', userId)]   // Query to find profile by userId
                );

                if (profileResponse.documents.length > 0) {
                    const userProfile = profileResponse.documents[0];
                    setProfile(userProfile);
                    // Set the current balance
                } else {
                    throw new Error('User profile not found.');
                }
                // Step 2: Query the Transactions Collection for this user's transactions
                const transactionsResponse = await databases.listDocuments(
                    '66e4443f003bfa937d45',                // Replace with your database ID
                    '66e5d5380029ec306103',  // Replace with your transactions collection ID
                    [Query.equal('userId', userId)]     // Query to find transactions by the user's ID
                );

                // Step 3: Set the fetched transactions in the state
                setTransactions(transactionsResponse.documents);
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('Failed to load transactions.');
            } finally {
                setLoading(false);
            }
        };
        console.log(transactions)
        fetchTransactions();
    }, []);
    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div className="max-[90%] h-[34rem] p-2 mx-10 bg-[#202127] rounded-lg shadow-md overflow-y-scroll ">
            <h1 className="text-2xl font-semibold m-4">Your Transactions</h1>
            {transactions.length === 0 ? (
                <div>No transactions found.</div>
            ) : (
                <table className="min-w-full table-auto border-black">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Balance Before</th>
                            <th className="px-4 py-2">Balance After</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.$id}>
                                <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{transaction.type}</td>
                                <td className="border px-4 py-2">{transaction.amount}</td>
                                <td className="border px-4 py-2">{!transaction.balanceBefore ? "null" : transaction.balanceBefore}</td>
                                <td className="border px-4 py-2">{!transaction.balanceAfter ? "null" : transaction.balanceAfter}</td>
                                <td className="border px-4 py-2">{transaction.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserTransactions;
