import React from 'react'

const BtnVideo = ({onClick, style, btnBg}) => {
    return (
        <button className='btn btn-video' onClick={onClick} style={style}>
            <video src={btnBg} loop autoPlay muted></video>
        </button>
    )
}

export default BtnVideo
