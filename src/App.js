import './css/App.css';
import React from 'react';
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import MyBlogs from './pages/My-blogs';
import Article from './pages/Article';
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './pages/login';
import Register from './pages/register';
import About from './pages/About';
function App() {
  return (
    <Routes>
      <Route  path="/login" exact element={<Login />} />
      <Route  path="/register" exact element={<Register />} />
      <Route  path="/" exact element={<Home />} />
      <Route  path="/articles-search" exact element={<Search />} />
      <Route  path="/article/:id" exact element={<Article />} />
      <Route  path="/my-blogs/:id" exact element={<MyBlogs />} />
      <Route  path="/add-article" exact element={<AddArticle/>} />
      <Route  path="/edit-article/:id" exact element={<EditArticle/>} />
      <Route  path="/Profile/:id" exact element={<Profile/>} />
      <Route  path="/About" exact element={<About/>} />
      <Route  path="/contact-us" exact element={<Contact/>} />
   </Routes>
  );
}

export default App;
