import React from 'react'
import { Link } from 'react-router-dom'

const NftGrid = ({nftPath, nftName, nftOwner, nftUploadTime, nftPrice, nft}) => {
  return (
    <div className="card nft-grid">
        <img src={nftPath} alt={nftName} />
        {nft ? 
        <Link className='btn btn-hover' to={`/nft/${nft.$id}`}>View NFT</Link> :   
        <button className='btn btn-hover'>View NFT</button>}
        <div className="nft-grid-info">
            <span>{nftOwner}</span>
            <p>{nftName}</p>
            <div className="nft-grid-other-infos">
                <div className="other-info">
                    <span>Time</span>
                    <p>{nftUploadTime}</p>
                </div>
                <div className="other-info">
                    <span>Price</span>
                    <p>{nftPrice}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NftGrid