import ButtonPlus from "../../components/elements/Button/ButtonPlus";

export default function TabApplication({ selectedApplication }) {
    const dataApplications = [
        "Recruit-ME",
        "CV-ME",
        "Test-ME",
        "Pick-ME",
        "BRM",
        "Metrodata Academy",
        "Team-ME",
    ];

    return (
        <>
            <div className='mt-8 mb-10'>
                <div className='flex items-start text-2xl'>Application</div>
                <div className='flex py-3 border-b-2 items-center justify-between'>
                    <div className='flex items-start gap-x-6'>
                        {dataApplications.map((app) => (
                            <div className='items-center p-2 text-gray-500 cursor-pointer'>
                                {app}
                            </div>
                        ))}
                    </div>
                    {location.pathname !== "/application/add-application" && (
                        <div className='flex items-end'>
                            <ButtonPlus
                                title={"Application"}
                                onClick={() => {}}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
