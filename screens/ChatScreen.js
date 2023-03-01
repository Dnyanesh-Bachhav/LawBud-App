import { Text, View, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Image, Alert } from "react-native";
import Header from "../components/ChatScreen/Header";
import { COLORS } from "../components/constants";
import { Feather } from '@expo/vector-icons';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { useCallback, useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { useLayoutEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';
// Chat Screen
function ChatScreen({ route }) {
    const [currentUser, setCurrentUser] = useState(route.params.currentUser);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [imageUrl,setImageUrl] = useState(null);
    const data = [
        { label: 'Report', value: '1' },
        { label: 'Block', value: '2' },
        // { label: 'Item 3', value: '3' },
        // { label: 'Item 4', value: '4' },
        // { label: 'Item 5', value: '5' },
        // { label: 'Item 6', value: '6' },
        // { label: 'Item 7', value: '7' },
        // { label: 'Item 8', value: '8' },
      ];
    const onSend = useCallback(async (messages = []) => {
        console.log(messages);
        const myMsg = {
            ...messages[0],
            image: imageUrl,
            // _id: route.params.currentUser[0].contact,
            // user:{
            //     _id: route.params.currentUser[0].contact
            // },
            sentBy: currentUser[0].contact,
            sentTo: route.params.contact,
            createdAt: new Date()
        }
        console.log(myMsg);
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
        const docId = currentUser[0].contact > route.params.contact ? String(currentUser[0].contact) + "-" + String(route.params.contact) : String(route.params.contact) + "-" + String(currentUser[0].contact)
        const db = getFirestore();
        const docRef = doc(db, "chatrooms", docId);
        // console.log("DOCID:"+currentUser[0]._id);
        const msgRef = collection(docRef, "messages");
        addDoc(msgRef, {
            ...myMsg,
            // createdAt: serverTimestamp()
        }).then(() => {
            console.log("Data added...");
        }).catch((e) => {
            console.log("Error: " + e);
        });
        // addDoc(collection(db,"chatrooms/messages"),{
        //     ...data,
        //     _id: uuidv4(),
        //     createdAt: new Date()
        //   });
    }, []);

    async function getUserData() {
        setLoading(true);
        const currentUser = await AsyncStorage.getItem("currentUserData");
        // console.log(currentUser);
        let arr = JSON.parse(currentUser);
        setCurrentUser(JSON.parse(currentUser));
        setLoading(false);
        // console.log("Current User: " + currentUser[0]._id);

    }
    async function loadChats() {
        const docId = currentUser[0].contact > route.params.contact ? String(currentUser[0].contact) + "-" + String(route.params.contact) : String(route.params.contact) + "-" + String(currentUser[0].contact)
        const db = getFirestore();
        const docRef = doc(db, "chatrooms", docId);
        // console.log("DOCID:"+currentUser[0]._id);
        const msgRef = collection(docRef, "messages");
        // const collectionRef = collection(firestore,"users");
        const q = query(msgRef, orderBy("createdAt", "desc"));
        // const allMessages1 = await getDocs(msgRef);
        // allMessages1.forEach(doc1=>{
        //     console.log(doc1.id);
        // })
        const unsubscribe = onSnapshot(q, snapshot => {

            let chatdata = snapshot.docs.map(doc => {
                // console.log(doc.data());
                if (doc.exists) {

                    return {

                        _id: doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user,
                    }
                }

            });
            setMessages(chatdata);
            // snapshot.forEach(doc=>{
            //     console.log(doc.id);
            // });
        }, (e) => {
            console.log("Error: " + e);
        });
        return () => {
            unsubscribe();
          };
        // setMessages(allMessages);
        // return ()=> allMessages;
        // console.log("Messages:"+allMessages);
    }

    const renderBubble = (props) => {
        return (

            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.purple,
                        padding: 5,
                        borderRadius: 5,
                        elevation: 2,
                    },
                    left: {
                        backgroundColor: COLORS.white,
                        padding: 5,
                        borderRadius: 5,
                        elevation: 2,
                    }
                }}
                textStyle={{
                    right: {
                        color: COLORS.gray,
                    },
                    left: {
                        color: COLORS.gray,
                    }
                }}

            />
        );
    }
    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name="angle-double-down" size={24} color="black" />
        );
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImageUrl(result.assets[0].uri);
        }
      };
    const renderSend = (props)=>{
        return(
            <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center' }} >
            <TouchableOpacity onPress={()=>{
                // Alert.alert("Image clicked...");
                pickImage();

            }} >
                <Image source={ require("../assets/image_default.png")} style={{width: 24, height: 24 }} />
            </TouchableOpacity>
        
            <Send {...props}>
                <View style={{ marginBottom: 2.5, marginRight: 5, width: 38, aspectRatio: 1, padding: 5, justifyContent: 'center', alignItems: 'center' }} >
                    {/* <Ionicons name="send-sharp" size={20} color="black" /> */}
                    <FontAwesome name="send" size={21} color="black" />
                </View>
            </Send>
        </View>
        );
    }
    useLayoutEffect(() => {
        loadChats();
    }, []);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello World...!!!',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
        // getUserData();
        // loadChats();
    }, []);

    return (
        <View style={styles.container}>
            <Header headerText={route.params.name} imgSrc={route.params.imgSrc} />
            
            {
                loading ? <ActivityIndicator size={"small"} color={COLORS.black} /> :

                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: currentUser[0].contact
                        }}
                        renderBubble={renderBubble}
                        scrollToBottom
                        scrollToBottomComponent={scrollToBottomComponent}
                        renderSend={renderSend}
                        alwaysShowSend={true} 
                        isLoadingEarlier={true}
                        renderLoading={()=>{
                            return(
                                <View>
                                    <ActivityIndicator size={"small"} color={"black"} />
                                </View>
                            );
                        }}
                    // textInputStyle={{
                    //     borderWidth: 1,
                    //     padding: 5,
                    //     borderRadius: 8,
                    //     borderColor: COLORS.grey,
                    // }}
                    />
            }
            
        </View>
    );
}

