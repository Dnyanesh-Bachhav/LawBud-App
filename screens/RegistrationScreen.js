import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../components/constants";

function RegistrationScreen(){
    return(
        <View style={styles.container}>
            <Text style={{color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>
            <RegistrationProgress/>
            {/* Registration Screens */}
            {/* <Register/> */}
            {/* <Personal/> */}
            {/* <SkillSets /> */}
            <Documents/>
        </View>
    );
}
function RegistrationProgress(){
    return(
    <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5}} >
        <Text style={{fontSize: 12, color: COLORS.black}}>Register</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Personal</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>SkillSets</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Documents</Text>
    </View>
    );
}
function Register(){
    const [currentOption,setCurrentOption] = useState("user");
    const refRBSheet = useRef();
    return(
        <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }}>
            <Text style={{fontSize: 16,color: COLORS.gray, }}>What describes you best?</Text>
            <View style={{ flexDirection: 'row', borderRadius: 5, padding: 4, marginTop: 5, backgroundColor: COLORS.lightGray }} >
                <TouchableOpacity style={{width: '50%', borderRadius:5, backgroundColor: currentOption === "user" ? COLORS.black : COLORS.lightGray}} onPress={()=>(
                    setCurrentOption("user")
                    )} >
                    <Text style={{color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '50%', borderRadius:5, backgroundColor: currentOption === "lawyer" ? COLORS.black : COLORS.lightGray}} onPress={()=>{
                    setCurrentOption("lawyer")
                }}>
                    <Text style={{color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>Lawyer</Text>
                </TouchableOpacity>
            </View>
            {/* User Data */}
            <InputComponent title={"Email id"} />
            <InputComponent title={"Phone Number"} />
            {/* Button */}
            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity onPress={()=>{
                    refRBSheet.current.open();
                }} ><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Get OTP</Text></TouchableOpacity>
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
    );
}
function SheetComponent(){
    return(
        <View style={{padding: 10}} >
            <InputComponent title={"Enter OTP"} />
            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
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

function Personal(){
    return(

        <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}} >
        <View style={{width: 100,height: 100, backgroundColor: COLORS.grey, borderRadius: 50, alignSelf: 'center' }} >

        </View>
        <InputComponent title={"Name*"} />
        <InputComponent title={"Office/Home Address"} />
        <InputComponent title={"Office Phone Number"} />

        <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
        </View>

        
    </View>
        );
}
function SkillSets(){
    return(
        <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}}>
            <Text style={{color: COLORS.gray}}>Select Your Specialization</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} placeholder={"Search and select your skillset"} />
            <View style={{flexDirection: 'row', marginTop: 4, height: 200 }} >
            <TouchableOpacity style={{backgroundColor: COLORS.black, borderRadius: 5, marginLeft: 4, paddingVertical: 2, paddingHorizontal: 5, height: 25 }} ><Text style={{color: COLORS.white}}>Notary</Text></TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: COLORS.black, borderRadius: 5, marginLeft: 4, paddingVertical: 2, paddingHorizontal: 5, height: 25 }} ><Text style={{color: COLORS.white}}>Robbery</Text></TouchableOpacity>

            </View>

            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
        </View>
    );
}
function Documents(){
    return(
        <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}}>
            <Text style={{fontSize: 16,color: COLORS.gray, }}>What describes you best?</Text>
            <Text style={{color: COLORS.gray}}>Degree Certificate*</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
            <Text style={{color: COLORS.gray}}>Bar Membership*</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
            <InputComponent title={"Sanat Number"} />
            <InputComponent title={"Work Experience(in years)"} />
            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    
    btn:{
        backgroundColor: COLORS.white,
    },
    inputStyle:{
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4

    }
});
export default RegistrationScreen;