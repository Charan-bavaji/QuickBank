import React, { createContext, useEffect, useState } from 'react';
import CreateAccount from './CreateAccount';
import db from '../../appwrite/databases';
import { account, databases } from '../../appwrite/config';
import { Query } from 'appwrite';
import Loading from "../Loading"
export const ProfileContext = createContext();

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <div>
                {
                    !profile ? <CreateAccount />
                        :
                        <section className="w-full h-full p-3 flex flex-col">
                            <div className='flex'>
                                {/* Row 1 */}
                                <section>
                                    <h1>Pie Chart</h1>
                                </section>

                                <section>
                                    <h1> Graphs Chart</h1>
                                </section>
                            </div>
                            {/* Row 2 */}
                            <div className='flex w-full justify-center items-center'>
                                <section className=' flex gap-4 px-6'>
                                    <div className='w-[10rem] h-[5rem] bg-red-300 rounded-xl'>
                                        ballance
                                    </div>
                                    <div className='w-[10rem] h-[5rem] bg-red-300 rounded-xl'>
                                        ballance
                                    </div>
                                    <div className='w-[10rem] h-[5rem] bg-red-300 rounded-xl'>
                                        ballance
                                    </div>
                                </section>
                                <section>
                                    <div className='w-[16rem] h-[8rem] bg-red-300 rounded-xl'>
                                        ballance
                                    </div>
                                </section>
                            </div>
                        </section>
                }
            </div>
        </ProfileContext.Provider>
    );
};

export default Profile;