import React from 'react'
import { Link } from 'react-router-dom';
import home from '../../assets/home.png'
import transactions from '../../assets/left-and-right-arrows.png'

const AdminSidebar = () => {
    return (
        <div className="w-auto h-full  text-black bg-[#202127]">
            <div className=''>
                <div className='h-[5rem]'>
                </div>
                <ul className=" w-full flex flex-col ">
                    <Link to="/admin-dashboard/" className="">
                        <li className=' w-full text-center py-4 px-5 text-xl border-b-2 border-gray-600 hover:bg-gray-600  '>
                            <img src={home} alt='deposit' width={30} />
                        </li>
                    </Link>
                    <Link to="/admin-dashboard/alltransactions" className="">
                        <li className=' w-full text-center py-4 px-5 text-xl  border-b-2 border-gray-600 hover:bg-gray-600  '>
                            <img src={transactions} alt='deposit' width={30} />
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default AdminSidebar
