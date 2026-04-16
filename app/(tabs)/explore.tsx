import { StyleSheet } from 'react-native';
import NewTransactionScreen from '../transaction/new';

export default function TabTwoScreen() {
  return (
    <NewTransactionScreen />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
