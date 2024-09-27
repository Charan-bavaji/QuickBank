import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { account, databases } from '../../appwrite/config';
import db from '../../appwrite/databases';
import { Query } from 'appwrite';
import NoProfile from '../NoProfile';
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
const Deposit = () => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [profileDocument, setProfileDocument] = useState([]);
    // Initial form values
    const initialValues = {
        depositAmount: '',
        description: '',
    };

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        depositAmount: Yup.number()
            .min(1, 'Deposit amount must be at least 1')
            .required('Deposit amount is required'),
        description: Yup.string()
            .required('Description is required'),
    });
    // Form submission handler
    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        const depositAmount = values.depositAmount;
        try {
            const user = await account.get();
            const userId = user.$id;
            const profileResponse = await databases.listDocuments(
                '66e4443f003bfa937d45',              // Your database ID
                '66e58919001f63dd5d2f',              // Your profile collection ID
                [Query.equal('id', userId)]       // Query to find the document by userId
            );

            // Step 2: Ensure a document is found
            if (profileResponse.documents.length === 0) {
                throw new Error('Create Your profile');
            }
            const profile1 = profileResponse.documents[0]
            setProfileDocument(profile1); // Assuming there's only one profile per user
            const profileDocumentId = profileDocument.$id;         // Get the document ID
            if (!profileDocument) {
                return setErrorMessage("Create your profile");
            }
            // Prepare the transaction data for deposit
            const transactionData = {
                userId,
                type: 'deposit',
                amount: values.depositAmount,
                description: values.description,
                status: "successfull",
                date: new Date().toISOString(),
            };

            // Add the deposit transaction to the transactions collection
            const response = await db.transactions.create(transactionData);
            console.log('Deposit successful:', transactionData);
            //   updating user ballance

            // Step 3: Update the balance in the profile document
            await databases.updateDocument(
                '66e4443f003bfa937d45',                // Your database ID
                '66e58919001f63dd5d2f',                // Your profile collection ID
                profileDocumentId,                     // The document ID of the user's profile
                { balance: depositAmount }             // Field to update (e.g., updating the balance)
            );
            resetForm();

        } catch (err) {
            setErrorMessage(err.message);
            console.log(err)
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className=" relative max-w-md mx-auto mt-10 p-6  rounded-lg shadow-md backdrop-blur-sm bg-white/10">
                <h1 className="text-2xl font-semibold mb-4">Deposit Funds</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">

                            <div>
                                <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700">Deposit Amount</label>
                                <Field
                                    type="number"
                                    id="depositAmount"
                                    name="depositAmount"
                                    className="mt-1 block w-full p-2 border border-gray-700 rounded-md  bg-inherit"
                                />
                                <ErrorMessage name="depositAmount" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <Field
                                    type="textarea"
                                    id="description"
                                    name="description"
                                    className="mt-1 block w-full bg-inherit p-2 border border-gray-700 rounded-md"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Deposit'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className=' absolute top-10 right-10'>
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

export default Deposit;
