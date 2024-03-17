import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './BookCatalog.css'; // Import CSS for styling

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array to run the effect only once on component mount

  const fetchBooks = () => {
    setLoading(true);
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
        setFilteredBooks(data); // Set filteredBooks initially with all books
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value); // Update search input state
  };

  const handleSearch = () => {
    const keyword = searchInput.trim().toLowerCase();
    if (keyword) {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(keyword) ||
          book.author.toLowerCase().includes(keyword) ||
          book.category.toLowerCase().includes(keyword)
      );
      setFilteredBooks(filtered); // Update filteredBooks state with filtered data
    } else {
      setFilteredBooks(books); // Show all books if search input is empty
    }
  };

  const handleAddToCart = (bookId) => {
    // Find the book in the books array by its ID
    const bookToAdd = books.find((book) => book._id === bookId);
    if (!bookToAdd) {
      console.error('Book not found');
      return;
    }
  
    // Get the existing cart items from local storage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Check if the book is already in the cart
    const existingCartItem = existingCartItems.find((item) => item._id === bookToAdd._id);
    if (existingCartItem) {
      // If the book is already in the cart, increase its quantity
      existingCartItem.quantity += 1;
    } else {
      // If the book is not in the cart, add it with quantity 1
      existingCartItems.push({ ...bookToAdd, quantity: 1 });
    }
  
    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  
    // Show alert with book name and price
    alert(`Book added to cart:\nTitle: ${bookToAdd.title}\nPrice: $${bookToAdd.price}`);
  
    // Log the added book and updated cart items
    console.log(`Book added to cart: ${bookToAdd.title}`);
    console.log('Updated cart items:', existingCartItems);
  };
  
  
  return (
    <div className="books-list-container">
      <h2 className="catalog-heading">Book Catalog</h2>
      <div className="search-container">
        <input type="text" placeholder="Search by title, author, or category" value={searchInput} onChange={handleSearchInputChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="book-table">
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
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>${book.price}</td>
                <td>
                  <button className="add-to-cart-btn" onClick={() => handleAddToCart(book._id)}>
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookCatalog;
