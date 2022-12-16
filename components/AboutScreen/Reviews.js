import { Text, View, StyleSheet } from "react-native";

function Reviews(){
    return(
        <View style={styles.container}>
            <Text>Reviews</Text>
        </View>        
    );
}
const styles = StyleSheet.create({
    container:{
        padding: 5,
    }
})

export default Reviews;