import React from 'react'
import btnBg from '../../assets/btn-bg.mp4'

const BtnVideo = () => {
    return (
        <button className='btn btn-video'>
            <video src={btnBg} loop autoPlay muted></video>
        </button>
    )
}

export default BtnVideo
