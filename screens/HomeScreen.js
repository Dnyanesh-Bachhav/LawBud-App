import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { COLORS } from "../components/constants";
import Categories from "../components/HomeScreen/Categories";
import Header from "../components/HomeScreen/Header";
import Lawyers from "../components/HomeScreen/Lawyers";
import { getLawyersData } from "../Services/requests";

function HomeScreen(){
  const[lawyersData,setLawyersData] = useState([]);
  const[loading,setLoading] = useState(false);
  async function getLawyersData1(){
    if(loading)
        {
            return;
        }
        setLoading(true);
    const lawyersArray = await getLawyersData();
    console.log("In a file:"+lawyersArray);
    setLawyersData(lawyersArray.filter(( item )=>{
        console.log(item.userType);
        return item.userType === "lawyer";
    }));
    setLoading(false);
}
useEffect(()=>{
    getLawyersData1();
},[]);
    return(
      <SafeAreaView style={styles.container}>
        {
          !loading ? <Header lawyersData={lawyersData} /> : <ActivityIndicator size={"small"} color={COLORS.black} />
        }
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