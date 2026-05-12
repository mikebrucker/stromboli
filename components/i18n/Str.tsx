import { useTranslation } from "react-i18next";
import { Text, type TextProps } from "react-native";

type Props = TextProps & {
  children: string | Array<string>;
};

export function Str({ children, ...props }: Props) {
  const { t } = useTranslation();
  const text = Array.isArray(children) ? children.join("") : children;
  return <Text {...props}>{t(text)}</Text>;
}
