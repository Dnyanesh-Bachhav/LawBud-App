import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/AboutScreen/Header";
import { Ionicons } from '@expo/vector-icons';
import image1 from "../assets/image.jpg";
import { COLORS } from "../components/constants";
import Ratings from "../components/AboutScreen/Ratings";
import Reviews from "../components/AboutScreen/Reviews";

function AboutScreen({ route }){
    return(
        <SafeAreaView style={{flex:1,backgroundColor: COLORS.lightGray, }}>
            <Header/>
            <ScrollView>

            <View style={styles.container}>
                <Card name={ route.params.name } type={ route.params.type } languages={ route.params.languages } experience={ route.params.experience } />
                <View  style={styles.textStyle}>
                    <Text style={{padding: 12}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, provident pariatur dolorum quidem nihil, quaerat voluptatibus nam adipisci consectetur repellendus, facilis excepturi? Aliquam assumenda enim quia laboriosam. Quam, temporibus perspiciatis?</Text>
                </View>
                <View style={{ backgroundColor: COLORS.white, marginTop: 10, elevation: 2, borderRadius: 5, padding: 12, }} >
                    <Ratings/>
                    <Reviews/>
                </View>
                <Report_Button/>
                <Chat_Button/>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function Card({ name, type, languages, experience }) {
    const navigation = useNavigation();
    console.log(experience);
    return (
        <View style={{elevation: 2, borderRadius: 7, marginBottom: 10, overflow: 'hidden' }} >
            <View style={{flex:1, justifyContent: 'center', backgroundColor: COLORS.white}} >
                
            
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
            // Navigate to Lawyer's AboutScreen 
            navigation.navigate('About',{
                    name,
                    type,
                    languages,
                    experience
                });
            }} >

            <Image
                source={image1}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }} >
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{name}</Text>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={21} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: COLORS.gray }} >{type}</Text>
                <Text style={{ color: COLORS.gray }} >{languages.map((item,index) => 
                {
                    if(index!==languages.length-1){
                        return item + ", "
                    }
                    else{
                        return item;
                    }
                } )}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginRight: 10 }} >
                    <Text style={{ color: COLORS.gray }} >Exp: {experience}</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}

function Report_Button(){
    return(
        <View style={styles.report_btn}>
            <Text> Report Account </Text>
        </View>
    );
}

function Chat_Button(){
    return(
        <View style={styles.chat_btn}>
            <Ionicons name="chatbubble-ellipses" size={24} color={COLORS.blue} />
            <Text style={{ color: COLORS.blue, fontSize: 20, fontWeight: '400', marginLeft: 5}} >Chat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.lightGray
    },
    imgStyle: {
        width: 110,
        height: 110,
        aspectRatio: 1/1,
        // borderWidth: 5,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    textStyle:{
        flex: 1,
        elevation:2,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        borderRadius: 5,
        
    },
    report_btn:{
        marginTop: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: "#f8fafc",
        borderColor: COLORS.red,
        borderWidth: 1,
        borderRadius: 5,
    },
    chat_btn:{
        flexDirection: 'row',
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    }
});

export default AboutScreen;