import Home from './container/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopRun from './container/ShopRun';
import ShopSoccer from './container/ShopSoccer';
import ShopGym from './container/ShopGym';
import ShopYoga from './container/ShopYoga';
import ShopDance from './container/ShopDance';
import ShopBasketball from './container/ShopBasketball';


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
            </Routes>
        </Router>
  );
}

export default App;
