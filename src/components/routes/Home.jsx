import React from 'react'
import videoBg from '../../assets/hero-bg.mp4'

const Home = () => {
    return (
        <div className="page home container">
            <div className="row home-hero">
                <div className="col-xl-6 left">
                    <video src={videoBg} muted loop autoPlay></video>
                    <div className="heading">
                        Explore, Create, and Collect Unique <span>NFTs</span>.
                    </div>
                    <p>Explore a diverse collection of digital art, create your own unique NFTs, and connect with a global community of artists and collectors. Start your journey into the world of NFTs today.
                    </p>
                </div>
                <div className="col-xl-6 right"></div>
            </div>
        </div>
    )
}

export default Home