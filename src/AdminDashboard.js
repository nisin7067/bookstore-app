import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddBookForm from './AddBookForm'; // Import AddBookForm component
import BookList from './BookList'; // Import BookList component
import api from './api';

const AdminDashboard = () => {
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBookList, setShowBookList] = useState(false); // State for showing book list
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await api.get('/books', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBooks(data); // Set books state with fetched data
        } else {
          throw new Error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleAddBookClick = () => {
    setShowAddBookForm(true);
  };

  const handleShowBookListClick = () => {
    setShowBookList(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear token from localStorage
    navigate('/'); // Redirect to home page using useNavigate
  };

  return (
    <div className="admin-dashboard">
      {!showAddBookForm && (
        <>
          <h2>Welcome to Admin Dashboard</h2>
          <p>You are logged in as an admin.</p>
          {/* Logout button */}
          <button onClick={handleLogout} style={{ color: 'red' }}>
            Logout
          </button>
          <button onClick={handleAddBookClick}>Add Book</button>
          {/* Button to show book list */}
          <button onClick={handleShowBookListClick}>Show All Books</button>
          {/* Display fetched books */}
          {loading ? (
            <p>Loading books...</p>
          ) : showBookList ? (
            <BookList books={books} />
          ) : null}
        </>
      )}
      {showAddBookForm && <AddBookForm />} {/* Show AddBookForm when showAddBookForm is true */}
    </div>
  );
};

export default AdminDashboard;
