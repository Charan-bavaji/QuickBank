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
    lastName: '',
    email: '',
    phoneNumber: '',
    bankAcountType: '',
    age: '',
    address: '',
    dob: '',
    pin: ''
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('lastName is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    bankAcountType: Yup.string().required('Bank account type is required'),
    age: Yup.number().required('Age is required').min(18, 'You must be at least 18 years old'),
    pin: Yup.string()
      .matches(/^\d{6}$/, 'PIN must be exactly 6 digits')
      .required('PIN is required'),
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
      console.log(user.$id, values);
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
    <div className=" md:w-[32rem] mx-auto  p-6  rounded-lg shadow-md bg-[#202127] ">
      <h1 className="text-2xl font-semibold text-center mb-4">Create Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 flex flex-col text-white">
            <section className='flex justify-between gap-2'>
              <div>
                <label htmlFor="name" className="block text-sm font-medium ">Name</label>
                <Field type="text" id="name" name="name" placeholder="Name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium ">lastName</label>
                <Field type="text" id="lastName" name="lastName" placeholder="lastName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </section>
            <section className='flex justify-between gap-2'>
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">Email</label>
                <Field type="email" id="email" name="email" placeholder="Email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium ">Phone Number</label>
                <Field type="text" id="phoneNumber" name="phoneNumber" placeholder="Number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

            </section>
            <section className='flex justify-between '>
              <div>
                <label htmlFor="bankAcountType" className="block text-sm font-medium ">Account Type</label>
                <Field as="select" id="bankAcountType" name="bankAcountType" className="text-gray-500 mt-1 block w-full p-2 border border-gray-300 rounded-md ">
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </Field>
                <ErrorMessage name="bankAcountType" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium ">Age</label>
                <Field type="number" id="age" name="age" placeholder="Age" className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
              </div>

            </section>
            <section className='flex justify-between'>
              <div>
                <label htmlFor="address" className="block text-sm font-medium ">Address</label>
                <Field type="text" id="address" name="address" placeholder="Address" className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium ">Date of Birth</label>
                <Field type="date" id="dob" name="dob" placeholder="Address" className="mt-1 block w-full py-2 px-8 border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="dob" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </section>
            <section className='flex justify-center'>
              <div>
                <label htmlFor="pin" className="block text-sm font-medium ">Set a Pin</label>
                <Field type="text" id="pin" name="pin" placeholder="Set a Pin" className="mt-1 block w-full py-2  border border-gray-300 rounded-md text-gray-500" />
                <ErrorMessage name="pin is required" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </section>
            <div>
              <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#131111]" disabled={isSubmitting}>
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
