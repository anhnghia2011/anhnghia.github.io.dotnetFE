import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import AddCart from './components/AddToCartPage';
import AdminPage from './components/AdminPage';
import FavoritesPage from './components/FavoritesPage';
import ProductDetail from './components/ProductDetail';
import { default as BuyPage, default as Profilepage } from './components/profilepage';
import ShopFemale from './container/Femalepage';
import Home from './container/HomePage';
import ShopKid from './container/Kidpage';
import ShopMale from './container/Malepage';
import ShopNew from './container/Newpage';
import ShopSale from './container/Salepage';
import ShopBasketball from './container/ShopBasketball';
import ShopDance from './container/ShopDance';
import ShopGym from './container/ShopGym';
import ShopRun from './container/ShopRun';
import ShopSoccer from './container/ShopSoccer';
import ShopYoga from './container/ShopYoga';

function App() {

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
  };
  
  return (
    <Router>
       <ScrollToTop />
            <Routes>
                <Route path="run-shoe" element={<ShopRun />} /> 
                <Route path="soccer-shoe" element={<ShopSoccer />} />
                <Route path="gym-shoe" element={<ShopGym />} />
                <Route path="yoga-shoe" element={<ShopYoga />} /> 
                <Route path="dance-shoe" element={<ShopDance />} />
                <Route path="basketball-shoe" element={<ShopBasketball />} />
                <Route path="male" element={<ShopMale />} />
                <Route path="female" element={<ShopFemale />} />
                <Route path="kid" element={<ShopKid />} />
                <Route path="new-arrival" element={<ShopNew />} />
                <Route path="sale" element={<ShopSale />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/buy" element={<BuyPage />} />
                <Route path="/add-to-cart" element={<AddCart />} />
                <Route path="/profile" element={<Profilepage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
  );
}

export default App;
