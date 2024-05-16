export default function InputCheckboxGroup({ data }) {
    return (
        <ul className='flex flex-col gap-y-3 mt-3'>
            {data.map((item) => (
                <li key={item.id} className='flex items-center'>
                    <input
                        type='checkbox'
                        name={`data-${item.id}`}
                        value={item.id}
                        className='h-5 w-5 text-gray-600 focus:text-gray-600 border-gray-600 rounded'
                    />
                    <label
                        htmlFor={`data-${item.id}`}
                        className='ml-2 block text-md font-medium text-gray-900'
                    >
                        {item.name}
                    </label>
                </li>
            ))}
        </ul>
    );
}
