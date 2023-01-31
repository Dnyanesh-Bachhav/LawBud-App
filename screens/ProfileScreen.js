import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import Header from '../components/Header';
import image1 from '../assets/image.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { Octicons } from '@expo/vector-icons';

function ProfileScreen(){
    return(
        <View style={styles.container}>
            <Header headerText={"My Account"} />
            <View style={styles.imgContainer}>
                <Image
                    source={image1}
                    style={styles.imgStyle} 
                    />
                <View style={styles.badgeStyle}><MaterialIcons name="edit" size={24} color={COLORS.white} /></View>
            </View>
            <ScrollView>
                <Field name="Name" />
                <Field name="Contact" />
                <Text style={{paddingHorizontal: 15,marginTop: 10}} >Email</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10 }} >
                    <TextInput
                        style={{...styles.inputStyle, width: '90%' }}
                        cursorColor={COLORS.gray}
                    />
                    <TouchableOpacity style={{ backgroundColor: COLORS.lightGray, marginLeft: 5, padding: 2, borderRadius: 50 }} >
                        <Octicons name="unverified" size={21} color={COLORS.yellow} style={{alignSelf: 'flex-end' }} />
                    </TouchableOpacity>
                </View>
                <Field name="Home Address" />
                <Field name="Profession" />
            </ScrollView>
            <Logout_Button />
        </View>
    );
}
function Field({name}){
    return(
        <View style={styles.fieldContainer}>
            <Text>{name}</Text>
            <TextInput
                style={styles.inputStyle}
                cursorColor={COLORS.gray}
            />
        </View>
    );
}

function Logout_Button(){
    return(
        <View style={styles.report_btn}>
            <Text> Logout </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    
    imgContainer:{
        flexDirection: 'row',
        alignSelf: 'center',
    },
    imgStyle:{
        width: 120,
        height: 120,
        borderRadius: 100,
        marginTop: 10

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
        borderRadius: 4,
        paddingLeft: 5
    },
    fieldContainer:{
        paddingHorizontal: 15,
        marginTop: 10
    },
    report_btn:{
        marginTop: 10,
        paddingVertical: 10,
        width: '90%',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#f8fafc",
        borderColor: COLORS.red,
        borderWidth: 1,
        borderRadius: 5,
    },
});
export default ProfileScreen;