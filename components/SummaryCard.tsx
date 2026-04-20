import { useAppTheme } from "@/hooks/useAppTheme";
import { useTransactionSummary } from "@/hooks/useTransactionSummary";
import { View, Text, StyleSheet } from "react-native";

export function SummaryCard() {
    const { income, expense, total } = useTransactionSummary();

    const formatCurrency = (value : number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    const { theme } = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.card }]}>
            <View style={styles.header}>
                <Text style={[styles.label, { color: theme.text }]}>Saldo Total</Text>
                <Text style={[
                    [styles.totalAmount, { color: theme.text }],
                    total < 0 && {color: '#ef4444'}
                ]}>
                    {formatCurrency(total)}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <View style={styles.infoBox}>
                    <Text style={styles.footerLabel}>Entradas</Text>
                    <Text style={styles.incomeValue}>{formatCurrency(income)}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.footerLabel}>Saídas</Text>
                    <Text style={styles.expenseValue}>{formatCurrency(expense)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        // Sombras mais suaves e modernas
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#71717A',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    totalAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#18181B',
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#F4F4F5',
        marginVertical: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoBox: {
        flex: 1,
        alignItems: 'center',
    },
    footerLabel: {
        fontSize: 12,
        color: '#A1A1AA',
        marginBottom: 4,
    },
    incomeValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#10B981',
    },
    expenseValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
    },
})