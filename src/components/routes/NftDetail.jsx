import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { IoBagHandleSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const NftDetail = () => {
    const { id } = useParams();
    const [nft, setNft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { publicKey, signTransaction } = useWallet();
    const wallet = useWallet();
    const { connection } = useConnection();

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

        return `${daySuffix(day)} ${month}, ${year}`;
    };

    useGSAP(()=>{
        if(!loading){
            gsap.from(".nft-details-bg .nft-image img", {
                x: -50,
                opacity: 0,
                duration: 1
            })
            gsap.from(".nft-info h2, .nft-info .creator", {
                x: 50,
                opacity: 0,
                stagger: 0.5,
                ease: 'power1.in'
            })
            gsap.from("p, button, .date", {
                y: 10,
                opacity: 0,
                stagger: 0.5,
                ease: 'power1.in'
            })
        }
    }, [loading])

    /* const handleBuy = async (nft) => {
        // Your existing handleBuy code
    }; */

    const handleBuy = (nft) => {
        console.log(nft)
        window.open(`https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`, '_blank');
    }

    useEffect(() => {
        const fetchNftDetails = async () => {
            try {
                const response = await fetch('https://ruru-nft-backend.vercel.app/fetchSingle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch NFT details');
                }

                const data = await response.json();
                setNft(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNftDetails();
    }, [id]);

    return (
        <>
            <div className={loading ? "loader loader-center" : "loader loader-center d-none"}></div>
            <div className={loading ? "page nft-details container d-none" : "page nft-details container"}>
                {error && <p>Error: {error}</p>}
                {!loading && nft && (
                    <div className="nft-details-bg row" style={{ background: `url(${nft.image}) no-repeat` }}>
                        <div className="col-lg-6 nft-image">
                            <img src={`${nft.image}`} alt={nft.title} />
                        </div>
                        <div className="col-lg-6 nft-info">
                            <h2>{nft.title}</h2>
                            <div className="creator">
                                By <span>{nft.author}</span>
                            </div>
                            <p>{nft.description}</p>
                            <button className='btn btn-white' onClick={() => {
                                nft && handleBuy(nft);
                            }}>
                                View On<span>Explorer</span> <IoBagHandleSharp />
                            </button>
                            <p className='date'>{formatDate(nft.$createdAt)}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NftDetail;
