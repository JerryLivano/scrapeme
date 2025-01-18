import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function AnalysisBarChart({ chartData }) {
    return (
        <BarChart
            xAxis={[
                {
                    scaleType: "band",
                    data: chartData.room,
                },
            ]}
            series={[
                {
                    label: "Room Data Count",
                    data: chartData.count,
                    color: "#17479D"
                },
            ]}
            width={730}
            height={420}
        />
    );
}
