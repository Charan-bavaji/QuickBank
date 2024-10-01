import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './components/User/UserDashbord';
import AdminDashboard from './components/Admin/AdminDashboard';  // Admin dashboard
import { account } from './appwrite/config'; // Use account from Appwrite
import CreateAccount from './components/User/CreateAccount';
import Deposit from './components/User/Deposit';
import Transfer from './components/User/Transfer';
import Profile from './components/User/Profile';
import Withdraw from './components/User/Withdraw';
import UserTransactions from './components/User/UserTransactions';
import SignUp from './pages/SignUp';
import RecentTransaction from "./components/Admin/RecentTransaction"
import AllUsers from './components/Admin/AllUsers';
import Home from './pages/Home';


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState('user');  // Default to 'user'
  const [loading, setLoading] = useState(true);

  // Check if a session exists on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get(); // Get user session
        setLoggedInUser(user);
        // Check if the user has a label that marks them as admin
        // Assuming user.labels is where Appwrite stores the labels. Adjust if necessary.
        // const isAdmin = user.labels?.includes('admin');
        // console.log(isAdmin);
        // setUserRole(isAdmin ? 'admin' : 'user');
      } catch (error) {
        setLoggedInUser(null); // If no session, set to null
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    checkSession();
  }, []);

  // Show loading spinner while checking session
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path="/"
          element={
            loggedInUser ?
              (
                //   userRole === 'admin' ? (
                //     <Navigate to="/admin-dashboard" />
                //   ) :
                (
                  <Navigate to="/dashboard" />
                )
              ) : (
                <Navigate to="/login" />
              )
          }
        />

        <Route
          path="/login"
          element={
            loggedInUser ?
              (
                // userRole === 'admin' ? (
                //   <Navigate to="/admin-dashboard" />
                // ) : 
                (
                  <Navigate to="/dashboard" />
                )
              ) : (
                <Login setLoggedInUser={setLoggedInUser} />
              )
          }
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            loggedInUser
              // && userRole === 'user'
              ? (
                <UserDashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                // <Profile />
              ) : (
                <Navigate to="/login" />
              )
          }
        >
          <Route path='/dashboard' element={<Profile />} />
          <Route path='/dashboard/deposit' element={<Deposit />} />
          <Route path='/dashboard/transfer' element={<Transfer />} />
          <Route path='/dashboard/withdraw' element={<Withdraw />} />
          <Route path='/dashboard/transactions' element={<UserTransactions />} />
        </Route>

        <Route
          path="/admin-dashboard"
          element={
            loggedInUser
              //  && userRole === 'admin'
              ?
              (
                <AdminDashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
              ) : (
                <Navigate to="/login" />
              )
          }
        >
          <Route path='/admin-dashboard/' element={<AllUsers/>} />
          <Route path='/admin-dashboard/alltransactions' element={<RecentTransaction />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;