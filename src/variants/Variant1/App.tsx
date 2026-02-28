import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import NewsletterSection from './components/NewsletterSection';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Authors from './pages/Authors';
import AuthorPage from './pages/AuthorPage';
import Magazine from './pages/Magazine';
import Ecosystem from './pages/Ecosystem';
import ArticlePage from './pages/ArticlePage';
import LegalPage from './pages/LegalPage';

export default function Variant1App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/statji"        element={<Articles />} />
          <Route path="/article/:id"   element={<ArticlePage />} />
          <Route path="/avtory"        element={<Authors />} />
          <Route path="/author/:id"    element={<AuthorPage />} />
          <Route path="/zhurnal"       element={<Magazine />} />
          <Route path="/ekosistema"    element={<Ecosystem />} />
          <Route path="/legal/:slug"   element={<LegalPage />} />
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <NewsletterSection />
      <Footer />
      <CookieBanner />
    </div>
  );
}
