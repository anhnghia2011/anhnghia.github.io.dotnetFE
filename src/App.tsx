import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './container/HomePage';
import ShopMale from './container/Malepage';
import ShopBasketball from './container/ShopBasketball';
import ShopDance from './container/ShopDance';
import ShopGym from './container/ShopGym';
import ShopRun from './container/ShopRun';
import ShopSoccer from './container/ShopSoccer';
import ShopYoga from './container/ShopYoga';
import ProductDetail from './components/ProductDetail';
import FavoritesPage from './components/FavoritesPage';
import BuyPage from './components/BuyPage';
import AddCart from './components/AddToCartPage';
import ShopFemale from './container/Femalepage';
import ShopKid from './container/Kidpage';
import ShopNew from './container/Newpage';
import ShopSale from './container/Salepage';


function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
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
            </Routes>
        </Router>
  );
}

export default App;
