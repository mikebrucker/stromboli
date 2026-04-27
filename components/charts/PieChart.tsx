import { Text, View } from "react-native";
import { Pie, PolarChart } from "victory-native";

type PieSlice = {
  label: string;
  value: number;
  color: string;
  id: string;
};

interface PieChartProps {
  data: PieSlice[];
  title?: string;
  variant?: "donut" | "pie";
}

export function PieChart({ data, title, variant = "pie" }: PieChartProps) {
  return (
    <View className="items-center">
      {title && (
        <Text className="text-sm font-semibold text-gray-700 mb-2">{title}</Text>
      )}
      <PolarChart
        data={data}
        labelKey="label"
        valueKey="value"
        colorKey="color"
      >
        <Pie.Chart innerRadius={variant === "donut" ? "60%" : undefined}>
          {() => <Pie.Slice />}
        </Pie.Chart>
      </PolarChart>
      <View className="flex-row flex-wrap justify-center gap-3 mt-3">
        {data.map(slice => (
          <View key={slice.label} className="flex-row items-center gap-1">
            <View
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <Text className="text-xs text-gray-600">
              {slice.label}
              {" "}
              (
              {slice.value}
              g)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
