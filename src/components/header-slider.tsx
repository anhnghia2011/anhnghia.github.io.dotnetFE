import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import s6 from "../assets/slide6.jpg";
import "../style.css";

function HeaderSlider() {
    const navigate = useNavigate();
    const sliderRef = useRef<Slider>(null);
 
    const handleRunshop = () => {
        navigate('/run-shoe');
    }
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 200
    };

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className='w-full'>
            <div className="flex flex-col items-center justify-center w-full pt-5 gap-2">
                <p className="font-normal font-sans">Nike Running</p>
                <h1 className="font-bold text-6xl">WINNING ISN’T COMFORTABLE</h1>
                <p className="font-normal font-sans">If you don't hate running a little, you don't love running enough.</p>
                <button className="rounded-xl px-3 py-1 bg-black text-white" onClick={handleRunshop}>Shop Running</button>
            </div>

            <div>
                <div className='flex justify-between px-5'>
                    <p className='w-1440 text-4xl font-bold'>Featured</p>
                    <div className='flex gap-4'>
                        <div className='p-3 rounded-full border border-gray-300 hover:border-blue-300 text-lg cursor-pointer' onClick={handlePrev} >
                            <NavigateBeforeIcon className='text-5xl rounded-full p-1  transition-all'/>
                        </div>
                        <div className='p-3 rounded-full text-lg cursor-pointer border border-gray-300 hover:border-blue-300' onClick={handleNext} >
                            <NavigateNextIcon className='text-5xl rounded-full p-1  transition-all'/> 
                        </div>
                    </div>
                </div>

                <div>
                    <Slider {...settings} ref={sliderRef}>
                        <div>
                            <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_684,c_limit/da3669dd-d2da-4204-b072-d15c287d8596/nike-just-do-it.png" alt="slide1" className="w-full" />
                        </div>
                        <div>
                            <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_684,c_limit/e737592e-5a3f-4cb1-ad76-360664732c7b/image.png" alt="slide2" className="w-full" />
                        </div>
                        <div>
                            <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_684,c_limit/23433977-997a-44f7-9311-4453849893b1/nike-just-do-it.png" alt="slide3" className="w-full" />
                        </div>
                        <div>
                            <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_684,c_limit/f5becc83-2877-49fd-97e0-319c4878230d/nike-just-do-it.png" alt="slide4" className="w-full" />
                        </div>
                        <div>
                            <img src={s6} alt="slide5" className="w-full" />
                        </div>
                    </Slider>
                </div>
                </div>
        </div>
    );
}

export default HeaderSlider;
