import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Shophome() {
    const navigate = useNavigate();

    const handleClickRun = () => {
        navigate(`/run-shoe`);
    };
    const handleClickSoccer = () => {
        navigate(`/soccer-shoe`);
    };
    const handleClickBasketball = () => {
        navigate(`/basketball-shoe`);
    };
    const handleClickGym = () => {
        navigate(`/gym-shoe`);
    };
    const handleClickDance = () => {
        navigate(`/dance-shoe`);
    };
    const handleClickYoga = () => {
        navigate(`/yoga-shoe`);
    };

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto'>
                <h1 className='text-start text-2xl text-4xl font-bold my-5 pl-5'>Shop</h1>
                <div style={{ height: 380 }}>
                <Slider {...settings}>
                    <div className='inline-block relative mx-3'>
                        <div
                            className='h-[300px] w-full'
                            style={{
                                backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/a3c971bc-bc0a-4c0c-8bdf-e807a3027e53/nike-just-do-it.jpg")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <button 
                                className='absolute left-3 bottom-3 px-2 py-1 rounded-2xl text-black bg-white transition-all duration-300' onClick={handleClickRun}>
                                Running
                            </button>
                        </div>
                    </div>

                    {/* Category 2: Soccer */}
                    <div className='inline-block relative mx-3'>
                        <div
                            className='h-[300px] w-full'
                            style={{
                                backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/e4695209-3f23-4a05-a9f9-d0edde31b653/nike-just-do-it.jpg")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <button 
                                className='absolute left-3 bottom-3 px-2 py-1 rounded-2xl text-black bg-white transition-all duration-300' 
                                onClick={handleClickSoccer}>
                                Soccer
                            </button>
                        </div>
                    </div>

                    {/* Category 3: Basketball */}
                    <div className='inline-block relative mx-3'>
                        <div
                            className='h-[300px] w-full'
                            style={{
                                backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/38ed4b8e-9cfc-4e66-9ddd-02a52314eed9/nike-just-do-it.jpg")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <button 
                                className='absolute left-3 bottom-3 px-2 py-1 rounded-2xl text-black bg-white transition-all duration-300'
                                onClick={handleClickBasketball}>
                                Basketball
                            </button>
                        </div>
                    </div>

                    {/* Category 4: Gym */}
                    <div className='inline-block relative mx-3'>
                        <div
                            className='h-[300px] w-full'
                            style={{
                                backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/e36a4a2b-4d3f-4d1c-bc75-d6057b7cec87/nike-just-do-it.jpg")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <button 
                                className='absolute left-3 bottom-3 px-2 py-1 rounded-2xl text-black bg-white transition-all duration-300'
                                onClick={handleClickGym}>
                                Gym
                            </button>
                        </div>
                    </div>

                    {/* Category 5: Dance */}
                    <div className='inline-block relative mx-3'>
                        <div
                            className='h-[300px] w-full'
                            style={{
                                backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/c779e4f6-7d91-46c3-9282-39155e0819e5/nike-just-do-it.jpg")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <button 
                                className='absolute left-3 bottom-3 px-2 py-1 rounded-2xl text-black bg-white transition-all duration-300'
                                onClick={handleClickDance}>
                                Dance
                            </button>
                        </div>
                    </div>

                    {/* Category 6: Yoga */}
                    <div className='inline-block relative mx-3'>
                        <div
                            className='h-[300px] w-full'
                            style={{
                                backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/6be55ac6-0243-42d6-87d0-a650074c658c/nike-just-do-it.jpg")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <button 
                                className='absolute left-3 bottom-3 px-2 py-1 rounded-2xl text-black bg-white transition-all duration-300'
                                onClick={handleClickYoga}>
                                Yoga
                            </button>
                        </div>
                    </div>
                </Slider>
               </div>
            </div>
        </div>
    );
}

export default Shophome;
