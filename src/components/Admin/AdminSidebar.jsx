import React from 'react'
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white">
            <ul className="space-y-6 p-6">

                <li>
                    <Link to="/admin-dashboard/" className="hover:text-gray-300">
                        Recent Transactions
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/allusers" className="hover:text-gray-300">
                        All Users
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default AdminSidebar
