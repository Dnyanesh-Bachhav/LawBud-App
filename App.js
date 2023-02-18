import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native';
import { COLORS } from './components/constants';
import Tabs from './Navigation/tabs';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { getLawyersData } from './Services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store, { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import { loginContext } from './components/context1';
import axios from 'axios';
// import Store from './components/context';
const Stack = createNativeStackNavigator();
export default function App() {

  const [lawyersData, setLawyersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [usersType, setUsersType] = useState("user");
  // const []
  // const [ newUserData, setNewUserData ] = useState({
  //   languages: [],
  //   user_law_data: {
  //     experience: {},
  //     specialisation :{
  //       default: {
  //         id: {},
  //         category: {}
  //       }
  //     },
  //     sanat:{},
  //     degree:{
  //       default:{
  //         id:{},
  //         file:{},
  //       }
  //     },
  //     bar_membership:{
  //       default:{
  //         id:{},
  //         category:{}
  //       }
  //     },
  //     ratings:{
  //       default:{
  //         from_user_id:{},
  //         rate:{}
  //       }
  //     },
  //     reviews:{
  //       default:{
  //         from_user_id:{},
  //         review:{}
  //       }
  //     }
  //   },
  //   _id: null,
  //   userId: null,
  //   name: null,
  //   email: null,
  //   password: null,
  //   profile_image: null,
  //   notification: [],
  //   oldnotification: [],
  //   reports: [],
  //   refer: false,
  //   seenIntro: "notseen",
  //   conversations: [],
  //   userType: "",
  //   sanatNumber: "",
  //   degree: "",
  //   bar: "",
  //   experience: "",
  //   specilization: [],
  //   address: "",
  //   phone: "",
  //   ratings: [],
  //   reviews: [],
  //   verified: false,
  //   createdAt: "",
  //   updatedAt: "",
  //   __v: "",
  //   tokens: []
  // });

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        }
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        }
    }
  }
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
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  function notifyUserData(data) {
    let data1 = data;
    setNewUserData(data1);
    console.log(newUserData);
    console.log("Apps...");
  }
  const authContext = useMemo(() => ({
    signIn: async (foundUser) => {
      let userToken;
      userToken = String(foundUser[0].userId);
      let userName = foundUser[0].name;

      try {
        // userToken = "sdsdSDE";
        await AsyncStorage.setItem("userToken", userToken);
        await AsyncStorage.setItem("currentUserData", JSON.stringify(foundUser));

      }
      catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGIN", id: userName, token: userToken });
      // setUserToken("userToken");
      // setIsLoading(false);
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem("userToken");
      }
      catch (e) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },
    signUp: async (data) => {
      // setUserToken("userToken");
      // setIsLoading(false);
      setIsLoading(true);
      setUserToken(`${data.phone}`);
      console.log("Signup called...here");
      console.log("Data: ");
      console.log(data);
      let data1;
      try {

        data1 = await axios.post("https://lawbud-backend.onrender.com/user/addUser", data);
      }
      catch (e) {
        console.log("Error:" + e);
      }
      console.log("Response: ");
      console.log(data1);
      setIsLoading(false);

    },
    setUsersType: setUsersType,
    setNewUserData1: (data) => {
      notifyUserData(data);
    }
  }), []);
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        console.log("Usertoken in useEffect: " + userToken);
      }
      catch (e) {
        console.log(e);
      }
      dispatch({ type: "REGISTER", token: userToken });

    }, 1000);
    console.log("userToken: " + loginState.userToken);
    getLawyersData1();
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"small"} color={COLORS.black} />
      </View>
    );
  }
  return (
    <loginContext.Provider value={authContext}>

      <Store data={
        <View style={styles.container}>
          <NavigationContainer>
            {
              loginState.userToken !== null ?
                <Tabs />
                : <RootStackScreen />
            }
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>}>
      </Store>
    </loginContext.Provider>

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
