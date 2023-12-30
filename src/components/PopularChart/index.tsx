import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

interface ArtistData {
    [key: string]: number;
}

interface IPopularChartProps {
    data: ArtistData;
}

const shortenString = (str: string) => {
    if (str.length > 7) {
        return str.slice(0, 7);
    }
    return str;
}

const PopularArtistChart: React.FC<IPopularChartProps> = ({ data }) => {
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => ({ name: shortenString(e[0]), count: e[1] }));

    return <BarChart
        width={500}
        height={300}
        data={sortedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
}

export default PopularArtistChart;