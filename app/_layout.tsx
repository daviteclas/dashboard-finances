import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="transaction"
        options={{
          title: "Nova Transação",
          presentation: "modal",
          headerShown: false
        }}
      />
    </Stack>
  );
}
