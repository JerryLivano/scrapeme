export default function InputDropFile({
    register,
    setValue,
    imageNotFound,
    errorImageMessage,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [showImageError, setShowImageError] = useState(false);
    const avatarUrl = useRef(LogoAddImage);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];
            if (file.size > 2 * 1024 * 1024) {
                setShowImageError(true);
                setErrorImageMessage("File size exceeds 2MB");
                return;
            }
            setModalOpen(true);
            setLogoFile(file);
            setShowImageError(false);
            setErrorImageMessage("");
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        maxFiles: 1,
    });

    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
        setValue("logo", imgSrc.slice(imgSrc.indexOf(",") + 1));
        setLogoFile(imgSrc);
    };

    return (
        <div className='w-full'>
            <div className='w-full flex justify-center relative'>
                <div
                    {...getRootProps({
                        className: `w-full h-full place-content-center dropzone cursor-pointer border-dashed rounded-md border-2 ${
                            imageNotFound ? "border-red-600" : "border-gray-300"
                        } p-4 text-center`,
                    })}
                >
                    <input
                        type='file'
                        {...register("logo")}
                        {...getInputProps()}
                    />
                    <div className='relative items-center'>
                        {avatarUrl.current === LogoAddImage ? (
                            <>
                                <div className='w-full h-auto justify-center flex '>
                                    <img
                                        className='justify-items-center w-16 h-16'
                                        src={avatarUrl.current}
                                    />
                                </div>
                                <div>
                                    <span className='bg-transparent text-indigo-500 semibold mr-1'>
                                        Upload a pic with
                                    </span>
                                    <span className='text-indigo-500 font-bold'>
                                        transparent background
                                    </span>
                                </div>
                                <div className='text-gray-400'>
                                    PNG or JPG up to 2MB
                                </div>
                            </>
                        ) : (
                            <div className='w-full h-auto justify-center flex '>
                                <img
                                    className='justify-items-center w-36 h-36'
                                    src={avatarUrl.current}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {imageNotFound && (
                <div className='mt-2 flex items-center'>
                    <span
                        onMouseEnter={() => setShowImageError(true)}
                        onMouseLeave={() => setShowImageError(false)}
                        className='cursor-pointer py-1'
                    >
                        <ExclamationCircleIcon className='w-7 h-7 text-red-600' />
                    </span>
                    {showImageError && (
                        <div className='ml-2'>
                            <ErrorLabel message={errorImageMessage} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
