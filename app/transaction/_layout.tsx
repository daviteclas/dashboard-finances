import { Stack } from 'expo-router';
import React from 'react';

export default function TransactionLayout() {
  return (
    <Stack>
      {/* Configura a tela do formulário */}
      <Stack.Screen 
        name="new" 
        options={{ 
          title: 'Nova Transação', // O título bonito que o usuário vai ver
          headerBackTitle: 'Voltar', // No iOS, muda o texto do botão de voltar
        }} 
      />
      
      {/* Configura a tela de visualização/exclusão */}
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: 'Detalhes da Transação',
          headerBackTitle: 'Voltar',
        }} 
      />
    </Stack>
  );
}