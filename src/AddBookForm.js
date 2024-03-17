import React, { useState } from 'react';
import './AddBookForm.css'; // Import CSS for styling

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });
  const [error, setError] = useState(null); // State for error message
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
  
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Book added successfully');
        setError(null); // Clear error on success
        setSuccessMessage('Book has been added successfully'); // Set success message
        alert('Book has been added successfully'); // Show alert
  
        // Clear the form after successful submission
        setFormData({
          title: '',
          author: '',
          description: '',
          price: '',
          quantity: '',
          category: '',
        });
  
        // Redirect to admin dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 2000);
      } else {
        if (response.status === 401) {
          setError('Unauthorized. Please log in again.'); // Handle unauthorized error
        } else {
          const data = await response.json();
          setError(data.error || 'Error adding book. Please try again.'); // Set error message
        }
      }
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Error adding book. Please try again.'); // Set error message
    }
  };
  

  return (
    <div className="add-book-container">
      {error && <div className="error-message">{error}</div>} {/* Render error message */}
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Render success message */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
