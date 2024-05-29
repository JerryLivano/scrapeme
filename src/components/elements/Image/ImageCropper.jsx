import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ logoFile, onCropComplete, closeModal }) => {
    const [crop, setCrop] = useState({ aspect: 1 });
    const [imageRef, setImageRef] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);

    const onImageLoaded = (image) => {
        setImageRef(image);
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
        onCropComplete(crop, imageRef);
    };

    return (
        <div className='crop-container w-full flex flex-col items-center'>
            <ReactCrop
                src={logoFile}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onComplete={handleCropComplete}
                onChange={(newCrop) => setCrop(newCrop)}
                className='w-full'
            />
            <button
                className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
                onClick={closeModal}
            >
                Save Crop
            </button>
        </div>
    );
};

export default ImageCropper;
