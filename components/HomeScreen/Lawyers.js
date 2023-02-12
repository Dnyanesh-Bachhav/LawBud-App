import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS, LAWYERS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLawyersData } from "../../Services/requests";

function Lawyers({lawyersData}) {
    const navigation = useNavigation();
    let[favouriteLawyers,setFavouriteLawyers] = useState([]);
    // const[ lawyersData, setLawyersData ] = useState(null);
    // async function getLawyersData1(){
    //    await  AsyncStorage.setItem("favourites",JSON.stringify([]));
    //     const lawyersArray = await getLawyersData();
    //     // console.log(lawyersArray);
    //     setLawyersData(lawyersArray.filter(( item )=>{
    //         // console.log(item.userType);
    //         return item.userType === "lawyer";
    //     }));
    // }
    useEffect(()=>{
        // getLawyersData1();
        console.log(lawyersData.length);
    },[]);
    return (
        <View style={{ flex: 1, marginTop: 10 }} >
            {
                lawyersData && 
                (<FlatList
                    data={ lawyersData }
                    style={styles.listStyle}
                    renderItem={({ item, index }) => (
                        <Card name={item.name} type={item.type} userId={item.userId} imgSrc={item.profile_image} languages={item.user_law_data.languages||["Marathi","Hindi","English"]} experience={item?.experience||0} key={index} favouriteLawyers={favouriteLawyers} setFavouriteLawyers={setFavouriteLawyers} />
                        )}
                        keyExtractor={({ item, index }) => index}
                        />)
                    }
            {/* <ActivityIndicator size={"large"} color={COLORS.secondary} /> */}
            
            {/* <TouchableOpacity onPress={()=>{
                navigation.navigate("Register");
            }}  >
                <Text>Go to Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                navigation.navigate("Login");
            }}  >
                <Text>Go to Login</Text>
            </TouchableOpacity> */}
        </View>
    );
}
function Card({ name, userId, type, imgSrc, languages, experience, favouriteLawyers, setFavouriteLawyers }) {
    const navigation = useNavigation();
    let favoritesArray = [];
    // console.log(experience);
    const elementRemove = ( array, item )=>{
        return array.filter((ele)=>{
            return ele.userId === item.userId;
        });
    }
    const storeUser = async (userId) => {
            console.log("Store function called...");

            const value = {
              "userId": `${userId}` 
            };
            let response = false;
            favouriteLawyers.some(item=>{
                if( item.userId === userId)
                {
                    console.log("Item matched..." + item.userId + " "+ userId);
                //    favoritesArray = elementRemove( favoritesArray, item);
                   setFavouriteLawyers(( arr1 )=>{
                    return arr1.filter((ele)=>{
                        return ele.userId !== item.userId;
                    });
                   });
                   
                   console.log("Array:"+ JSON.stringify(favouriteLawyers));
                   response = true;
                //    return;
                }
            });
            if(response===true)
            {
                console.log("Response");
                await AsyncStorage.setItem("favourites", JSON.stringify(favouriteLawyers));
                response = false;
                AsyncStorage.getItem("favourites").then((cc,error)=>{

                    console.log("Favourites12: "+cc);
                });
                return;
            }
            else{

                favoritesArray = [...favouriteLawyers,value];
                setFavouriteLawyers(favoritesArray);
                try {
                  await AsyncStorage.setItem("favourites", JSON.stringify(favoritesArray));
                  AsyncStorage.getItem("favourites").then((cc,error)=>{
        
                      console.log("Favourites1: "+cc);
                  });
                } catch (error) {
                  console.log(error);
                }
            }
      };
    const getUser = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("favourites");
          const currentUser = JSON.parse(savedUser);
        //   console.log(currentUser[0][0]);
        } catch (error) {
          console.log(error);
        }
      };
    getUser();

    return (
        <View style={{elevation: 2, borderRadius: 7, marginBottom: 10, marginRight: 10, overflow: 'hidden' }}>
            <View style={{flex:1, justifyContent: 'center', backgroundColor: COLORS.white}} >
                
            
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                navigation.navigate('About',{
                    name,
                    type,
                    languages,
                    experience
                });
            }} >

            <Image
                source={{
                    uri: imgSrc
                }}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }} >
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{name}</Text>
                    <TouchableOpacity onPress={()=>{
                        storeUser(userId);
                    }} >
                        <AntDesign name="hearto" size={21} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: COLORS.gray }} >{type}</Text>
                <Text style={{ color: COLORS.gray }} >{languages.map((item,index) => 
                {
                    if(index!==languages.length-1){
                        return item + ", "
                    }
                    else{
                        return item;
                    }
                } )}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginRight: 10 }} >
                    <Text style={{ color: COLORS.gray }}>Exp: {experience}yrs</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    imgStyle: {
        width: 110,
        height: 110,
        aspectRatio: 1/1,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    listStyle: {
        marginLeft: 10
    }
});
export default Lawyers;