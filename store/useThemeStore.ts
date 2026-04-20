import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeStore {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => Promise<void>;
    loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    themeMode: 'system',

    setThemeMode: async (mode) => {
        set({ themeMode: mode });
        await AsyncStorage.setItem('@meu_dashboard_theme', mode)
    },

    loadTheme: async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('@meu_dashboard_theme') as ThemeMode | null;

            if (savedTheme) {
                set({ themeMode: savedTheme });
            }
        } catch (error) {
            console.error('Erro ao carregar o tema: ', error)
        }
    }
}));