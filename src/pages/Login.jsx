import React, { useState, useEffect } from 'react';
import { account } from '../appwrite/config';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import Loading from '../components/Loading';
const Login = ({ setLoggedInUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const user = await account.get(); // Check if user session exists
                setLoggedInUser(user); // Set the logged-in user if session exists
                // Navigate based on user label (admin or user)
                const isAdmin = user.labels?.includes('admin');
                console.log(isAdmin);
                navigate(isAdmin ? '/admin-dashboard' : '/dashboard');
            } catch (error) {
                setLoggedInUser(null); // If no session, set to null
            } finally {
                setLoading(false); // Stop loading
            }
        };
        checkSession();
    }, [navigate, setLoggedInUser]);

    const handleLogin = async () => {
        if (!email || !password) {
            return;
        }
        try {
            await account.createEmailPasswordSession(email, password); // Log in
            const user = await account.get(); // Get the user after login
            setLoggedInUser(user); // Set logged-in user

            // Navigate based on user label (admin or user)
            const isAdmin = user.labels?.includes('admin');
            navigate(isAdmin ? '/admin-dashboard' : '/dashboard');
        } catch (error) {
            setErrorMessage('Invalid email or password');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full'>
            <div className=' relative w-full h-[100vh] flex flex-col justify-center items-center'>

                <Card className="w-[25rem]">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
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

                        <Button onClick={handleLogin} type="submit" className='bg-black '>Submit</Button>

                        <span className='flex flex-col justify-center items-center py-0'>
                            <p>or</p>
                            <Link className=' font-bold' to={'/signup'}>Register</Link>
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
                {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
            </div>
        </div>
    );
};

export default Login;
