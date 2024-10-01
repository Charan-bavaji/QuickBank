import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { databases, account } from '../../appwrite/config';  // Your Appwrite config
import { Query } from 'appwrite';
import db from '../../appwrite/databases';
import NoProfile from '../NoProfile';
import Loading from '../Loading';
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
const Withdraw = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(null);

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
                    setErrorMessage('Profile not found.');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setErrorMessage('Failed to fetch profile.');
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
        pin: Yup.string()
            .matches(/^\d{6}$/, 'PIN must be exactly 6 digits')
            .required('PIN is required'),
    });

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const user = await account.get();
            const userId = user.$id;

            // Check if the profile is available
            if (!profile) {
                setErrorMessage('User profile not found');
                setSubmitting(false);
                return;
            }
            if (profile.pin != values.pin) {
                return setErrorMessage('invalid pin');
            }
            // Validate if user has enough balance
            const balanceBefore = profile.balance;
            const withdrawAmount = parseFloat(values.withdrawAmount);

            if (withdrawAmount > balanceBefore) {
                setErrorMessage('Insufficient balance for withdrawal.');
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
            setSuccess('WithDraw succfully')
            resetForm();
            setErrorMessage(null);

        } catch (err) {
            console.error('Error during withdrawal:', err);
            setError('Withdrawal failed.');
        } finally {
            setSubmitting(false);
        }
    };
    if (loading) return <div><Loading /></div>

    return (
        <div>

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
            <div className=' absolute top-10 right-10'>

                {
                    success &&
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{success}</div>
                        <Toast.Toggle />
                    </Toast>
                }
                {
                    errorMessage &&
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                        <Toast.Toggle />
                    </Toast>
                }
            </div>
        </div>

    );
};

export default Withdraw;
