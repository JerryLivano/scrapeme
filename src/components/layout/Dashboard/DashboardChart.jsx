import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import DropdownInput from "../../common/Public/Form/DropdownInput";

export default function DashboardChart() {
    const filterYearOptions = [
        { value: 2024, label: 2024 },
        { value: 2023, label: 2023 },
        { value: 2022, label: 2022 },
        { value: 2021, label: 2021 },
    ];
    const [year, setYear] = useState(filterYearOptions[0].value);

    const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];

    // Define the data with explicit values for each month
    const data = [
        {
            site_name: "Raywhite",
            values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15], // Values for each month
        },
        {
            site_name: "BeliRumah.co",
            values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14], // Values for each month
        },
    ];

    // Create a formatted dataset for the chart
    const formattedData = months.map((month, index) => ({
        month,
        ...data.reduce((acc, site) => {
            acc[site.site_name] = site.values[index]; // Use the index to get the value for the month
            return acc;
        }, {}),
    }));

    const stackStrategy = {
        stack: "total",
        stackOffset: "none",
    };

    const customize = {
        legend: { hidden: false }, // Show legend for better understanding
        margin: { top: 5 },
    };

    console.log(formattedData); // Check the formatted data

    return (
        <div className="bg-white shadow rounded-lg pt-6 ps-8">
            <div className='flex flex-row justify-between mb-6'>
                <div className='text-xl font-medium text-gray-800'>
                    Data Scraped Statistic by Year
                </div>
                <div className='flex items-center pe-8'>
                    <div className='mr-2 text-sm font-medium leading-6 text-gray-400'>
                        Select Year
                    </div>
                    <DropdownInput
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className='max-w-fit'
                    >
                        {filterYearOptions.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </DropdownInput>
                </div>
            </div>
            <LineChart
                xAxis={[
                    {
                        dataKey: "month",
                        valueFormatter: (value) => value.toUpperCase(),
                    },
                ]}
                series={data.map((site) => ({
                    dataKey: site.site_name,
                    label: site.site_name,
                    showMark: false,
                    ...stackStrategy
                }))}
                dataset={formattedData}
                height={400}
                {...customize}
            />
        </div>
    );
}