import React, { useEffect, useState } from 'react';
import { account, databases } from '../../appwrite/config';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Query } from 'appwrite';
import { Toast } from 'flowbite-react';
import { HiX } from "react-icons/hi";
import { Avatar } from "flowbite-react";
import avathar from "../../assets/wallpaperflare.com_wallpaper (57).jpg"
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
                    navigate('/dashboard');  // Redirect to profile creation if no profile found
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
        <div className="w-full h-[100vh] flex justify-center items-center bg-gradient-to-tr from-[#404147] to-[#3f4047] text-[#c4c5cc]">
            {/* #404147 #3f4047 */}
            <section className="relative flex w-[90%] h-[90%] rounded-2xl overflow-hidden bg-[#141518] border-[1px] border-gray-600">
                <Sidebar user={user} />  {/* Pass user data to Sidebar */}
                <div className="w-full "> {/*//add overflow scrool here*/}
                    <div className="w-full h-[4rem] ">
                        {loggedInUser ? (
                            <section className="flex justify-between items-center px-2">
                                <div className=' pl-3'>
                                    <h1 className="text-xl font-bold">Welcome '{loggedInUser.name}'</h1>
                                    <p>Manage your banking activities here.</p>
                                </div>

                                <div className="relative py-2 group flex justify-between gap-7">
                                    <div>
                                        <Avatar img={avathar} alt="avatar" rounded />
                                    </div>
                                    <button className="bg-red-500 px-2  rounded-lg" onClick={handleLogout}>
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                        </svg>
                                        <h1 className='absolute hidden right-1 -bottom-4 group-hover:flex'>logout</h1>
                                    </button>
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
