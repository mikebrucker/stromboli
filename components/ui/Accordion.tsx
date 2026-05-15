import { classNames } from "@/helpers/genericHelper";
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
  rootClasses?: string;
  itemClasses?: string;
  value?: string;
  onValueChange?: (val: string) => void;
}

export function Accordion({ header, children, rootClasses, itemClasses, value: controlledValue, onValueChange }: AccordionProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;
  const setValue = onValueChange ?? setInternalValue;
  const rootClassNames = classNames({
    [rootClasses ?? ""]: Boolean(rootClasses),
  });
  return (
    <Root type="single" collapsible value={value} onValueChange={val => setValue(val ?? "")}>
      <Item value="item" className={rootClassNames}>
        <AccordionInner header={header} itemClasses={itemClasses}>{children}</AccordionInner>
      </Item>
    </Root>
  );
}

function AccordionInner({ header, children, itemClasses }: AccordionProps) {
  const itemClassNames = classNames({
    [itemClasses ?? ""]: Boolean(itemClasses),
  });

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
        <Trigger className={itemClassNames}>
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
