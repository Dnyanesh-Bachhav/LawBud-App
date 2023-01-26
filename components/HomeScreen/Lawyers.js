import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS, LAWYERS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLawyersData } from "../../Services/requests";

function Lawyers() {
    const navigation = useNavigation();
    const[ lawyersData, setLawyersData ] = useState(null);
    async function getLawyersData1(){
        const lawyersArray = await getLawyersData();
        console.log(lawyersArray);
        setLawyersData(lawyersArray.filter(( item )=>{
            console.log(item.userType);
            return item.userType === "lawyer";
        }));
    }
    useEffect(()=>{
        getLawyersData1();
    },[]);
    return (
        <View style={{ flex: 1, marginTop: 10 }} >
            {
                lawyersData ?
                <FlatList
                    data={ lawyersData }
                    style={styles.listStyle}
                    renderItem={({ item, index }) => (
                        <Card name={item.name} type={item.type} userId={item.userId} imgSrc={item.profile_image} languages={item.ratings} experience={item.experience} key={index} />
                        )}
                        keyExtractor={({ item, index }) => index}
                        />
                    : <ActivityIndicator size={"large"} color={COLORS.secondary} />
            }
            <TouchableOpacity onPress={()=>{
                navigation.navigate("Register");
            }}  >
                <Text>Go to Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                navigation.navigate("Login");
            }}  >
                <Text>Go to Login</Text>
            </TouchableOpacity>
        </View>
    );
}
function Card({ name, userId, type, imgSrc, languages, experience }) {
    const navigation = useNavigation();
    console.log(experience);
    
    const storeUser = async (userId) => {
        const value = {
              userId: userId,
            };
            let data1 = await AsyncStorage.getItem("favourites");
            
            let data = [];
            data.push(data1);
            // let data = [...data1];
            data.push(value);
        try {
          await AsyncStorage.setItem("favourites", JSON.stringify(data));
          let cc = await AsyncStorage.getItem("favourites");
          console.log(cc);
        } catch (error) {
          console.log(error);
        }
      };
    const getUser = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("favourites");
          const currentUser = JSON.parse(savedUser);
          console.log(currentUser);
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <View style={{elevation: 2, borderRadius: 7, marginBottom: 10, marginRight: 10, overflow: 'hidden' }} >
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
                    <Text style={{ color: COLORS.gray }} >Exp: {experience}</Text>
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