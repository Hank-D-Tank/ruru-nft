import React from 'react'
import btnBg from '../../assets/btn-bg.mp4'

const BtnVideo = ({onClick, style}) => {
    return (
        <button className='btn btn-video' onClick={onClick} style={style}>
            <video src={btnBg} loop autoPlay muted></video>
        </button>
    )
}

export default BtnVideo
