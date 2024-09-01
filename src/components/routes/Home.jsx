import React, { useEffect, useState } from 'react';
import videoBg from '../../assets/hero-bg.mp4';
import BtnMain from '../buttons/BtnMain';
import { HiArrowLongRight } from 'react-icons/hi2';
import BtnPrimary from '../buttons/BtnPrimary';
import { BsStars } from 'react-icons/bs';
import NftGrid from '../cards/NftGrid';
import { IoCloudUploadOutline, IoImageOutline } from 'react-icons/io5';
import { SiHiveBlockchain } from 'react-icons/si';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Home = () => {
    const [nfts, setNfts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    gsap.registerPlugin(ScrollTrigger);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const daySuffix = (day) => {
            if (day > 3 && day < 21) return `${day}th`;
            switch (day % 10) {
                case 1: return `${day}st`;
                case 2: return `${day}nd`;
                case 3: return `${day}rd`;
                default: return `${day}th`;
            }
        };

        return `${daySuffix(day)} ${month}`;
    };

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response = await fetch('https://ruru-nft-backend.vercel.app/fetchAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch NFTs');
                }
                const data = await response.json();
                const sortedNfts = data.data.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
                const oldestNfts = sortedNfts.slice(0, 8);
                setNfts(oldestNfts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
    }, []);

    useGSAP(()=>{
        if(!loading){
            gsap.from(".home-hero .left .heading", {
                y: "50",
                opacity: 0,
                duration: 1,
            });
            gsap.from(".home-feature .section-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 1,
                scrollTrigger: {
                    trigger: '.home-feature',
                    start: 'top 80%',
                    end: 'top 20%',
                }
            });
            gsap.from(".home-hero .right .sub-heading", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.5, 
            });

            gsap.from(".home-hero .right .btn-main", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.7, 
            });
            gsap.from(".home-feature .col-xl-3", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.home-feature .col-xl-3',
                    start: 'top 60%',
                    end: 'bottom 20%',
                }
            });
            gsap.from(".home-how-to .step#step-1", {
                x: -50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.home-how-to',
                    start: 'top 60%',
                    end: 'bottom 80%',
                }
            });
            gsap.from(".home-how-to .step#step-1 .step-icon", {
                x: 20,
                rotate: 360,
                opacity: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: '.home-how-to',
                    start: 'top 60%',
                    end: 'bottom 80%',
                }
            });
            gsap.from(".home-how-to .step#step-2", {
                x: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.home-how-to #step-1',
                    start: 'top 65%',
                    end: 'bottom 80%',
                }
            });
            gsap.from(".home-how-to .step#step-2 .step-icon", {
                x: -20,
                rotate: -360,
                opacity: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: '.home-how-to #step-1',
                    start: 'top 65%',
                    end: 'bottom 80%',
                }
            });
            gsap.from(".home-how-to .step#step-3", {
                x: -50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.home-how-to #step-2',
                    start: 'top 70%',
                    end: 'bottom 80%',
                }
            });
            gsap.from(".home-how-to .step#step-3 .step-icon", {
                x: 20,
                rotate: 360,
                opacity: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: '.home-how-to #step-2',
                    start: 'top 70%',
                    end: 'bottom 80%',
                }
            });
        }
    }, [loading])

    return (
        <>
            <div className={(!nfts && loading) ? "loader loader-center" : "loader loader-center d-none"}></div>
            <div className={(!nfts && loading) ? "page home container d-none" : "page home container"}>
                <div className="row home-hero">
                    <div className="col-xl-6 left">
                        <video src={videoBg} muted loop autoPlay></video>
                        <div className="heading">
                            Explore, Create, and Mint Unique <span>NFTs</span>.
                        </div>
                        <p>
                            Explore a diverse collection of digital art, create your own unique NFTs, and connect with a global community of artists and collectors. Start your journey into the world of NFTs today.
                        </p>
                    </div>
                    <div className="col-xl-6 right">
                        <div className="sub-heading">Join the community of creators and collectors by exploring the latest in digital art.</div>
                        <BtnMain to='/explore'>Explore NFTs <HiArrowLongRight /> </BtnMain>
                    </div>
                </div>
                <div className="row section home-feature">
                    <div className="section-header col-12">
                        <div className="section-heading">
                            Our Cool NFTs
                        </div>

                        <BtnPrimary to={"/explore"}>See All <BsStars /> </BtnPrimary>
                    </div>

                    {nfts && Object.values(nfts).map((nft, index) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
                            <NftGrid
                                nftPath={nft.image}
                                nftName={nft.title}
                                nftOwner={nft.author}
                                nftUploadTime={formatDate(nft.$createdAt)}
                                nftPrice={nft.price + " SOL"}
                                nft={nft}
                            />
                        </div>
                    ))}
                </div>
                <div className="row section home-how-to">
                    <div className="section-header col-12">
                        <div className="section-heading">
                            How It Works
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 step" id="step-1">
                        <div className="step-icon">1</div>
                        <div className="step-title">Unleash Your <span>Creativity</span> <IoImageOutline /></div>
                        <p>Upload your masterpiece and set the stage for its digital transformation. Customize the details, and prepare your art for its NFT journey.</p>
                    </div>
                    <div className="col-lg-5"></div>
                    <div className="col-lg-5"></div>
                    <div className="col-lg-7 col-md-6 step" id="step-2">
                        <div className="step-icon">2</div>
                        <div className="step-title">Mint Your <span>Masterpiece</span> <SiHiveBlockchain /></div>
                        <p>Transform your uploaded artwork into a unique, blockchain-secured NFT, solidifying your ownership and ensuring its exclusivity.</p>
                    </div>
                    <div className="col-lg-7 col-md-6 step" id="step-3">
                        <div className="step-icon">3</div>
                        <div className="step-title">Explore & <span>Showcase</span> <GiMagnifyingGlass /></div>
                        <p>Discover a world of digital art. Display your NFTs, explore creations by other artists, and build your unique collection on our platform.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
