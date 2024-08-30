import React from 'react'
import btnBg from '../../assets/btn-bg.mp4'

const BtnVideo = ({onClick}) => {
    return (
        <button className='btn btn-video' onClick={onClick}>
            <video src={btnBg} loop autoPlay muted></video>
        </button>
    )
}

export default BtnVideo
