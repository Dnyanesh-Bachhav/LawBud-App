import { Text, View, StyleSheet } from "react-native";
function Header(){
    return(
        <View style={styles.container}>
            <Text>Hello World...!!!!</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})
export default Header;