import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useState } from "react";
function DocumentsScreen({route}){
    
    const navigation = useNavigation();
    let[itemsArray,setItemsArray] = useState([]);
    var itemsArray1 = [];
    return(
        <View style={styles.container}>
        <Text style={{color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>
        <RegistrationProgress userType={ route.params.userType} />
        <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}}>
            <Text style={{fontSize: 16,color: COLORS.gray, }}>What describes you best?</Text>
            <Text style={{color: COLORS.gray}}>Degree Certificate*</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
            <Text style={{color: COLORS.gray}}>Bar Membership*</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
            <InputComponent title={"Sanat Number*"} />
            <InputComponent title={"Work Experience(in years)"} />
            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Home");
                }} ><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
        </View>
        </View>
        );
}
function RegistrationProgress({userType}){
    return(
        
    <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-around', borderRadius: 5}} >
        {
            userType === "lawyer" ?
            <>
        <Text style={{fontSize: 12, color: COLORS.black}}>Register</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Personal</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>SkillSets</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Documents</Text>
            </>
            : 
            <>
        <Text style={{fontSize: 12, color: COLORS.black}}>Register</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Personal</Text>    
            </>
        }
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
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    badgeStyle:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        padding: 5
    },
    inputStyle:{
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4
    },
})
export default DocumentsScreen;