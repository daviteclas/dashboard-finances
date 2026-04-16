import { Transaction } from "@/app/(tabs)";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (newTransaction: Omit<Transaction, "id" | "date">) => void;
  loadTransaction: () => Promise<void>
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],

  addTransaction: async (newTransaction) => {
    const novaTransacao: Transaction = {
      ...newTransaction,
      id: Math.random().toString(36).substring(2, 9),
      date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' }).format(new Date()),
    }

    set((state) => {
      const novasTransacoes = [novaTransacao, ...state.transactions];

      AsyncStorage.setItem('@meu_dashboard_transactions', JSON.stringify(novasTransacoes));

      return { transactions: novasTransacoes }
    })
  },

  loadTransaction: async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('@meu_dashboard_transactions')
      if (dadosSalvos) {
        set({ transactions: JSON.parse(dadosSalvos) });
      }
    } catch(error) {
      console.error("Erro ao carregar: ", error)
    }
  }
}));
