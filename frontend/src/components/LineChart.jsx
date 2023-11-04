import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    {
      "id": "japan",
      "color": "hsl(228, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 216
        },
        {
          "x": "helicopter",
          "y": 171
        },
        {
          "x": "boat",
          "y": 190
        },
        {
          "x": "train",
          "y": 0
        },
        {
          "x": "subway",
          "y": 64
        },
        {
          "x": "bus",
          "y": 21
        },
        {
          "x": "car",
          "y": 130
        },
        {
          "x": "moto",
          "y": 17
        },
        {
          "x": "bicycle",
          "y": 219
        },
        {
          "x": "horse",
          "y": 88
        },
        {
          "x": "skateboard",
          "y": 180
        },
        {
          "x": "others",
          "y": 290
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(175, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 205
        },
        {
          "x": "helicopter",
          "y": 66
        },
        {
          "x": "boat",
          "y": 104
        },
        {
          "x": "train",
          "y": 110
        },
        {
          "x": "subway",
          "y": 105
        },
        {
          "x": "bus",
          "y": 173
        },
        {
          "x": "car",
          "y": 5
        },
        {
          "x": "moto",
          "y": 253
        },
        {
          "x": "bicycle",
          "y": 133
        },
        {
          "x": "horse",
          "y": 101
        },
        {
          "x": "skateboard",
          "y": 290
        },
        {
          "x": "others",
          "y": 173
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(170, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 183
        },
        {
          "x": "helicopter",
          "y": 187
        },
        {
          "x": "boat",
          "y": 201
        },
        {
          "x": "train",
          "y": 140
        },
        {
          "x": "subway",
          "y": 41
        },
        {
          "x": "bus",
          "y": 168
        },
        {
          "x": "car",
          "y": 112
        },
        {
          "x": "moto",
          "y": 38
        },
        {
          "x": "bicycle",
          "y": 292
        },
        {
          "x": "horse",
          "y": 7
        },
        {
          "x": "skateboard",
          "y": 145
        },
        {
          "x": "others",
          "y": 63
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(73, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 39
        },
        {
          "x": "helicopter",
          "y": 5
        },
        {
          "x": "boat",
          "y": 46
        },
        {
          "x": "train",
          "y": 216
        },
        {
          "x": "subway",
          "y": 286
        },
        {
          "x": "bus",
          "y": 241
        },
        {
          "x": "car",
          "y": 60
        },
        {
          "x": "moto",
          "y": 95
        },
        {
          "x": "bicycle",
          "y": 223
        },
        {
          "x": "horse",
          "y": 253
        },
        {
          "x": "skateboard",
          "y": 279
        },
        {
          "x": "others",
          "y": 162
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(332, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 258
        },
        {
          "x": "helicopter",
          "y": 21
        },
        {
          "x": "boat",
          "y": 184
        },
        {
          "x": "train",
          "y": 290
        },
        {
          "x": "subway",
          "y": 246
        },
        {
          "x": "bus",
          "y": 10
        },
        {
          "x": "car",
          "y": 285
        },
        {
          "x": "moto",
          "y": 270
        },
        {
          "x": "bicycle",
          "y": 121
        },
        {
          "x": "horse",
          "y": 29
        },
        {
          "x": "skateboard",
          "y": 71
        },
        {
          "x": "others",
          "y": 208
        }
      ]
    }
  ];

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
