import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { COLORS } from './components/constants';
import Tabs from './Navigation/tabs';
import { useEffect, useMemo, useState } from 'react';
import { getLawyersData } from './Services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  const [lawyersData, setLawyersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [ usersType , setUsersType] = useState("user");

  const storeAllUser = async (lawyersData) => {

    try {
      await AsyncStorage.setItem("usersData", JSON.stringify(lawyersData));
    } catch (error) {
      console.log(error);
    }
  };

  async function getLawyersData1() {
    // await AsyncStorage.removeItem("favourites");
    const lawyersArray = await getLawyersData();
    // console.log(lawyersArray);
    setLawyersData(lawyersArray.filter((item) => {
      // console.log(item.userType);
      return item.userType === "lawyer";
    }));
    await storeAllUser(lawyersData);
  }
  const authContext = useMemo(()=>({
    signIn:()=>{
      setUserToken("userToken");
      setIsLoading(false);
    },
    signOut:()=>{
      setUserToken(null);
      setIsLoading(false);
    },
    signUp:()=>{
      setUserToken("userToken");
      setIsLoading(false);
    },
    setUsersType: setUsersType,
    usersType: usersType
  }))
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    getLawyersData1();
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"small"} color={COLORS.black} />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>

    <View style={styles.container}>
      <NavigationContainer>
        {
          userToken !== null ?
          <Tabs />
          : <RootStackScreen/>
        }
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    fontSize: 27,
    fontWeight: '500',
    marginLeft: 10
  }
});
