import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { COLORS } from './components/constants';
import Tabs from './Navigation/tabs';
import { useEffect, useState } from 'react';
import { getLawyersData } from './Services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
export default function App() {
  const[ lawyersData, setLawyersData ] = useState(null);

  const storeAllUser = async (lawyersData) => {

    try {
      await AsyncStorage.setItem("usersData", JSON.stringify(lawyersData));
    } catch (error) {
      console.log(error);
    }
  };

  async function getLawyersData1(){
    // await AsyncStorage.removeItem("favourites");
      const lawyersArray = await getLawyersData();
      console.log(lawyersArray);
      setLawyersData(lawyersArray.filter(( item )=>{
          console.log(item.userType);
          return item.userType === "lawyer";
      }));
      storeAllUser(lawyersData);
  }
  useEffect(()=>{

      getLawyersData1();
  },[]);
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
