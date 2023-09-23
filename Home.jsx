import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import 'font-awesome/css/font-awesome.min.css';
import { auth } from '../firebase'; // Import Firebase authentication functions

const Home = () => {
  const [user, setUser] = useState(null); // Initialize user state
  const navigate = useNavigate();

  // Use useEffect to listen for changes in the user's authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated
        setUser(user);
      } else {
        // User is not authenticated
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>Dev@Deakin</h1>
        </div>
        <div className="header-middle">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="header-right">
          {user ? (
            <>
              <button onClick={handleLogout} className="header-button">
                Logout
              </button>
              <Link to="/post" className="header-button" style={{ textDecoration: "none" }}>
                Post
              </Link>
            </>
          ) : (
            <Link to="/login" className="header-button" style={{ textDecoration: "none" }}>
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Conditionally render content based on authentication status */}
        {user ? (
          <p>Welcome, {user.displayName}!</p>
          /* Add authenticated user content here */
        ) : (
          <p>Please login to access the content.</p>
          /* Add content for non-authenticated users here */
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        {/* Add your footer content here */}
      </footer>
    </div>
  );
};

export default Home;
