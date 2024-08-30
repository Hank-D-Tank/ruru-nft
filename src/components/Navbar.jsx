import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import BtnVideo from './buttons/BtnVideo';
import { useWallet } from '@solana/wallet-adapter-react';
import { FaWallet } from "react-icons/fa";
import { PiApproximateEqualsBold } from 'react-icons/pi';

const Navbar = () => {
    const { setVisible } = useWalletModal();
    const { connected, publicKey } = useWallet();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleConnectWallet = () => {
        setVisible(true);
    };

    const shortenPublicKey = (key, step) => {
        const keyString = key.toString();
        return `${keyString.slice(0, step)}...${keyString.slice(-step)}`;
    };

    const closeNavbarOnResize = () => {
        if (window.innerWidth > 830 && navbarOpen) {
            setNavbarOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', closeNavbarOnResize);
        return () => {
            window.removeEventListener('resize', closeNavbarOnResize);
        };
    }, [navbarOpen]);

    useEffect(() => {
        if (navbarOpen) {
            setNavbarOpen(false);
        }
    }, [navigate]);

    return (
        <>
            <div className="navbar navbar-pc">
                <div className="logo">Ruru<span>NFT</span>.</div>
                <div className="nav-items">
                    <div className="nav-item">
                        <Link to={"/"}>Home</Link>
                    </div>
                    <div className="nav-item">
                        <Link to={"/explore"}>Explore</Link>
                    </div>
                    <div className="nav-item">
                        <Link to={"/upload-nft"}>Upload NFTs</Link>
                    </div>
                    <div className="nav-item">
                        <Link to={`/myNFTs/${publicKey}`}>My NFTs</Link>
                    </div>
                    {connected && <div className="nav-item wallet-info">
                        <FaWallet /> <span>{shortenPublicKey(publicKey, 3)}</span>
                    </div>}
                </div>
                <BtnVideo onClick={handleConnectWallet} />
            </div>
            <div className="navbar navbar-mobile">
                <div className="logo">Ruru<span>NFT</span>.</div>
                <div className="navbar-collapse" onClick={() => {
                    setNavbarOpen(!navbarOpen);
                }}>
                    <PiApproximateEqualsBold />
                </div>
            </div>
            <div className={!navbarOpen ? "navbar-content closed" : "navbar-content"}>
                <div className="nav-items">
                    <div className="nav-item">
                        <span>Home</span>
                        <Link to={"/"}>Home</Link>
                    </div>
                    <div className="nav-item">
                        <span>Explore</span>
                        <Link to={"/explore"}>Explore</Link>
                    </div>
                    <div className="nav-item">
                        <span>Upload NFTs</span>
                        <Link to={"/upload-nft"}>Upload NFTs</Link>
                    </div>
                    <div className="nav-item">
                        <span>My NFTs</span>
                        <Link to={`/myNFTs/${publicKey}`}>My NFTs</Link>
                    </div>
                    {connected && <div className="nav-item wallet-info">
                        <FaWallet /> <span>{shortenPublicKey(publicKey, 5)}</span>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default Navbar;
