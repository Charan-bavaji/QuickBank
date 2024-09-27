import React, { createContext, useEffect, useState } from 'react'
import CreateAccount from './CreateAccount';
import db from '../../appwrite/databases';
import { account, databases } from '../../appwrite/config';
import { Query } from 'appwrite';

export const ProfileContext = createContext();
const Profile = () => {
    const [profile, setProfile] = useState(null);
    // check profile is present or not in db;

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
                    // Assuming the profile is found, set it to state
                    setProfile(response.documents[0]);
                } else {
                    console.log('Profile not found.');
                }

            } catch (err) {

            } finally {

            }
        };

        fetchUserProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            <div>
                {
                    !profile ? <CreateAccount /> : <div>{profile.phoneNumber}</div>
                }
            </div>
        </ProfileContext.Provider>
    )
}

export default Profile;