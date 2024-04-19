const GridTable = ({ children }) => {
    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <div className='mt-8 flow-root'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                        <table className='min-w-full divide-y divide-gray-300'>
                            {children}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Header = ({ children }) => {
    return (
        <>
            <thead>{children}</thead>
        </>
    );
};

const Body = ({ children }) => {
    return (
        <>
            <tbody className='divide-y divide-gray-200'>{children}</tbody>
        </>
    );
};

GridTable.Header = Header;
GridTable.Body = Body;

export default GridTable;
