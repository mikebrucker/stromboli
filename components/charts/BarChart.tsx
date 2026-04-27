import { ScrollView, Text, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";

interface BarDataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarDataPoint[];
  title?: string;
  color?: string;
  unit?: string;
}

export function BarChart({ data, title, color = "#f59e0b", unit = "" }: BarChartProps) {
  const chartData = data.map(d => ({ x: d.label, y: d.value }));

  return (
    <View>
      {title && (
        <Text className="text-sm font-semibold text-gray-700 mb-2">{title}</Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ width: Math.max(300, data.length * 60), height: 200 }}>
          <CartesianChart
            data={chartData}
            xKey="x"
            yKeys={["y"]}
          >
            {({ points, chartBounds }) => (
              <Bar
                points={points.y}
                chartBounds={chartBounds}
                color={color}
                roundedCorners={{ topLeft: 4, topRight: 4 }}
              />
            )}
          </CartesianChart>
        </View>
      </ScrollView>
      <Text className="text-xs text-gray-400 text-right mt-1">{unit}</Text>
    </View>
  );
}
