import React from 'react'
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';

const Maintenance = () => {
  return (
    <>
        <div className="bg-gradient">
            <div className="container mx-auto">
                <section className="flex flex-wrap lg:flex-nowrap justify-center h-screen relative">
                    <div className="my-auto font-poppins text-gray-200 text-center lg:text-left">
                        <h1 className="font-medium text-5xl py-3">The section is in <br/> maintenace mode</h1>
                        <p className="lg:w-5/6">we have done all the technical improvements and will back very soon. Thank you for your patience!</p>

                        <div className="bg-gray-50 p-3 px-5 sm:w-96 rounded-md my-8 mx-auto lg:mx-0 flex">
                            <input type="text" className="border-0 flex-grow" placeholder="Your email Address"/>
                            <button className="text-gray-500 hover:text-red-400">Notify Me</button>
                        </div>
                    </div>

                    <div className="my-auto text-center w-3/4 lg:w-2/5">
                        <img className="rounded-full image1 animate-moveY" src={img1} alt="image1"/>
                        <img className="image2 animate-rotateZ" src={img2} alt="image2"/>
                        <img className="image3 animate-rotateZ" src={img3} alt="image3"/>
                    </div>
            
                </section>


            </div>
        </div>
    </>
  )
}

export default Maintenance