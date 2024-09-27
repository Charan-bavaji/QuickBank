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
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user profile and balance on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Get current logged-in user
                const userData = await account.get();
                const userId = userData.$id;

                // Fetch user profile based on userId
                const profileResponse = await databases.listDocuments(
                    '66e4443f003bfa937d45',  // Replace with your Appwrite database ID
                    '66e58919001f63dd5d2f',  // Replace with your profile collection ID
                    [Query.equal('id', userId)]
                );

                if (profileResponse.documents.length > 0) {
                    const userProfile = profileResponse.documents[0];
                    setUser(userProfile);  // Set user profile to state
                    setBalance(userProfile.balance);  // Set balance if it's part of user profile
                } else {
                    setError('No profile found. Please create a profile.');
                    navigate('/dashboard/profile');  // Redirect to profile creation if no profile found
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Error loading profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // Logout handler
    const handleLogout = async () => {
        try {
            await account.deleteSession('current');  // Log out the current session
            setLoggedInUser(null);  // Clear the loggedInUser state
            navigate('/login');  // Redirect to login page after logout
        } catch (err) {
            console.error('Error during logout:', err);
            setError('Failed to log out. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;  // Show loading indicator while fetching data
    }

    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-[#181C14] text-white">
            <section className="relative flex w-[90%] h-[90%] rounded-2xl overflow-hidden bg-[#100f00] ">
                <Sidebar user={user} />  {/* Pass user data to Sidebar */}
                <div className="w-full">
                    <div className="w-full h-[5rem] border-b-2 border-[#697565]">
                        {loggedInUser ? (
                            <section className="flex justify-between items-center px-2">
                                <div className=' pl-3'>
                                    <h1 className="text-xl font-bold">Welcome '{loggedInUser.name}'</h1>
                                    <p>Manage your banking activities here.</p>
                                </div>
                                <div className="py-2">
                                    <button className="bg-red-500 py-2 px-4 rounded-lg" onClick={handleLogout}>Logout</button>
                                </div>
                            </section>
                        ) : (
                            <p>Not logged in</p>
                        )}
                    </div>
                    <Outlet />  {/* For nested routing */}
                </div>
            </section>

            {/* Toast for error display */}
            {error && (
                <div className="absolute top-28 right-20">
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{error}</div>
                        <Toast.Toggle />
                    </Toast>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
