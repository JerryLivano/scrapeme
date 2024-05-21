import { useEffect, useState } from "react";

export default function InputCheckbox({
    value,
    dataApp,
    isModified,
}) {
    const [app, setApp] = useState([]);

    useEffect(() => {
        if (dataApp) {
            setApp(dataApp);
        }
    }, [dataApp]);

    const toggleChange = (value) => {
        if (isModified) {
            if (app.some((app) => app.name === value)) {
                setApp(app.filter((app) => app.name !== value));
            } else {
                setApp([...app, { name: value }]);
            }
        } else {
            return;
        }
    };

    return (
        <div className='flex justify-center'>
            <input
                type='checkbox'
                checked={app ? app.some((app) => app.name === value) : false}
                onChange={() => toggleChange(value)}
                className='form-checkbox h-5 w-5 text-gray-600 cursor-pointer'
            />
        </div>
    );
}
