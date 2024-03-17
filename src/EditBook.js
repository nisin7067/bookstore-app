import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';
import './EditBook.css'; // Import CSS for styling

const EditBook = () => {
  const { bookId } = useParams(); // Get the bookId from URL params
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchBookData();
  }, [bookId]); // Fetch book data when the bookId changes

  const fetchBookData = () => {
    api
      .get(`http://localhost:5000/api/books/${bookId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch book data');
        }
      })
      .then((data) => {
        setBook({
          title: data.title || "",
          author: data.author || '',
          description: data.description || '',
          price: data.price || '',
          quantity: data.quantity || '',
          category: data.category || '',
        }); // Set book state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage

    if (!token) {
      console.error('Error: User not logged in');
      setErrorMessage('User not logged in');
      setSuccessMessage('');
      return;
    }

    api
      .put(`http://localhost:5000/api/books/${bookId}`, book, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log('Book updated successfully');
          setSuccessMessage('Book updated successfully');
          setErrorMessage('');
        } else {
          throw new Error('Failed to update book');
        }
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        setErrorMessage('Failed to update book');
        setSuccessMessage('');
      });
  };

  if (loading) return <p>Loading book data...</p>;

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={book.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={book.category}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
