import React, { useEffect, useState } from 'react';
import { BsCloudUpload, BsCoin } from 'react-icons/bs';
import Input from '../form/Input';
import ImageUpload from '../form/ImageUpload';
import uploadBg from '../../assets/upload-bg.mp4'
import Select from 'react-select';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoBagHandleSharp } from 'react-icons/io5';


const colourOptions = [
    { value: 'art', label: 'Art', color: '#FF5630' },
    { value: 'music', label: 'Music', color: '#36B37E' },
    { value: 'action', label: 'Action', color: '#00B8D9' },
    { value: 'digital', label: 'Digital', color: '#FFC400' },
    { value: 'gaming', label: 'Gaming', color: '#FF8B00' },
    { value: 'anime', label: 'Anime', color: '#6554C0' },
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#222',
        borderColor: state.isFocused ? '#faff00' : 'rgba(255,255,255,0.1)',
        color: '#fff',
        '&:hover': {
            borderColor: 'rgba(255,255,255,1)',
        },
        boxShadow: state.isFocused ? '0 0 0 1px #faff00' : 'none',
        fontSize: "1.3rem",
        padding: "0.3rem 1rem",
        width: "100%",
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#222',
        zIndex: 9999,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#333' : '#222',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#000',
        },
        fontSize: "1.3rem",
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.color,
        color: '#fff',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#fff',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: '#fff',
        '&:hover': {
            backgroundColor: state.data.color,
            color: '#000',
        },
    }),
};

