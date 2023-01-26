import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { LAWYERS, COLORS } from "../components/constants";
import Header from "../components/Header";
import image1 from "../assets/image.jpg";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FavouritesScreen(){
    const[favouritesData,setFavouritesData] = useState(null);
    let favouritesUserFiltered = [];
    const getUser = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("favourites");
          const savedAllUsers = await AsyncStorage.getItem("usersData");
          const favouriteUsers = JSON.parse(savedUser);
          const allUsers = JSON.parse(savedAllUsers);
          let i = 0;
          setFavouritesData(savedAllUsers.filter((item )=>{
            // console.log(item.userType);
            favouritesUserFiltered.push( item.userId === favouriteUsers[i]);
            i++;
            
        }));
          console.log(currentUser);
          return favouritesData;
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{

        setFavouritesData(getUser());
    },[]);
    return(
        <View style={styles.container}>
            <Header headerText={"Favourites"} />
            <FlatList
                data={favouritesData}
                style={styles.listStyle}
                renderItem={({ item, index }) => (
                    <Card name={item.name} type={item.type} languages={item.languages} experience={item.experience} key={index} />
                    )}
                    keyExtractor={({ item, index }) => index}
                    />
            
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