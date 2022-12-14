import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
function Header({headerText, imgSrc }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack();
            }} >
            <AntDesign name="arrowleft" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Image
            source={imgSrc}
            style={styles.imgStyle}
            /> 
            <Text style={{color: COLORS.white,marginLeft: 10, fontSize:16 }}>{ headerText }</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        paddingRight: 16,
        backgroundColor: "#000000",
        alignItems: 'center',
    },
    imgStyle:{
        width: 40,
        height: 40,
        borderRadius: 50
    }
})
export default Header;