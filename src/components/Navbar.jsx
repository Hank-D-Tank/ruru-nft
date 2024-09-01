import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import BtnVideo from './buttons/BtnVideo';
import { useWallet } from '@solana/wallet-adapter-react';
import { FaWallet } from "react-icons/fa";
import { PiApproximateEqualsBold } from 'react-icons/pi';
import connectBtnBg from '../assets/connect-bg.mp4';
import disconnectBtnBg from '../assets/disconnect-bg.mp4';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const { setVisible } = useWalletModal();
    const { connected, publicKey, disconnect } = useWallet();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [prevConnected, setPrevConnected] = useState(connected);
    const location = useLocation();
    const navigate = useNavigate();

    const handleConnectWallet = () => {
        if (connected) {
            disconnect();
        } else {
            setVisible(true);
        }
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
    }, [location]);

    useEffect(() => {
        if (prevConnected && !connected) {
            toast.info("Your wallet is disconnected!", {
                className: "custom-toast",
                position: "top-right",
                autoClose: 5000,
            });
            if (location.pathname.startsWith('/myNFTs')) {
                navigate('/');
            }
        }
        setPrevConnected(connected);
    }, [connected, prevConnected, location, navigate]);

    const handleMyNFTsClick = () => {
        if (!connected) {
            toast.error("Please connect your wallet to view your NFTs.", {
                className: "custom-toast",
                position: "top-right",
                autoClose: 5000,
            });
        } else {
            navigate(`/myNFTs/${publicKey}`);
        }
    };

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
                    <div className="nav-item" onClick={handleMyNFTsClick}>
                        My NFTs
                    </div>
                    {connected && <div className="nav-item wallet-info">
                        <FaWallet /> <span>{shortenPublicKey(publicKey, 3)}</span>
                    </div>}
                </div>
                <BtnVideo 
                    onClick={handleConnectWallet} 
                    btnBg={connected ? disconnectBtnBg : connectBtnBg} 
                />
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
                        <div onClick={handleMyNFTsClick}>My NFTs</div>
                    </div>
                    {connected && <div className="nav-item wallet-info">
                        <FaWallet /> <span>{shortenPublicKey(publicKey, 5)}</span>
                    </div>}
                </div>
                {connected ? <BtnVideo 
                    onClick={handleConnectWallet} 
                    btnBg={disconnectBtnBg} 
                    style={{width: "fit-content", marginLeft: "10rem", marginTop: "2rem"}} 
                /> : <BtnVideo 
                onClick={handleConnectWallet} 
                btnBg={connectBtnBg} 
                style={{width: "fit-content", marginLeft: "10rem", marginTop: "2rem"}} 
            />}
            </div>
            <ToastContainer />
        </>
    );
};

export default Navbar;
