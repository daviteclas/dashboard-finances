import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (newTransaction: Omit<Transaction, "id" | "date">) => void;
  loadTransaction: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (id: string, updateData: Partial<Transaction>) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],

  addTransaction: async (newTransaction) => {
    const novaTransacao: Transaction = {
      ...newTransaction,
      id: Math.random().toString(36).substring(2, 9),
      date: new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
      }).format(new Date()),
    };

    set((state) => {
      const novasTransacoes = [novaTransacao, ...state.transactions];

      AsyncStorage.setItem(
        "@meu_dashboard_transactions",
        JSON.stringify(novasTransacoes),
      );

      return { transactions: novasTransacoes };
    });
  },

  loadTransaction: async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(
        "@meu_dashboard_transactions",
      );
      if (dadosSalvos) {
        set({ transactions: JSON.parse(dadosSalvos) });
      }
    } catch (error) {
      console.error("Erro ao carregar: ", error);
    }
  },

  deleteTransaction: async (id) => {
    set((state) => {
      const novasTransacoes = state.transactions.filter((t) => t.id !== id);

      AsyncStorage.setItem(
        "@meu_dashboard_transactions",
        JSON.stringify(novasTransacoes),
      );

      return { transactions: novasTransacoes };
    });
  },

  updateTransaction: async (id, updateData) => {
    set((state) => {
      const novasTransacoes = state.transactions.map((t) => 
        t.id === id ? { ...t, ...updateData } : t
      );

      AsyncStorage.setItem('@meu_dashboard_transactions', JSON.stringify(novasTransacoes));

      return { transactions: novasTransacoes }
    })
  },
}));