const Upload = () => {
    const { publicKey, connected, signTransaction } = useWallet();
    const wallet = useWallet();
    const [formData, setFormData] = useState({
        publicKey: publicKey ? publicKey.toString() : "Connect Your Wallet",
        title: "",
        symbol: "",
        author: "",
        description: "",
        image: null,
        price: "",
        royalty: "",
        tags: []
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadedData, setUploadedData] = useState(null);
    const [isMinting, setIsMinting] = useState(true);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            publicKey: publicKey ? publicKey.toString() : ""
        }));
    }, [publicKey]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTagsChange = (selectedOptions) => {
        setFormData(prevState => ({
            ...prevState,
            tags: selectedOptions.map(option => option.value)
        }));
    };

    const handleImageBase64 = (base64) => {
        setFormData(prevState => ({
            ...prevState, image: base64
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { title, symbol, author, description, image, price, royalty, tags } = formData;
        if (!title || !symbol || !author || !description || !image || !price || !royalty || tags.length === 0) {
            toast.error('Please fill in all the details before uploading.', {
                className: "custom-toast",
            });
            return;
        }
    
        confirmAlert({
            title: 'Confirm Upload',
            message: 'Are you sure you want to upload this data?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        toast.loading('Uploading data...', {
                            className: "custom-toast",
                        });
                        try {
                            const res = await fetch("https://ruru-nft-backend.vercel.app/upload", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(formData),
                            });
                            const data = await res.json();
                            setUploadedData(data);
                            toast.dismiss();
                            toast.success('Data uploaded successfully!', {
                                className: "custom-toast",
                            });
                        } catch (error) {
                            console.error("Error uploading data:", error);
                            toast.dismiss();
                            toast.error('Error uploading data. Please try again.', {
                                className: "custom-toast",
                            });
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };
    

    const handleMint = () => {
        confirmAlert({
            title: 'Confirm Mint',
            message: 'Are you sure you want to mint this NFT?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        if (!uploadedData) {
                            toast.error('Please upload data first.', {
                                className: "custom-toast",
                            });
                            return;
                        }
                        if (!connected) {
                            toast.error('Wallet not connected. Please connect your wallet.', {
                                className: "custom-toast",
                            });
                            return;
                        }
                        if (!signTransaction) {
                            toast.error('Unable to sign transactions. Please make sure your wallet is properly connected.', {
                                className: "custom-toast",
                            });
                            return;
                        }
    
                        toast.loading('Minting NFT...', {
                            className: "custom-toast",
                        });
                        setIsMinting(false);
                        try {
                            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
                            const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
    
                            if (!publicKey || !signTransaction) {
                                throw new Error('Wallet is not properly connected.');
                            }
    
                            const { nft } = await metaplex.nfts().create({
                                uri: uploadedData.metadataUrl,
                                name: formData.title,
                                symbol: formData.symbol,
                                sellerFeeBasisPoints: parseFloat(formData.royalty) * 100,
                            }, { commitment: 'finalized' });
    
                            toast.dismiss();
                            toast.success('NFT minted successfully!', {
                                className: "custom-toast",
                            });
    
                            const mintedNft = await metaplex.nfts().findByMint({ mintAddress: nft.address });
                            const currentOwner = mintedNft.updateAuthorityAddress;
    
                            await fetch("https://ruru-nft-backend.vercel.app/mint", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    documentId: uploadedData.documentId,
                                    mintAddress: nft.address.toString(),
                                    currentOwner: currentOwner
                                }),
                            });
    
                            toast.success('NFT records updated successfully!', {
                                className: "custom-toast",
                            });
                            setIsMinting(false);
                        } catch (error) {
                            console.error("Error minting NFT:", error);
                            toast.dismiss();
                            toast.error(`Error minting NFT: ${error.message}`, {
                                className: "custom-toast",
                            });
                            setIsMinting(true);
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    

    return (
        <div className="page upload container">
            <h2>{!uploadedData ? "Upload Your MetaData" : "Mint Your NFTs"}</h2>
            <ToastContainer />
            {!uploadedData && <div className="row mt-4">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <Input type='text' name="publicKey" placeholder="Connect Your Wallet" value={formData.publicKey} disabled readonly />
                        <div className="d-flex mb-1" style={{ gap: "1rem" }}>
                            <Input type='text' name="title" placeholder="NFTs Title Eg: Sunny Day" value={formData.title} onChange={handleChange} isTextArea={false} />
                            <Input type='text' name="author" placeholder="Author Name Eg: Hank" value={formData.author} onChange={handleChange} isTextArea={false} />
                        </div>
                        <Input type='text' name="description" placeholder="NFT Description Eg: A Bright Sunny Day Image..." value={formData.description} onChange={handleChange} isTextArea={true} />
                        <div className="d-flex mb-2" style={{ gap: "1rem" }}>
                            <Input
                                type='number'
                                name="royalty"
                                placeholder="Royalty Fee in % Eg: 10 for 10%"
                                value={formData.royalty}
                                onChange={handleChange}
                                isTextArea={false}
                                min="0"
                                max="100"
                                step="any"
                            />
                            <Input
                                type='number'
                                name="price"
                                placeholder="Price in SOL Eg: 0.57"
                                value={formData.price}
                                onChange={handleChange}
                                isTextArea={false}
                                min="0"
                                step="any"
                            />
                        </div>
                        <div className="d-flex mb-2" style={{ gap: "1rem" }}>
                            <Select
                                isMulti
                                name="tags"
                                options={colourOptions}
                                className="basic-multi-select mb-1"
                                classNamePrefix="select"
                                onChange={handleTagsChange}
                                styles={customStyles}
                                placeholder="Add Tags"
                            />
                            <Input
                                type='text'
                                name="symbol"
                                placeholder="Your NFT Symbol Eg: SUNDY"
                                value={formData.symbol}
                                onChange={handleChange}
                                isTextArea={false}
                            />
                        </div>
                        <ImageUpload imagePreview={imagePreview} setImagePreview={setImagePreview} onImageBase64={handleImageBase64} />
                        <button className="btn btn-main btn-sm mt-2" type="submit">
                            Upload Data <BsCloudUpload />
                        </button>
                    </form>
                </div>
                <div className="col-md-6 upload-bg">
                    <video src={uploadBg} muted autoPlay loop></video>
                </div>
            </div>}
            {uploadedData && <div className='container nft-details mt-4'>
                <div className="nft-details-bg row" style={{ background: `url(${formData.image}) no-repeat` }}>
                <div className="col-lg-6 nft-image">
                    <img src={`${formData.image}`} alt={formData.title} />
                </div>
                <div className="col-lg-6 nft-info">
                    <h2>{formData.title}</h2>
                    <div className="creator">
                        By <span>{formData.author}</span>
                    </div>
                    <p>{formData.description}</p>
                    {isMinting ? <button className='btn btn-white' onClick={handleMint}>
                        Mint Now <span>Free!</span> <IoBagHandleSharp />
                    </button> : <button className='btn btn-white'>
                        Minted For <span>Free!</span> <IoBagHandleSharp />
                    </button>}
                    <p className='date'>Selling Feature Yet To Be Added!</p>
                </div>
            </div></div>}
        </div>
    );
}

export default Upload;
