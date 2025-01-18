import { PieChart } from "@mui/x-charts";

export default function AnalysisPieChart({ chartData }) {
    return (
        <PieChart
            series={[
                {
                    data: chartData,
                },
            ]}
            width={440}
            height={400}
        />
    );
}
