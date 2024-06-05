import { useRef, useState, useEffect } from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import ReactDOM from "react-dom";
import "react-image-crop/dist/ReactCrop.css"; 

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, file }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const imageElement = new Image();
                const imageUrl = reader.result?.toString() || "";
                imageElement.src = imageUrl;

                imageElement.addEventListener("load", (e) => {
                    if (error) setError("");
                    const { naturalWidth, naturalHeight } = e.currentTarget;
                    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                        setError("Image must be at least 150 x 150 pixels.");
                        return setImgSrc("");
                    }
                });
                setImgSrc(imageUrl);
            });
            reader.readAsDataURL(file);
        } else {
            setError("Invalid file type.");
        }
    }, [file, error]);

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const handleCrop = () => {
        setCanvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL();
        updateAvatar(dataUrl);
        closeModal();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="bg-white p-4 rounded shadow-lg z-10">
                {error && <p className="text-red-400 text-xs">{error}</p>}
                {imgSrc && (
                    <div className="flex w-full h-full flex-col items-center">
                        <ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={40}
                            maxWidth={500}
                            minHeight={10}
                        >
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                alt="Upload"
                                style={{ maxHeight: "70vh" }}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                        <button
                            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
                            onClick={handleCrop}
                        >
                            Crop Image
                        </button>
                    </div>
                )}
                {crop && (
                    <canvas
                        ref={previewCanvasRef}
                        className="mt-4"
                        style={{
                            display: "none",
                            border: "1px solid black",
                            objectFit: "contain",
                        }}
                    />
                )}
            </div>
        </div>,
        document.body
    );
};

export default ImageCropper;
