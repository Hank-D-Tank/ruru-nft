import React, { useEffect, useState, useRef } from 'react'
import NftGrid from '../cards/NftGrid';
import BtnPrimary from '../buttons/BtnPrimary';
import { BsStars } from 'react-icons/bs';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nftRefs = useRef([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response = await fetch('https://ruru-nft-backend.vercel.app/fetchAll'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch NFTs');
                }
                const data = await response.json();
                setNfts(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
    }, []);

    useGSAP(() => {
        if (!loading) {
            gsap.from(".home-feature .section-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.home-feature',
                    start: 'top 80%',
                    end: 'top 20%',
                }
            });

            nftRefs.current.forEach((ref, index) => {
                gsap.from(ref, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ref,
                        start: 'top bottom-=100',
                        end: 'bottom top+=100',
                    }
                });
            });
        }
    }, [loading]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
      
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
    }

    return (
        <>
            <div className={loading ? "loader loader-center" : "loader loader-center d-none"}></div>
            <div className={loading ? "page explore container d-none" : "page explore container"}>
                <div className="row section home-feature">
                    <div className="section-header col-12">
                        <div className="section-heading">
                            ALL NFTs
                        </div>
                    </div>

                    {Object.values(nfts).map((nft, index) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={index} ref={el => nftRefs.current[index] = el}>
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
            </div>
        </>
    )
}

export default Explore;