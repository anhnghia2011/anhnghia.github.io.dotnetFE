import Home from './container/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopRun from './container/ShopRun';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="run-shoe" element={<ShopRun />} /> 
            </Routes>
        </Router>
  );
}

export default App;
