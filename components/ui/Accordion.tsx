import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AccordionProps {
  header: ReactNode;
  children: ReactNode;
}

export function Accordion({ header, children }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const contentHeight = useRef(0);
  const animatedHeight = useSharedValue(0);
  const chevronRotation = useSharedValue(0);

  const contentStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  const toggle = () => {
    const opening = !open;
    setOpen(opening);
    animatedHeight.value = withTiming(opening ? contentHeight.current : 0, { duration: 250 });
    chevronRotation.value = withTiming(opening ? 180 : 0, { duration: 250 });
  };

  return (
    <View>
      <Pressable onPress={toggle} className="flex-row items-center p-3">
        <View className="flex-1">{header}</View>
        <Animated.View style={chevronStyle}>
          <MaterialCommunityIcons name="chevron-down" size={20} />
        </Animated.View>
      </Pressable>
      <Animated.View style={contentStyle}>
        <View
          onLayout={event => {
            const measured = event.nativeEvent.layout.height;
            if (measured > 0) contentHeight.current = measured;
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
