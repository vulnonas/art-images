import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ArtworkPage from './pages/ArtworkPage';

function App() {
  useEffect(() => {
    // Этот код добавляет мета-тег для обхода предупреждения ngrok
    const meta = document.createElement('meta');
    meta.httpEquiv = 'ngrok-skip-browser-warning';
    meta.content = 'true';
    document.head.appendChild(meta);
  }, []);
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="gallery/:id" element={<ArtworkPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;