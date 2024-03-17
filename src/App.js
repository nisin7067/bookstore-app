// import logo from './logo.svg';
import AddBookForm from './AddBookForm';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import './App.css';
import BookCatalog from './BookCatalog';
// import BookList from './BookList';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
         <Header/>
    
      <Router>
      {/* <BookCatalog/> */}
        <Routes>
          {/* <Route path='/admin/dashboard' element={<AdminDashboard/>} /> */}
          {/* <Route path="/" element={<BookCatalog />} /> */}
        </Routes>
      </Router>
   
     
      {/* <AddBookForm/> */}
    </div>
  );
}

export default App;
