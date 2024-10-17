import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import Sale from '../components/shopsale';

function ShopRun() {
    return (
        <div className='shop'>
            <NavHeader />
            <Sale />
            <Footer />
        </div>
    );
}

export default ShopRun;