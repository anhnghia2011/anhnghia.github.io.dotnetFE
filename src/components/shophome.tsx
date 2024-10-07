function Shophome() {

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto'>
                <h1 className='text-start text-2xl font-bold my-5 pl-5'>Shop</h1>

                <div className='overflow-x-scroll whitespace-nowrap mt-5'>
                    {/* Category 1: Running */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/a3c971bc-bc0a-4c0c-8bdf-e807a3027e53/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Running
                        </button>
                    </div>

                    {/* Category 2: Soccer */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/e4695209-3f23-4a05-a9f9-d0edde31b653/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Soccer
                        </button>
                    </div>

                    {/* Category 3: Basketball */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/38ed4b8e-9cfc-4e66-9ddd-02a52314eed9/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Basketball
                        </button>
                    </div>

                    {/* Category 4: Gym */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/e36a4a2b-4d3f-4d1c-bc75-d6057b7cec87/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Gym
                        </button>
                    </div>

                    {/* Category 5: Dance */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/c779e4f6-7d91-46c3-9282-39155e0819e5/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Dance
                        </button>
                    </div>

                    {/* Category 6: Yoga */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/6be55ac6-0243-42d6-87d0-a650074c658c/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Yoga
                        </button>
                    </div>
                </div>
                </div>
            </div>
    );
}

export default Shophome;
