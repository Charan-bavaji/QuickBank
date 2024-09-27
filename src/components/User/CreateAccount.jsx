import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import db from '../../appwrite/databases';
import { useEffect } from 'react';
import { account } from '../../appwrite/config';
import { ProfileContext } from './Profile';

const CreateAccount = () => {

  const { setProfile } = useContext(ProfileContext);


  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // Initial values for the form
  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    bankAcountType: '',
    age: '',
    address: '',
    dob: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    bankAcountType: Yup.string().required('Bank account type is required'),
    age: Yup.number().required('Age is required').min(18, 'You must be at least 18 years old'),
    address: Yup.string().required('Address is required'),
    dob: Yup.date().required('Date of birth is required'),
  });

  useEffect(() => {
    return async () => {
      const response = await account.get();
      setUser(response);
    }
  }, [])

  // Function to handle form submission
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Generate a unique account number (for demonstration)
      const accountNumber = 'ACC' + Math.floor(1000000000 + Math.random() * 9000000000);
      console.log(user.$id);
      // Prepare the profile data
      const profileData = {
        ...values,
        accountNumber,
        balance: 0.00,
        id: user.$id
      };
      console.log('Profile created successfully:', profileData);
      // Creating a account in DB
      await db.profiles.create(profileData);
      setProfile(true);
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" md:w-[32rem] mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Create Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 flex flex-col">
            <section className='flex justify-between'>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Field type="text" id="name" name="name" placeholder="Name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">lastName</label>
                <Field type="text" id="lastName" name="lastName" placeholder="lastName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </section>
            <section className='flex justify-between'>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field type="email" id="email" name="email" placeholder="Email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <Field type="text" id="phoneNumber" name="phoneNumber" placeholder="Number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

            </section>
            <section className='flex justify-between'>
              <div>
                <label htmlFor="bankAcountType" className="block text-sm font-medium text-gray-700">Account Type</label>
                <Field as="select" id="bankAcountType" name="bankAcountType" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </Field>
                <ErrorMessage name="bankAcountType" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <Field type="number" id="age" name="age" placeholder="Age" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
              </div>

            </section>
            <section className='flex justify-between'>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Field type="text" id="address" name="address" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Field type="date" id="dob" name="dob" placeholder="Address" className="mt-1 block w-full py-2 px-8 border border-gray-300 rounded-md" />
                <ErrorMessage name="dob" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </section>

            <div>
              <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAccount;
