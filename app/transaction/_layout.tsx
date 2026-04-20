import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import React from "react";

export default function TransactionLayout() {
  const { theme } = useAppTheme();

  return (
    <Stack>
      {/* Configura a tela do formulário */}
      <Stack.Screen
        name="new"
        options={{
          title: "Nova Transação", // O título bonito que o usuário vai ver
          headerBackTitle: "Voltar", // No iOS, muda o texto do botão de voltar
          headerStyle: {
            backgroundColor: theme.background
          },
          headerTintColor: theme.text
        }}
      />

      {/* Configura a tela de visualização/exclusão */}
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhes da Transação",
          headerBackTitle: "Voltar",
          headerStyle: {
            backgroundColor: theme.background
          },
          headerTintColor: theme.text
        }}
      />
    </Stack>
  );
}
