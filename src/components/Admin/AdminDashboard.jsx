import React, { useEffect, useState } from 'react'
import { account } from '../../appwrite/config';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Toast } from 'flowbite-react';
import { HiX } from "react-icons/hi";
import { Avatar } from "flowbite-react";
import avathar from "../../assets/wallpaperflare.com_wallpaper (57).jpg"
const AdminDashboard = ({ loggedInUser, setLoggedInUser }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await account.get();
            console.log(response);
        }
        getUser();
    }, []);
    const handleLogout = async () => {
        await account.deleteSession('current');
        setLoggedInUser(null);
    };
    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-gradient-to-tr from-[#404147] to-[#3f4047] text-[#c4c5cc]">
            {/* #404147 #3f4047 */}
            <section className="relative flex w-[90%] h-[90%] rounded-2xl overflow-hidden bg-[#141518] border-[1px] border-gray-600">
                <AdminSidebar />  {/* Pass user data to Sidebar */}
                <div className="w-full "> {/*//add overflow scrool here*/}
                    <div className="w-full h-[4rem] ">
                        {loggedInUser ? (
                            <section className="flex justify-between items-center px-2">
                                <div className=' pl-3'>
                                    <h1 className="text-xl font-bold">Welcome '{loggedInUser.name}'</h1>
                                    <p>Manage your banking activities here.</p>
                                </div>

                                <div className="relative py-2 group flex justify-between w-[5rem]">
                                    <div>
                                        <Avatar img={avathar} alt="avatar" rounded />
                                    </div>
                                    <button className="bg-red-500  rounded-lg" onClick={handleLogout}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                    </svg>
                                        <h1 className='absolute hidden right-1 group-hover:flex'>logout</h1>
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
    )
}

export default AdminDashboard