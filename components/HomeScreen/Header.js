import { Text, View, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../constants";
function Header() {
    return (
        <View style={styles.container}>
            <FontAwesome name="bars" size={24} color={COLORS.white} style={{marginLeft: 10}} />
            <View style={{flexDirection: 'row',alignItems: 'center' }} >
                <TextInput
                    placeholder="Search for lawyers in your area..."
                    placeholderTextColor={COLORS.gray}
                    style={styles.inputStyle} />
                <FontAwesome name="user" size={24} color={COLORS.white} style={{marginLeft: 5}} />
            </View>
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
});
export default Header;