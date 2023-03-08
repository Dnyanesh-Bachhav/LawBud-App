import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "./constants";
import { AuthContext } from "./context";
import * as Linking from 'expo-linking';
import { loginContext } from "./context1";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendGridEmail } from "react-native-sendgrid";

function CustomDrawer(props) {
    const { signOut } = useContext(loginContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [ currentUserData, setCurrentUserData ] = useState(null);
    async function getData(){
        let data = await AsyncStorage.getItem("currentUserData");
        setCurrentUserData( JSON.parse(data));
        console.log(data);
    }
    async function sendMail(){
        
        const TO_MAIL = "dnyaneshbachhav.dev@gmail.com";
        const FROM_MAIL = "dnyaneshbachhav.dev@gmail.com";
        const SUBJECT = "Hello there...";
        const CONTACT_DETAILS = "name"+currentUserData[0].name;
        const sendRequest = sendGridEmail(process.env.SEND_GRID_API_KEY, TO_MAIL, FROM_MAIL, SUBJECT, CONTACT_DETAILS)
	        sendRequest.then((response) => {
	            console.log(response+"Success")
	        }).catch((error) =>{
	            console.log(error)
	        });
    }
    useEffect(()=>{
        getData();

    },[]);
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => {
                            setModalVisible(!modalVisible);
                        }} >
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>

                        {/* <Text>Hello World...!!!</Text> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Please leave a feedback</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                                <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                                <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                                <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                                <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                            </View>
                            <Text style={{ marginTop: 5 }} >You can leave a written feedback here</Text>
                        </View>
                        <TextInput cursorColor={COLORS.gray} numberOfLines={5} style={styles.inputStyle} />
                        <TouchableOpacity style={{ backgroundColor: COLORS.black, marginTop: 10, borderRadius: 4 }} onPress={sendMail}>
                            <Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} >Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: COLORS.secondary }}>

                <View style={styles.listContainer}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label={"Feedback"}
                        onPress={() => {
                            setModalVisible(true);

                        }}
                    />
                    <DrawerItem
                        label={"Contact us"}
                        onPress={() => {
                            Linking.openURL('mailto:lawbud@support.com?subject=Write your Subject&body=Description')
                        }}
                    />
                    <View style={{ marginLeft: 18, marginTop: 4 }}>
                        <TouchableOpacity onPress={() => {
                            signOut();
                        }} >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>

        </View>

    );
}

function ModalComponent() {
    return (
        <View style={styles.modalContainer}>
            <Modal>
                <View>
                    <Text>Hello World...!!!</Text>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        backgroundColor: COLORS.white,
        width: '80%',
        elevation: 5,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',


    },
    inputStyle: {
        borderWidth: 1,
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
        width: '100%',
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.lightGray,
    },
    userInfo: {
        padding: 10,
    },
    listContainer: {
        backgroundColor: COLORS.white,
    },
    bottomContainer: {
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        padding: 16
    },
    bottomListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    }
})
export default CustomDrawer;