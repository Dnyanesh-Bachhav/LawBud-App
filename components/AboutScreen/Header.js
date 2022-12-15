import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
function Header() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack();
            }} >
            <FontAwesome name="bars" size={24} color={COLORS.white} style={{marginLeft: 10}} />
            <Text>About</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        paddingRight: 16,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputStyle: {
        borderWidth: 1,
        padding: 4,
        color: COLORS.white,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
    }
})
export default Header;