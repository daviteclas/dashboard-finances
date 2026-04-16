import { useTransactionStore } from "@/store/useTransactionStore";

export function useTransactionSummary() {
    const transactions = useTransactionStore((state) => state.transactions);

    const summary = transactions.reduce((acumulador, transacao) => {
        switch (transacao.type) {
            case 'income':
                acumulador.income += transacao.amount;
                acumulador.total += transacao.amount;
                break;
            case 'expense':
                acumulador.expense += transacao.amount;
                acumulador.total -= transacao.amount;
                break;
        }
        return acumulador;
        },
        {
            income: 0,
            expense: 0,
            total: 0
        }
    )
    return summary
}