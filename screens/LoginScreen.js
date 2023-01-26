import { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";

function LoginScreen(){
    const refRBSheet = useRef();
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Text style={{color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Login</Text>
            <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }}>
            
            {/* User Data */}
            <InputComponent title={"Phone Number"} />
            {/* Button */}
            <View style={{backgroundColor: COLORS.black,marginTop: 16, borderRadius: 4 }} >
                <TouchableOpacity onPress={()=>{
                    refRBSheet.current.open();
                }} ><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Send OTP</Text></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{color:COLORS.gray}} >Dont have an account?</Text>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Register");
                }} >
                <Text style={{color:COLORS.gray, marginLeft: 5, textDecorationLine: 'underline' }} >Sign Up</Text>
                </TouchableOpacity>
            </View>
            {/* Bottom Sheet */}
            <RBSheet
                ref={refRBSheet}
                animationType="none"
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container:{
                        backgroundColor: COLORS.white,
                    },
                wrapper: {
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }                
                }}
            >
                <SheetComponent/>
            </RBSheet>
        </View>
        </View>
    );
}
function InputComponent({title}){
    return(
        <View style={{marginTop: 10}} >
            <Text style={{color: COLORS.gray}}>{title}</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
        </View>
    );
}
function SheetComponent(){
    return(
        <View style={{ paddingVertical: 20, paddingHorizontal: 40 }}>
            <InputComponent title={"Enter OTP"} />
            <View style={{backgroundColor: COLORS.black,marginTop: 25, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white, padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 29,
        justifyContent: 'center',
    },
    inputStyle:{
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4

    }
})
export default LoginScreen;