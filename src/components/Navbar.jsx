import React from 'react'
import { Link } from 'react-router-dom'
import BtnVideo from './buttons/BtnVideo'

const Navbar = () => {
    return (
        <>
            <div className="navbar navbar-pc">
                <div className="logo">Ruru<span>NFT</span>.</div>
                <div className="nav-items">
                    <div className="nav-item">
                        <Link to={"/"}>Home</Link>
                    </div>
                    <div className="nav-item">
                        <Link to={"/"}>Explore</Link>
                    </div>
                    <div className="nav-item">
                        <Link to={"/"}>Upload NFTs</Link>
                    </div>
                    <div className="nav-item">
                        <Link to={"/"}>My NFTs</Link>
                    </div>
                </div>
                <BtnVideo></BtnVideo>
            </div>
        </>
    )
}

export default Navbar