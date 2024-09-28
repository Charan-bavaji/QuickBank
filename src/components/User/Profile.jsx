import React, { createContext, useEffect, useState } from 'react';
import CreateAccount from './CreateAccount';
import db from '../../appwrite/databases';
import { account, databases } from '../../appwrite/config';
import { Query } from 'appwrite';
import Loading from "../Loading"
import 'flowbite';
import 'flowbite-react';
import 'flowbite/dist/flowbite.css';
import PieChart from './PieChart';
import LineChart from './LineChart';
import MetricsCard from './MatricsCard';
import CreditCard from './CreditCard';
import { Carousel } from 'flowbite-react';
import img1 from '../../assets/Personal-Loan.png.webp';
import img2 from '../../assets/How can small businesses secure business loans _28-01-2021_02-01_13.jpg'
import img3 from '../../assets/AdobeStock_502705028-scaled.jpeg'
export const ProfileContext = createContext();

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Step 1: Get the logged-in user's details
                const user = await account.get();
                const userId = user.$id;
                console.log("userID", userId);

                // Step 2: Query the profiles collection using the userId
                const response = await databases.listDocuments(
                    '66e4443f003bfa937d45',      // Replace with your Appwrite Database ID
                    '66e58919001f63dd5d2f', // Replace with your Profile Collection ID
                    [Query.equal('id', userId)]  // Query for profile where the "id" matches the user's ID
                );

                if (response.documents.length > 0) {
                    // If profile is found, set it to state
                    setProfile(response.documents[0]);
                } else {
                    console.log('Profile not found.');
                }
                const transactionsResponse = await databases.listDocuments(
                    '66e4443f003bfa937d45',                // Replace with your database ID
                    '66e5d5380029ec306103',  // Replace with your transactions collection ID
                    [Query.equal('userId', userId)]     // Query to find transactions by the user's ID
                );

                // Step 3: Set the fetched transactions in the state
                setTransactions(transactionsResponse.documents);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false); // Stop loading after profile is fetched
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        // Show a loader while fetching profile
        return <div><Loading /></div>;
    }

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            <div className=''>
                {
                    !profile ? <CreateAccount />
                        :
                        <section className="w-full h-full p-3 flex ">
                            {/* Row 2 */}
                            <div className=' w-full flex justify-between gap-3'>
                                {/* colum 1 */}
                                <div className='flex w-full justify-start items-start gap-3'>
                                    {/* C 1.1 */}
                                    <div className='w-[25rem] flex flex-col bg-[#202127] py-3 rounded-lg '>
                                        <section className=' flex gap-4 px-6'>
                                            <div className='w-[10rem] h-[5rem] py-1 bg-gradient-to-r from-slate-900 to-black rounded-xl text-center shadow-2xl'>
                                                <h1 className='text-xl'>Ballance</h1>
                                                <h1 className='text-xl font-semibold'> ₹12000</h1>
                                            </div>
                                            <div className='w-[10rem] h-[5rem] py-1  bg-gradient-to-r from-slate-900 to-black rounded-xl text-center shadow-2xl'>
                                                <h1 className='text-xl'>AC Number</h1>
                                                <h1 className='text-lg font-semibold'>ACC5456853978</h1>
                                            </div>
                                        </section>
                                        <section className=' w-full my-8 flex justify-center items-center'>
                                            <CreditCard />
                                        </section>
                                        <section className='w-full flex justify-center items-center'>
                                            <div className="w-[20rem] h-[8rem]">
                                                <Carousel slide={true} indicators={false} leftControl=" " rightControl=" ">
                                                    <img
                                                        src={img3}
                                                        alt="Image 1"
                                                        className="w-[20rem] h-[8rem] object-cover"
                                                    />
                                                    <img
                                                        src={img2}
                                                        alt="Image 2"
                                                        className="w-[20rem] h-[8rem] object-cover"
                                                    />
                                                    <img
                                                        src={img1}
                                                        alt="Image 3"
                                                        className="w-[20rem] h-[8rem] object-cover"
                                                    />
                                                </Carousel>
                                            </div>
                                        </section>
                                    </div>
                                    {/* C 1.2 */}
                                    <div className='w-full flex bg-[#202127] py-3 rounded-lg'>
                                        <section className=' w-full flex flex-col px-5 gap-3'>
                                            <div className='flex justify-between items-center'>
                                                <h1>Transactions</h1>
                                                <h1>See All </h1>
                                            </div>
                                            <div className=' w-full flex justify-center items-center'>
                                                <section className='flex justify-center items-center border-[1px] border-gray-700 w-full rounded-lg'>
                                                    <svg class="w-6 h-6 ml-5 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                    <input type="text" placeholder='Search Transactions' className=' w-full bg-inherit border-none focus:outline-none focus:ring-0' />
                                                </section>
                                            </div>
                                            {
                                                transactions.map((transaction) => (
                                                    <div className='flex justify-between py-2 border-b-[1px] border-gray-700'>
                                                        <h1>{transaction.description}</h1>
                                                        <h1>{new Date(transaction.date).toLocaleDateString()}</h1>
                                                        <h1>{transaction.type}</h1>
                                                        <h1>{transaction.amount}</h1>
                                                    </div>
                                                ))
                                            }

                                        </section>
                                    </div>
                                </div>

                                {/* colum3 */}
                                <div className='flex justify-center items-center w-[25rem] h-auto flex-col px-5 bg-[#202127] rounded-xl '>
                                    <section className='w-[16rem]'>
                                        <h1><PieChart /></h1>
                                    </section>
                                    <section className='p-2'>
                                        {/* <h1><LineChart /></h1>
                                     */}
                                        <MetricsCard />
                                    </section>
                                </div>
                            </div>
                        </section>
                }
            </div>
        </ProfileContext.Provider>
    );
};

export default Profile;