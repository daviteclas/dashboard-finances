import { Transaction } from "@/app/(tabs)";
import { create } from "zustand";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (newTransaction: Omit<Transaction, "id" | "date">) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],

  addTransaction: (newTransaction) => {
    set((state) => {
      const novaTransacao: Transaction = {
        ...newTransaction,
        id: Math.random().toString(36).substring(2, 9),
        date: new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "long",
        }).format(new Date()),
      };

      return {
        transactions: [novaTransacao, ...state.transactions],
      };
    });
  },
}));
