import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { databases, account } from '../../appwrite/config';  // Your Appwrite config
import { Query } from 'appwrite';
import db from '../../appwrite/databases';
import NoProfile from '../NoProfile';

const Withdraw = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const user = await account.get();
                const userId = user.$id;

                // Fetch the user's profile document from the profile collection
                const profileResponse = await databases.listDocuments(
                    '66e4443f003bfa937d45',
                    '66e58919001f63dd5d2f',
                    [Query.equal('id', userId)]
                );

                if (profileResponse.documents.length > 0) {
                    setProfile(profileResponse.documents[0]);
                } else {
                    setError('Profile not found.');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const initialValues = {
        withdrawAmount: '',
        pin: ''
    };

    const validationSchema = Yup.object({
        withdrawAmount: Yup.number()
            .min(1, 'Withdrawal amount must be greater than 0')
            .required('Withdrawal amount is required'),
        pin: Yup.number()
            .min(1, 'Withdrawal amount must be greater than 0')
            .required('Pin is required'),
    });

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const user = await account.get();
            const userId = user.$id;

            // Check if the profile is available
            if (!profile) {
                setError('User profile not found');
                setSubmitting(false);
                return;
            }

            // Validate if user has enough balance
            const balanceBefore = profile.balance;
            const withdrawAmount = parseFloat(values.withdrawAmount);

            if (withdrawAmount > balanceBefore) {
                setError('Insufficient balance for withdrawal.');
                setSubmitting(false);
                return;
            }

            // Calculate the balance after withdrawal
            const balanceAfter = balanceBefore - withdrawAmount;

            // Update user's balance in the profile collection
            await databases.updateDocument(
                '66e4443f003bfa937d45',
                '66e58919001f63dd5d2f',
                profile.$id,
                { balance: balanceAfter }
            );

            // Record the withdrawal in the transactions collection
            const transactionData = {
                userId,
                type: 'withdraw',
                amount: withdrawAmount,
                description: 'ATM withdrawal',
                date: new Date().toISOString(),
                balanceBefore,
                balanceAfter,
                status: "successfull",
                accountNumber: profile.accountNumber
            };

            const response = await db.transactions.create(transactionData);
            console.log('Withdrawal successful:', transactionData);
            resetForm();
            setError(null);

        } catch (err) {
            console.error('Error during withdrawal:', err);
            setError('Withdrawal failed.');
        } finally {
            setSubmitting(false);
        }
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6  rounded-lg shadow-md backdrop-blur-sm bg-white/10">
            <h1 className="text-2xl font-semibold mb-4">Withdraw Funds</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="withdrawAmount" className="block text-sm font-medium ">Withdraw Amount</label>
                            <Field
                                type="number"
                                id="withdrawAmount"
                                name="withdrawAmount"
                                className="mt-1 block w-full p-2 border border-gray-700 bg-inherit rounded-md focus:outline-none focus:ring-0"
                            />
                            <ErrorMessage name="withdrawAmount" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium ">Enter Pin</label>
                            <Field
                                type="number"
                                id="pin"
                                name="pin"
                                className="mt-1 block w-full p-2 border border-gray-700 bg-inherit rounded-md focus:outline-none focus:ring-0"
                            />
                            <ErrorMessage name="pin" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 px-4  rounded-md hover:bg-black"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : 'Withdraw'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Withdraw;
