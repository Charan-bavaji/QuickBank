import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home_9046092.png'
import transfer from '../assets/left-right-arrows_12080079.png'
import withdraw from '../assets/withdrawal_15027606.png'
import transactions from '../assets/arrow_10436867.png'
import deposit from '../assets/wallet_8865789.png'
const Sidebar = ({ user }) => {
    return (
        <div className="w-auto h-full  text-black bg-[#3C3D37]">
            <div className=''>
                <div className='h-[5rem]'>
                </div>
                <ul className=" w-full flex flex-col ">
                    <Link to="/dashboard/profile" className="">
                        <li className=' w-full text-center py-4 px-2 text-xl border-b-2 border-[#697565] hover:bg-[#697565] '>
                            <img src={home} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/deposit" className="">
                        <li className=' w-full text-center py-4 px-2 text-xl  border-b-2 border-[#697565] hover:bg-[#697565] '>
                            <img src={deposit} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/transfer" className="">
                        <li className=' w-full text-center py-4 px-2 text-xl  border-b-2 border-[#697565] hover:bg-[#697565]'>
                            <img src={transfer} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/withdraw" className="">
                        <li className=' w-full text-center py-4 px-2 text-xl  border-b-2 border-[#697565] hover:bg-[#697565]'>
                            <img src={withdraw} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/dashboard/transactions" className="">
                        <li className=' w-full text-center py-4 px-2 text-xl  border-b-2 border-[#697565] hover:bg-[#697565]'>
                            <img src={transactions} alt='deposit' width={30} />

                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
