// src/components/ImageUpload.js
import React, { useState } from 'react';
import { GiPaintBucket } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const ImageUpload = ({ imagePreview, setImagePreview, onImageBase64 }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
                onImageBase64(base64String); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        document.getElementById('image').value = "";
        onImageBase64(null);
    };

    return (
        <div className={imagePreview ? "image-container image-added" : "image-container"}>
            <GiPaintBucket />
            <label htmlFor="image"> <span>Drag & Drop</span> Or Browse</label>
            <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
            />
            {imagePreview && <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <div className="remove-image" onClick={handleRemoveImage}>
                    <AiOutlineClose />
                </div>
            </div>}
        </div>
    );
}

export default ImageUpload;
