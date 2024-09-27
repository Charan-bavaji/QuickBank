import React, { useEffect } from 'react'
import { account } from '../../appwrite/config';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
const AdminDashboard = ({ loggedInUser, setLoggedInUser }) => {
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
        <div>
            <h1>Am Admin</h1>
            <AdminSidebar />
            <div>
                <Outlet />
            </div>
            {loggedInUser ? (
                <div>
                    <p>Logged in as {loggedInUser.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Not logged in</p>
            )}
        </div>
    )
}

export default AdminDashboard