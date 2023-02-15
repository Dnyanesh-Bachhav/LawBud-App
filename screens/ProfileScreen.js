import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import Header from '../components/Header';
import image1 from '../assets/default_user.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { Octicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from "react";
import { AuthContext } from "../components/Context";

function ProfileScreen(){
    const [image, setImage] = useState(null);
    const { signOut } = useContext(AuthContext);
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
        setImage(result.assets[0].uri);
      }
    };
    return(
        <View style={styles.container}>
            <Header headerText={"My Account"} />
            <View style={{ width: 100, height: 100, backgroundColor: COLORS.grey, borderRadius: 50, marginTop: 10, alignSelf: 'center',flexDirection: 'row', alignSelf: 'center', }} >
                    <View style={{width: '100%', height: '100%', borderRadius: 50, overflow: 'hidden' }}  >
                    { image!=null ? <Image
                    source={{ uri: image }}
                    style={styles.imageStyle}
                    /> : <Image
                    source={image1}
                    style={styles.imageStyle} 
                    /> }
                    </View>
                    <TouchableOpacity style={styles.badgeStyle} onPress={pickImage}>
                        <View>
                            <MaterialIcons name="edit" size={24} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
            
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
            <Logout_Button signOut={signOut} />
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

function Logout_Button({signOut}){
    return(
        <TouchableOpacity style={styles.report_btn} onPress={()=>{
            signOut();
        }} >
            <Text> Logout </Text>
        </TouchableOpacity>
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
    imageStyle:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
});
export default ProfileScreen;