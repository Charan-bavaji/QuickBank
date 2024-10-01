// SignUp.js
import React, { useState } from 'react';
import { account, ID } from '../appwrite/config';
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button } from 'flowbite-react';
import { Checkbox, Label, TextInput } from "flowbite-react";
import Loading from '../components/Loading';
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
const SignUp = ({ login }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            if (!email || !password) {
                return;
            }
            setLoading(true);
            await account.create(ID.unique(), email, password, name);
            // login(email, password); // Auto-login after signup
            await account.createEmailPasswordSession(email, password);
            await account.get();
            setLoading(false)
            return navigate('/dashboard');

        } catch (error) {
            setLoading(false);
            setErrorMessage('Invalid email or password');

        }
    };
    if (loading) {
        return <Loading />;
    }
    return (
        <div className="flex items-center justify-center h-screen relative">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="Email" required value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" type="password" placeholder='Password' required value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <Button className="w-full bg-black" onClick={handleSignUp}>
                        Register
                    </Button>
                    <span className='flex flex-col justify-center items-center py-0'>
                        <p>Already haven an account?</p>
                        <Link className=' font-bold' to={'/login'}>Login</Link>
                    </span>
                </form>
            </Card>
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

export default SignUp;
