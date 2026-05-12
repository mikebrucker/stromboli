import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Content, Header, Item, Root, Trigger, useItemContext } from "@rn-primitives/accordion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
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
  const [value, setValue] = useState("");

  return (
    <Root type="single" collapsible value={value} onValueChange={val => setValue(val ?? "")}>
      <Item value="item">
        <AccordionInner header={header}>{children}</AccordionInner>
      </Item>
    </Root>
  );
}

function AccordionInner({ header, children }: AccordionProps) {
  const { isExpanded } = useItemContext();
  const contentHeight = useRef(0);
  const animatedHeight = useSharedValue(0);
  const chevronRotation = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withTiming(isExpanded ? contentHeight.current : 0, { duration: 250 });
    chevronRotation.value = withTiming(isExpanded ? 180 : 0, { duration: 250 });
  }, [isExpanded]);

  const contentStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotation.value}deg` }],
  }));

  return (
    <>
      <Header>
        <Trigger className="flex-row items-center p-3">
          <View className="flex-1">{header}</View>
          <Animated.View style={chevronStyle}>
            <MaterialCommunityIcons name="chevron-down" size={20} className="text-foreground" />
          </Animated.View>
        </Trigger>
      </Header>
      <Content forceMount>
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
      </Content>
    </>
  );
}
