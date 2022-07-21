import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Placed Students",
    "Unplaced Students",
    "Student opting Higher Education",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Stats(props) {
  return (
    <Pie
      data={data}
      // height={50}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            display: true,
            title: {
              display: true,
              text: props.batch,
              padding: {
                top: 10,
              },
            },
          },
        },
      }}
    />
  );
}
