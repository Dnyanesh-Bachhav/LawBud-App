import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS, LAWYERS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getLawyersData } from "../../Services/requests";

function Lawyers() {
    const navigation = useNavigation();
    const[ lawyersData, setLawyersData ] = useState(null);
    async function getLawyersData1(){
        const lawyersArray = await getLawyersData();
        console.log(lawyersArray);
        lawyersArray = lawyersArray.filter(( item )=>{
            return item.userType == "lawyers"
        });
        setLawyersData(lawyersArray);
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
                        <Card name={item.name} type={item.type} imgSrc={item.profile_image} languages={item.ratings} experience={item.experience} key={index} />
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
        </View>
    );
}
function Card({ name, type, imgSrc, languages, experience }) {
    const navigation = useNavigation();
    console.log(experience);
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