function SentMessage() {
    return (
        <>
            <View style={styles.sentMsgStyle}>
                <Text style={{ color: COLORS.gray, }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nesciunt deserunt eius ab quo voluptate architecto ipsa ipsam neque, quae dicta nam, ut labore blanditiis similique iste odit sed a?</Text>
            </View>
            <Text style={{ alignSelf: 'flex-end', marginRight: 10, color: COLORS.gray, fontSize: 10 }}>Sent 4:20PM</Text>
        </>
    );
}

function ReceiveMessage() {
    return (
        <>
            <View style={styles.receiveMsgStyle} >
                <Text style={{ color: COLORS.gray, }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam cupiditate vel sit beatae illo id rerum. Ut molestias debitis, culpa ipsa recusandae, excepturi praesentium unde, nihil corrupti dolores accusamus est.</Text>
            </View>
            <Text style={{ alignSelf: 'flex-start', marginLeft: 10, color: COLORS.gray, fontSize: 10 }}>4:22PM</Text>
        </>

    );
}

function InputMessage() {
    return (
        <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: 15 }} >
            <TextInput
                style={styles.inputStyle}
                placeholder="Send a Message."
            />
            <Feather name="mic" size={24} color={COLORS.white} style={{ backgroundColor: COLORS.black, borderRadius: 50, padding: 5, marginLeft: 10 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sentMsgStyle: {
        backgroundColor: COLORS.purple,
        color: COLORS.white,
        padding: 5,
        alignSelf: 'flex-end',
        width: '70%',
        marginRight: 10,
        marginTop: 8,
        borderRadius: 5,
        elevation: 2,
    },
    receiveMsgStyle: {
        backgroundColor: COLORS.white,
        padding: 5,
        alignSelf: 'flex-start',
        width: '70%',
        marginLeft: 10,
        marginTop: 8,
        borderRadius: 5,
        elevation: 2,
    },
    inputStyle: {
        borderWidth: 1,
        padding: 5,
        width: '85%',
        borderRadius: 8,
        borderColor: COLORS.grey,
    },

});
export default ChatScreen;