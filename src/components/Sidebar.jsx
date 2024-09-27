import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user }) => {
    return (
        <div className="w-64 h-full bg-gray-800 text-black backdrop-blur-sm bg-white/10">
            <div className='h-[5rem]'>
            </div>
            <ul className=" w-full flex flex-col  ">
                <Link to="/dashboard/profile" className="">
                    <li className=' w-full text-center py-4 text-xl border rounded-lg hover:border-pink-500'>
                        Profile
                    </li>
                </Link>
                <Link to="/dashboard/deposit" className="">
                    <li className=' w-full text-center py-4 text-xl border rounded-lg hover:border-pink-500'>
                        Deposit
                    </li>
                </Link>
                <Link to="/dashboard/transfer" className="">
                    <li className=' w-full text-center py-4 text-xl border rounded-lg hover:border-pink-500'>
                        Transfer
                    </li>
                </Link>
                <Link to="/dashboard/withdraw" className="">
                    <li className=' w-full text-center py-4 text-xl border rounded-lg hover:border-pink-500'>
                        Withdraw
                    </li>
                </Link>
                <Link to="/dashboard/transactions" className="">
                    <li className=' w-full text-center py-4 text-xl border rounded-lg hover:border-pink-500'>
                        Transactions
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default Sidebar;
