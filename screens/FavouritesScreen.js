import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { LAWYERS, COLORS } from "../components/constants";
import Header from "../components/Header";
import image1 from "../assets/image.jpg";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLawyersData } from "../Services/requests";

function FavouritesScreen(){
    const[favouritesData,setFavouritesData] = useState([]);
    const[loading,setLoading] = useState(false);
    const[lawyersData,setLawyersData] = useState(null);
    let favouritesUserFiltered = [];
    const getUser = async () => {
        // try {
            console.log("Get called...");
            setLoading(true);
          const savedUser = await AsyncStorage.getItem("favourites");
          let data1 = JSON.parse(savedUser);
          console.log("Data:"+data1[0].userId);
          setFavouritesData(data1);
          setLoading(false);
          if(savedUser==null)
          {
            return;
          }
          //   const lawyersArray = await getLawyersData();
        // //   const savedAllUsers = await AsyncStorage.getItem("usersData");
        //   const favouriteUsers = JSON.parse(savedUser);
        //   console.log("Favoutirte users: "+  favouriteUsers[0].userId);
        //   setLawyersData(favouriteUsers);
          //   const allUsers = JSON.parse(savedAllUsers);
        //   setLawyersData(lawyersArray.filter(( item )=>{
        //     // console.log(item.userType);
        //     return item.userType === "lawyer";
        //   }));
        //   console.log("All:"+allUsers);
          // console.log(lawyersArray);
        //   let i = 0;
        //   lawyersArray.forEach((item,index)=>{
            
        //     if(item.userId === favouriteUsers[i].userId)
        //     {

        //         favouritesUserFiltered.push(item);
        //         i++;
        //     }
            
        // });
        //   console.log("unfiltered: "+favouritesUserFiltered);
        //   setFavouritesData(favouritesUserFiltered);
        //   return favouritesUserFiltered;
        // } catch (error) {
        //   console.log("Error:"+error);
        // }
      };
    useEffect(()=>{

        getUser();
        // console.log("Favorites123:"+favouritesData);
    },[]);

    return(
        <View style={styles.container}>
            <Header headerText={"Favourites"} />
            {
                !loading ? <ActivityIndicator size={"small"} color={COLORS.black} ></ActivityIndicator>
                : <FlatList
                data={favouritesData}
                style={styles.listStyle}
                renderItem={({ item, index }) => (
                    <Text>{item.userId }</Text>
                    // <Card name={item?.name} type={item?.type} languages={item?.languages || []} experience={item?.experience} key={index} />
                    )}
                    keyExtractor={({ item, index }) => index}
                    />
                    
                }
        </View>
    );
}
function Card({ name, type, languages, experience }) {
    const navigation = useNavigation();
    console.log(experience);
    
    return (
        <View style={{elevation: 2, borderRadius: 7, marginTop: 10, marginRight: 10, overflow: 'hidden' }} >
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
                source={image1}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }} >
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{name}</Text>
                    <TouchableOpacity>
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
    container:{
        flex: 1,
    },
    imgStyle: {
        width: 110,
        height: 110,
        // borderWidth: 5,
        aspectRatio: 1/1,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    listStyle: {
        marginLeft: 10
    }
});
export default FavouritesScreen;