import React, { useState, useEffect } from 'react';
import { account, databases } from '../../appwrite/config';  // Import Appwrite configuration
import { Query } from 'appwrite';
import db from '../../appwrite/databases';
import NoProfile from '../NoProfile';
import Loading from '../Loading';
const Transfer = () => {
    const [user, setUser] = useState(null);
    const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
    const [pin, setPin] = useState(null);
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                //  Get the current logged-in user
                const userData = await account.get();  // Fetch the logged-in user
                const userId = userData.$id;

                // Fetch the user's profile to get their balance and account number
                const profileResponse = await databases.listDocuments(
                    '66e4443f003bfa937d45',             // Replace with your database ID
                    '66e58919001f63dd5d2f',    // Replace with your profile collection ID
                    [Query.equal('id', userId)]   // Query to find profile by userId
                );

                if (profileResponse.documents.length > 0) {
                    const userProfile = profileResponse.documents[0];
                    setUser(userProfile);
                    setBalance(userProfile.balance);  // Set the current balance
                } else {
                    throw new Error('User profile not found.');
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setErrorMessage('Error loading profile data.');
            } finally {
                setLoading(false);

            }
        };

        fetchUserData();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccess(null);

        try {
            // Fetch the recipient's profile using their account number
            const recipientResponse = await databases.listDocuments(
                '66e4443f003bfa937d45',                // Replace with your database ID
                '66e58919001f63dd5d2f',       // Replace with your profile collection ID
                [Query.equal('accountNumber', recipientAccountNumber)]  // Query to find the recipient by account number
            );

            if (recipientResponse.documents.length === 0) {
                throw new Error('Recipient not found.');
            }

            const recipientProfile = recipientResponse.documents[0];
            const recipientID = recipientProfile.$id;
            // Check for pin valididty

            if (pin != user.pin) {
                return setErrorMessage('invalid pin');
            }

            // Check if the user has enough balance
            if (amount <= 0 || amount > balance) {
                throw new Error('Insufficient funds or invalid amount.');
            }

            const newSenderBalance = balance - amount;
            const newRecipientBalance = recipientProfile.balance + amount;

            //  Update the sender's balance (the logged-in user)
            await databases.updateDocument(
                '66e4443f003bfa937d45',                // Replace with your database ID
                '66e58919001f63dd5d2f',       // Replace with your profile collection ID
                user.$id,                             // The logged-in user's document ID
                { balance: newSenderBalance }         // Update the sender's balance
            );

            //  Update the recipient's balance
            await databases.updateDocument(
                '66e4443f003bfa937d45',                // Replace with your database ID
                '66e58919001f63dd5d2f',       // Replace with your profile collection ID
                recipientProfile.$id,                 // The recipient's document ID
                { balance: newRecipientBalance }      // Update the recipient's balance
            );

            //  Record the transfer transaction for both sender and recipient
            const transferTransaction = {
                type: 'transfer',
                amount: amount,
                status: "successfull",
                balanceBefore: balance,
                balanceAfter: newSenderBalance,
                recipientAccountNumber: recipientAccountNumber,
                description: `Transfer to ${recipientAccountNumber}`,
                date: new Date().toISOString(),
                userId: user.$id,  // Sender's userId
            };
            const recipientTransaction = {
                type: 'receive',
                amount: amount,
                status: "successfull",
                balanceBefore: recipientProfile.balance,
                balanceAfter: newRecipientBalance,
                recipientAccountNumber: user.accountNumber,  // The sender's account number
                description: `Received from ${user.accountNumber}`,
                date: new Date().toISOString(),
                userId: recipientProfile.$id,  // Recipient's userId
            };
            await db.transactions.create(transferTransaction);
            await db.transactions.create(recipientTransaction);

            setSuccess('Transfer successful!');
            setBalance(newSenderBalance);  // Update sender's balance in the UI
        } catch (err) {
            console.error('Transfer failed:', err);
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <div><Loading /></div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/10">
            <h1 className="text-2xl font-semibold mb-4">Transfer Money</h1>

            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <form onSubmit={handleTransfer}>
                <div>
                    <label className="block text-sm font-medium ">Recipient Account Number</label>
                    <input
                        type="text"
                        value={recipientAccountNumber}
                        onChange={(e) => setRecipientAccountNumber(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-700 bg-inherit rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium ">Pin</label>
                    <input
                        type="number"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-700 bg-inherit rounded-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium ">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-700 bg-inherit rounded-md"
                        min="1"
                        required
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black"
                        disabled={loading}
                    >
                        {loading ? 'Transferring...' : 'Transfer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Transfer;


