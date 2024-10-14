import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './container/HomePage';
import ShopMale from './container/Malepage';
import ShopBasketball from './container/ShopBasketball';
import ShopDance from './container/ShopDance';
import ShopGym from './container/ShopGym';
import ShopRun from './container/ShopRun';
import ShopSoccer from './container/ShopSoccer';
import ShopYoga from './container/ShopYoga';


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
                <Route path="male-page" element={<ShopMale />} />
            </Routes>
        </Router>
  );
}

export default App;
