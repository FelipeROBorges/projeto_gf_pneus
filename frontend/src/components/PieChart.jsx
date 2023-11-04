import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PieChart = ({ data, description }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
      innerRadius={0}
      padAngle={0.7}
      colors={{ scheme: "dark2" }}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
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
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="white"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: colors.grey[100],
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: colors.grey[100],
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={
        !description
          ? [
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 40,
                itemsSpacing: 60,
                itemWidth: 70,
                itemHeight: 18,
                itemTextColor: colors.grey[100],
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: colors.grey[500],
                    },
                  },
                ],
              },
            ]
          : []
      }
    />
  );
};

export default PieChart;
