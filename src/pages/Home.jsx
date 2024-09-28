import React from 'react'
import { Avatar, AvatarGroup } from 'flowbite-react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='bg-black w-full h-[100vh] backgroundimage bg-cover'>
            <section className='w-full'>
                <div className='w-full flex justify-between p-5'>
                    <section className='text-white'>logo</section>
                    <section class="space-x-4">
                        <Link to={'/login'}>
                            <button class="px-6 py-2 rounded-full border border-gray-500 text-white bg-transparent hover:bg-gray-800">
                                Login
                            </button>
                        </Link>
                        <Link to={'/signup'}>
                            <button class="px-6 py-2 rounded-full text-white bg-purple-500 hover:bg-purple-600">
                                Register
                            </button>
                        </Link>
                    </section>

                </div>
                <div className="bg-dark grid grid-cols-1 place-items-center p-10 text-center text-white font-sans">
                    {/* Beta tag */}
                    <div className="mb-4">
                        <span className="px-3 py-1 text-sm font-semibold text-gray-800 bg-purple-200 rounded-full">
                            Welcome to Quick Bank!
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl font-bold mb-4">
                        A Touch of Class in Your Every Financial Decision.
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-300 max-w-lg mb-8">
                        Financial decisions don’t have to be stressful or complicated. Here, we
                        believe in taking a sophisticated approach to your money management.
                    </p>

                    {/* Button and Avatar Group */}
                    <div className="flex flex-col items-center gap-4">
                        {/* CTA Button */}
                        <Link to={'/login'}>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full flex justify-center items-center gap-1">
                                Get started
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                                </svg>
                            </button>
                        </Link>

                        {/* Avatar Group and Trusted By Text */}
                        <div className="flex items-center gap-4">
                            {/* Flowbite Avatar Group */}
                            <AvatarGroup>
                                <Avatar img="https://randomuser.me/api/portraits/men/75.jpg" rounded />
                                <Avatar img="https://randomuser.me/api/portraits/women/65.jpg" rounded />
                                <Avatar img="https://randomuser.me/api/portraits/men/35.jpg" rounded />
                            </AvatarGroup>
                            <p className="text-gray-300">
                                Trusted by over <span className="font-semibold">+20K</span> people in Europe.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center gap-10'>
                    <section className='text-gray-300 border flex flex-col justify-center items-center w-[20rem] h-[8rem] text-center rounded-2xl gap-5 '>
                        <h1 className='text-lg font-semibold'>Transfer Money in 1 step</h1>
                        <p>Quick transfer,Secure transaction,<br /></p>
                    </section>
                    <section className='text-gray-300 border flex flex-col justify-center items-center w-[20rem] h-[8rem] text-center rounded-2xl gap-5 '>
                        <h1 className='text-lg font-semibold'>Interactive UserDashboard</h1>
                        <p>Graphs,Pie Chart for better <br /> over look</p>
                    </section>
                    <section className='text-gray-300 border flex flex-col justify-center items-center w-[20rem] h-[8rem] text-center rounded-2xl gap-5 '>
                        <h1 className='text-lg font-semibold flex gap-2'> <svg class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
                        </svg>
                            My Credit Card</h1>
                        <p>7436 8974 .... 6542<br />Comes with lot of rewards</p>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default Home
