import { StyleSheet, Text, View } from "react-native";

function RegistrationScreen(){
    return(
        <View style={styles.container}>
            <Text>Hello Registration Screen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
});
export default RegistrationScreen;