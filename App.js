// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { COLORS } from './components/constants';
import Categories from './components/HomeScreen/Categories';
import Header from './components/HomeScreen/Header';
import Lawyers from './components/HomeScreen/Lawyers';
import Tabs from './Navigation/tabs';
import AboutScreen from './screens/AboutScreen';
import ChatScreen from './screens/ChatScreen';
import ChatsListScreen from './screens/ChatsListScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
        <NavigationContainer>
          <Tabs/>
        </NavigationContainer>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  textStyle:{
    fontSize: 27,
    fontWeight: '500',
    marginLeft: 10
  }
});
