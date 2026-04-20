import { Colors } from "@/constants/Colors";
import { useThemeStore } from "@/store/useThemeStore";
import { useColorScheme } from "react-native";

export function useAppTheme() {
    const themeMode = useThemeStore((state) => state.themeMode);

    const systemColorScheme = useColorScheme();

    const activeMode = themeMode === 'system' ? (systemColorScheme ?? 'light') : themeMode; 

    const theme = Colors[activeMode];

    return {
        theme,
        activeMode,
        themeMode
    }
}