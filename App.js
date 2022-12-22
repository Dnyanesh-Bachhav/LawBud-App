// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { COLORS } from './components/constants';
import Categories from './components/HomeScreen/Categories';
import Header from './components/HomeScreen/Header';
import Lawyers from './components/HomeScreen/Lawyers';
import AboutScreen from './screens/AboutScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' >
            <Stack.Screen name='Home' component={HomeScreen} options={{
              headerShown: false,
            }} />
            <Stack.Screen name='About' component={AboutScreen} options={{
              headerShown: false,
            }}/>
            <Stack.Screen name='Chat' component={ChatScreen} options={{
              headerShown: false,
            }}/>
          </Stack.Navigator>
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
