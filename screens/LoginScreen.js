import { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from 'yup';
const LoginSchema = Yup.object().shape({
    phone: Yup.string().min(10,"Must be exactly 10 digits").max(10,"Must be exactly 10 digits").matches(/^[0-9]+$/,"Must be only digits").required("Please enter your mobile number")
});
const LoginOTPSchema = Yup.object().shape({
    otp: Yup.string().min(4,"Must be exactly 4 digits").max(4,"Must be exactly 4 digits").matches(/^[0-9]+$/,"Must be only digits").required("Please enter your OTP")
  });


function LoginScreen(){
    const refRBSheet = useRef();
    const navigation = useNavigation();
    let[userType,setUserType] = useState("user");
    return(
        <View style={styles.container}>
            <Text style={{color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Login</Text>
            <View style={{ flexDirection: 'row', borderRadius: 5, padding: 4, marginTop: 5, backgroundColor: COLORS.lightGray }} >
                <TouchableOpacity style={{width: '50%', borderRadius:5, backgroundColor: userType === "user" ? COLORS.black : COLORS.lightGray}} onPress={()=>{
                    setUserType("user");
                }} >
                    <Text style={{color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '50%', borderRadius:5, backgroundColor: userType === "lawyer" ? COLORS.black : COLORS.lightGray}} onPress={()=>{
                    setUserType("lawyer");
                }}>
                    <Text style={{color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>Lawyer</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }}>
            
            {/* User Data */}
            <Formik initialValues={{
                phone: ''
            }}
            validationSchema={LoginSchema}
            >
                {({values,errors,touched, handleChange, setFieldTouched, isValid,  handleSubmit})=>(
            <>
            <View style={{marginTop: 10}} >
            <Text style={{color: COLORS.gray}}>Phone Number</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.phone} onChangeText={handleChange('phone')} onBlur={() =>  setFieldTouched('phone')} />
            { touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
            )}
        </View>
                {/* Button */}
                    <TouchableOpacity onPress={()=>{
                        refRBSheet.current.open();
                    }} disabled={!isValid} style={{backgroundColor: isValid ? COLORS.black : COLORS.grey,marginTop: 10, borderRadius: 4 }} ><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Send OTP</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{color:COLORS.gray}} >Dont have an account?</Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("Register");
                    }} >
                    <Text style={{color:COLORS.gray, marginLeft: 5, textDecorationLine: 'underline' }} >Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </>
                )}
            </Formik>
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
                <SheetComponent navigation={navigation} userType={userType} />
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
function SheetComponent({navigation, userType }){
    return(
        <Formik initialValues={{
            otp: ''
        }} validationSchema={LoginOTPSchema}>
            {({values,errors,touched, handleChange, setFieldTouched, isValid,  handleSubmit})=>(
        <View style={{ paddingVertical: 20, paddingHorizontal: 40 }}>
            <View style={{ marginTop: 10 }} >
                <Text style={{ color: COLORS.gray }}>Enter OTP</Text>
                <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.otp} onChangeText={handleChange('otp')} onBlur={() =>  setFieldTouched('otp')} />
                { touched.otp && errors.otp && (
                <Text style={styles.errorText}>{errors.otp}</Text>
            )}
            </View>
            <TouchableOpacity disabled={!isValid} style={{backgroundColor: isValid ? COLORS.black : COLORS.grey,marginTop: 10, borderRadius: 4 }} onPress={()=>{
                if(userType=="user")
                {
                    navigation.navigate("Home");
                }
                else{
                    navigation.navigate("LawyersDashboard");
                }
            }} ><Text style={{color: COLORS.white, padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
        </View>
            )}
        </Formik>
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

    },

    errorText: {
        color: COLORS.red,
    }
})
export default LoginScreen;