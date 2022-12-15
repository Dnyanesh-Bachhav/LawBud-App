import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../components/constants";
import Categories from "../components/HomeScreen/Categories";
import Header from "../components/HomeScreen/Header";
import Lawyers from "../components/HomeScreen/Lawyers";

function HomeScreen(){
    return(
        <View style={styles.container}>
        <Header/>
        <Text style={styles.textStyle}>Hello, User</Text>
        <Text style={{fontSize: 20,fontWeight: '400',marginLeft: 10}}>Categories</Text>
        <Categories/>
        <Lawyers/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
      },
      textStyle:{
        fontSize: 27,
        fontWeight: '500',
        marginLeft: 10
      }
});

export default HomeScreen;