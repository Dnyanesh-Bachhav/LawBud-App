import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { CHATS_DATA, COLORS } from "../components/constants";
import Header from "../components/Header";
import image1 from "../assets/image.jpg";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "../firebase";

function ChatsListScreen(){
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const collectionRef = collection(firestore,"users");
        const q = query(collectionRef, ref => ref.orderBy("createdAt","desc"));
        let unsubscribe = onSnapshot(q,snapshot=>{
            setUsers(
                snapshot.docs.map(doc=>({
                    _id: doc.id,
                    ...doc.data()
                }))
            );
        });
        console.log(users);

        return ()=> unsubscribe();
    },[]);
    return(
        <View>
            <Header headerText={"Chats"} />
            <FlatList
                data={users}
                style={styles.listStyle}
                renderItem={({ item, index }) => (
                    <Card name={item.name} description={item.description} profile_image={item.profile_image} contact={item.contact} isOnline={item?.isOnline || true } key={index} />
                    // <Text>{item._id}</Text>
                    )
                }
                keyExtractor={({ item, index }) => index}
            />
        </View>
    );
}
function Card({ name, description, contact, isOnline, profile_image }) {
    const navigation = useNavigation();
    return (
        <View style={{elevation: 2, borderRadius: 7, marginTop: 10, marginRight: 10, marginLeft: 10, overflow: 'hidden' }} >
            <View style={{  justifyContent: 'center', backgroundColor: COLORS.white}} >
                
            
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                // navigation.navigate('About',{
                //     name,
                //     type,
                //     languages,
                //     experience
                // });
                navigation.navigate("Chat",{
                    imgSrc: profile_image,
                    name: name,
                    contact: contact,

                })
            }} >

            <Image
                source={{
                    uri: profile_image
                }}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }} >
                    <Text style={{ fontSize: 20, fontWeight: '500' }} >{name}</Text>
                    <View style={{ width: 16, height: 16, backgroundColor: COLORS.black, borderRadius: 50, marginLeft: 8, backgroundColor: COLORS.success }} ></View>
                </View>
                <Text style={{ color: COLORS.gray }} >{description || "Aap nischint rahiye" }</Text>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imgStyle: {
        width: 80,
        height: 80,
        // borderWidth: 5,
        aspectRatio: 1/1,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
})
export default ChatsListScreen;