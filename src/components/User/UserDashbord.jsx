// UserDashboard.js
import React, { useEffect, useState } from 'react';
import { account, databases } from '../../appwrite/config';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Query } from 'appwrite';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const UserDashboard = ({ loggedInUser, setLoggedInUser }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Step 1: Get the current logged-in user
                const userData = await account.get();  // Fetch the logged-in user
                const userId = userData.$id;

                // Step 2: Fetch the user's profile to get their balance and account number
                const profileResponse = await databases.listDocuments(
                    '66e4443f003bfa937d45',             // Replace with your database ID
                    '66e58919001f63dd5d2f',    // Replace with your profile collection ID
                    [Query.equal('id', userId)]   // Query to find profile by userId
                );

                if (profileResponse.documents.length > 0) {
                    const userProfile = profileResponse.documents[0];
                    setUser(userProfile);
                } else {
                    return setError('Create Profile');
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Error loading profile data.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (!user) {
        if (success) {
            return;
        }
        else {
            setSuccess(false);
            navigate("/dashboard/profile");
        }
    }

    const handleLogout = async () => {
        await account.deleteSession('current');
        setLoggedInUser(null);
    };
    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-black">
            <section className='relative flex w-[90%] h-[90%] rounded-2xl overflow-hidden backdrop-blur-sm bg-white/20' grass-effect>
                <Sidebar user={user} success={success} />
                <div className='w-full'>
                    <div className='w-full h-[5rem] backdrop-blur-sm bg-white/20'>
                        {loggedInUser ? (
                            <section className='flex justify-between items-center px-2 '>
                                <div>
                                    <h1 className='text-xl'> Wellcome {loggedInUser.name}</h1>
                                    <p> Wellcome Lorem ipsum  eveniet iure dolores, voluptas nostrum rerum numquam?</p>
                                </div>
                                <div className="py-2">
                                    <button className="bg-red-500 py-2 px-4  rounded-lg" onClick={handleLogout}>Logout</button>
                                </div>

                            </section>
                        ) : (
                            <p>Not logged in</p>
                        )}
                    </div>
                    {/* <div>
                        <h1>Add Profile Component</h1>
                    </div> */}
                    <Outlet />
                </div>
            </section >
            <div className=' absolute top-28 right-20'>
                {
                    error &&
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{error}</div>
                        <Toast.Toggle />
                    </Toast>
                }
            </div>
        </div >
    );
};

export default UserDashboard;
