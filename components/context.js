import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { useMemo } from "react";
import axios from "axios";
export const AuthContext = createContext();

const Store = (props)=>{

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }
    const [userToken, setUserToken] = useState(null);
    const [ usersType , setUsersType] = useState("user");
    const [ newUserData, setNewUserData ] = useState({
      languages: [],
      user_law_data: {
        experience: {},
        specialisation :{
          default: {
            id: {},
            category: {}
          }
        },
        sanat:{},
        degree:{
          default:{
            id:{},
            file:{},
          }
        },
        bar_membership:{
          default:{
            id:{},
            category:{}
          }
        },
        ratings:{
          default:{
            from_user_id:{},
            rate:{}
          }
        },
        reviews:{
          default:{
            from_user_id:{},
            review:{}
          }
        }
      },
      _id: null,
      userId: null,
      name: null,
      email: null,
      password: null,
      profile_image: null,
      notification: [],
      oldnotification: [],
      reports: [],
      refer: false,
      seenIntro: "notseen",
      conversations: [],
      type: "",
      sanatNumber: "",
      degree: "",
      bar: "",
      experience: "",
      specilization: [],
      address: "",
      phone: "",
      ratings: [],
      reviews: [],
      verified: false,
      createdAt: "",
      updatedAt: "",
      __v: "",
      tokens: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const loginReducer = (prevState,action)=>{
      switch(action.type)
      {
        case "RETRIEVE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case "LOGIN":
          return{
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false
          };
          case "LOGOUT":
            return{
              ...prevState,
              userName: null,
              userToken: null,
              isLoading: false
            }
          case "REGISTER":
            return{
              ...prevState,
              userName: action.id,
              userToken: action.token,
              isLoading: false
            }
      }
    }
  const [loginState,dispatch] = useReducer(loginReducer,initialLoginState);

    function notifyUserData(data){
        let data1 = data;
          setNewUserData(data1);
          console.log(newUserData);
          console.log("Apps...");
      }

    const signIn =  async (foundUser)=>{
      let userToken;
      userToken = String(foundUser[0].userId);
      let userName = foundUser[0].name;
      
        try{
          // userToken = "sdsdSDE";
          await AsyncStorage.setItem("userToken",userToken);
        }
        catch(e)
        {
          console.log(e);
        }
      dispatch({ type: "LOGIN", id: userName, token: userToken });

    };
    const signOut = async ()=>{
      // setUserToken(null);
      // setIsLoading(false);
      try{
        await AsyncStorage.removeItem("userToken");
      }
      catch(e)
      {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" }); 
    };
     const signUp = async (data)=>{
      setIsLoading(true);
      setUserToken(`${data.phone}`);
      console.log("Signup called...");
      let data1;
      try{

        data1 = await axios.post("https://lawbud-backend.onrender.com/user/addUser", data);
      }
      catch(e){
        console.log("Error:"+e);
      }
      console.log(data1);
      // {
      //   "content-type": "application/json"
      // }
      setIsLoading(false);
      //  .then((response)=>{
      //   console.log(response);
      // }).catch((e)=>{
      //   console.log("Error"+e);
      // }).finally(()=>{
      //   console.log("Finally...");
      // });

    };
    const setNewUserData1 = (data)=>{
      notifyUserData(data);
    }
    return(
        <AuthContext.Provider value={{
            signIn: signIn,
            signUp: signUp,
            signOut: signOut,
            newUserData: newUserData,
            usersType: usersType,
            setUsersType: setUsersType,
            updateUser: setNewUserData,
            setNewUserData1: setNewUserData1,
        }} >
            {props.data}
        </AuthContext.Provider>
    );
  };

  export default Store;