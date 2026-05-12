import { useTranslation } from "react-i18next";
import { Text, type TextProps } from "react-native";

type Props = TextProps & {
  children: string;
};

export function Str({ children, ...props }: Props) {
  const { t } = useTranslation();
  return <Text {...props}>{t(children)}</Text>;
}
