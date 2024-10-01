import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home.png'
import transfer from '../assets/left-and-right-arrows.png'
import withdraw from '../assets/withdrawal.png'
import transactions from '../assets/bank-statement.png'
import deposit from '../assets/wallet (1).png'
import logo from '../assets/logo.png'
const Sidebar = ({ user }) => {
    return (
        <div className="w-auto h-full  text-black bg-[#202127]">
            <div className=''>
                <div className='py-5 bg-black' >
                    <img src={logo} alt="logo" width={70} />
                </div>
                <ul className=" w-full flex flex-col ">
                    <Link to="/dashboard" className="">
                        <li className=' w-full text-center py-4 px-5 text-xl border-b-2 border-gray-600 hover:bg-gray-600  '>
                            <img src={home} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/deposit" className="">
                        <li className=' w-full text-center py-4 px-5 text-xl  border-b-2 border-gray-600 hover:bg-gray-600  '>
                            <img src={deposit} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/transfer" className="">
                        <li className=' w-full text-center py-4 px-5 text-xl  border-b-2 border-gray-600 hover:bg-gray-600 '>
                            <img src={transfer} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/withdraw" className="">
                        <li className=' w-full text-center py-4 px-5 text-xl  border-b-2 border-gray-600 hover:bg-gray-600 '>
                            <img src={withdraw} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/transactions" className="">
                        <li className=' w-full text-center py-4 px-5 text-xl  border-b-2 border-gray-600 hover:bg-gray-600  '>
                            <img src={transactions} alt='deposit' width={30} />

                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
