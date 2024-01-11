import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { PostProvider } from "./context/PostContext.jsx";

import Navbar from "./components/Navbar.jsx";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PostFormPage from "./pages/PostFormPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Generator from "./pages/CreatePage.jsx";

import ProtectedRoutes from "./ProtectedRoutes.jsx";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/posts" element={<PostPage />} />
                <Route path="/posts/new" element={<PostFormPage />} />
                <Route path="/posts/update/:id" element={<PostFormPage />} />
                <Route path="/generator" element={<Generator />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
