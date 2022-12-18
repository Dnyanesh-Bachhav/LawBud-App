import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { COLORS } from "../components/constants";
import Categories from "../components/HomeScreen/Categories";
import Header from "../components/HomeScreen/Header";
import Lawyers from "../components/HomeScreen/Lawyers";

function HomeScreen(){
    return(
      <SafeAreaView style={styles.container}>
          <Header/>
          <ScrollView>
            <Text style={styles.textStyle}>Hello, User</Text>
            <Text style={{fontSize: 20,fontWeight: '400',marginLeft: 10}}>Categories</Text>
            <Categories/>
            <Lawyers/>
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
      },
      textStyle:{
        fontSize: 27,
        paddingVertical: 10,
        fontWeight: '500',
        marginLeft: 10
      }
});

export default HomeScreen;