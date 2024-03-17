import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import api from './api';
import './BookList.css'; // Import CSS for styling

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    setLoading(true);
    fetchBooks();
  }, []); // Empty dependency array to run the effect only once on component mount

  const fetchBooks = () => {
    fetch('http://localhost:5000/api/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch books');
      })
      .then((data) => {
        setBooks(data); // Set books state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditClick = (bookId) => {
    navigate(`/edit-book/${bookId}`); // Redirect to edit page with bookId using useNavigate
  };

  const handleDeleteClick = (bookId) => {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
  
    if (!token) {
      console.error('Error: User not logged in');
      // Display error message or redirect to login page
      return;
    }
  
    api
      .delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log('Book deleted successfully');
          // Remove the deleted book from the state
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
        } else {
          throw new Error('Failed to delete book');
        }
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  };
  
  

  return (
    <div className="books-list">
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>${book.price}</td>
                <td>
                  <button onClick={() => handleEditClick(book._id)}>Edit</button>
                  <button onClick={() => handleDeleteClick(book._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksList;
