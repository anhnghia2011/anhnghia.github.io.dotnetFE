import NavHeader from '../components/NavHeader';
import Footer from '../components/Footer';
import Slider from '../components/header-slider'
import Container from '../components/product_home'
import Shop from '../components/shophome'
function HomePage() {
    return (
        <div>
            <NavHeader />
            <Slider />
            <Container />
            <Shop />
            <Footer />
        </div>
    );
}

export default HomePage;