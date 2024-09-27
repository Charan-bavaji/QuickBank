import React from 'react'
import { Link } from 'react-router-dom';
const NoProfile = () => {
    return (
        <div className='w-full h-[34rem] flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-6'>
                <h1 className='text-3xl'>Profile not yet created !</h1>
                <img src="" alt="" />
                <Link to={'/dashboard/profile'}>
                    <button className='bg-blue-500 py-3 px-6 rounded-xl'>Create now</button>
                </Link>
            </div>
        </div>
    )
}
export default NoProfile;