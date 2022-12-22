import { Text, View, StyleSheet } from "react-native";
import Header from "../components/Header";

function FavouritesScreen(){
    return(
        <View style={styles.container}>
            <Header headerText={"Favourites"} />
            <Text> Favourites Screen... </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
});
export default FavouritesScreen;