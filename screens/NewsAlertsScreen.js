import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import image1 from "../assets/image.jpg";
import { COLORS, NEWS_ALERTS } from "../components/constants";
import Header from "../components/Header";

function NewsAlertScreen(){
    return(
        <SafeAreaView style={{flex:1,backgroundColor: COLORS.lightGray, }}>
            <Header headerText="News Alerts" />

            <View style={styles.container}>
                <FlatList 
                data={NEWS_ALERTS}
                    renderItem={({item})=>(
                        <Card headline={item.headline} description={item.description} />

                        )}
                        keyExtractor={(item,index)=>index}
                />
                
            </View>
        </SafeAreaView>
    );
}

function Card({ headline, description }) {
    const navigation = useNavigation();
    return (
        <View style={{elevation: 2, borderRadius: 7, marginBottom: 10, overflow: 'hidden' }} >
            <View style={{flex:1, justifyContent: 'center', backgroundColor: COLORS.white}} >
                
            
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
            // Navigate to Lawyer's AboutScreen 
            // navigation.navigate('About',{
                    
            //     });
            }} >

            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', padding: 5 }} >
                <Text style={styles.headingStyle}>{ headline }</Text>
                <Text style={{ color: COLORS.gray, }} >{ description } </Text>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.lightGray
    },
    headingStyle:{
        fontSize: 20,
        fontWeight: '500',
    }

});

export default NewsAlertScreen;