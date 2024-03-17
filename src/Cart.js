// // Cart.js

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Cart.css'; // Import CSS for styling

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]); // State to store cart items

//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(storedCartItems);
//   }, []); // Empty dependency array to run the effect only once on component mount

//   const handleRemoveItem = (itemId) => {
//     const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
//     setCartItems(updatedCartItems);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//   };

//   const handleDecreaseQuantity = (itemId) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
//     );
//     setCartItems(updatedCartItems);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//   };

//   const handleIncreaseQuantity = (itemId) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updatedCartItems);
//     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//   };

//   const handleCheckout = () => {
//     localStorage.removeItem('cartItems');
//     setCartItems([]);
//     alert('Book order has been placed!'); // Show checkout message
//   };

//   return (
//     <div className="cart-container">
//       <h2 className="cart-heading">Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Quantity</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.title}</td>
//                   <td>{item.quantity}</td>
//                   <td className="cart-actions">
//                     <button onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity === 1}>
//                       -
//                     </button>
//                     <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
//                     <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="checkout-btn" onClick={handleCheckout}>
//             Checkout
//           </button>
//         </>
//       )}
//       <Link to="/books">Back to Books</Link>
//     </div>
//   );
// };

// export default Cart;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css'; // Import CSS for styling

const Cart = ({ isAuthenticated }) => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/user-login'); // Redirect to login page if not authenticated
    } else {
      localStorage.removeItem('cartItems');
      setCartItems([]);
      alert('Book order has been placed!'); // Show checkout message
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td className="cart-actions">
                    <button onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity === 1}>
                      -
                    </button>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
      <Link to="/books">Back to Books</Link>
    </div>
  );
};

export default Cart;
