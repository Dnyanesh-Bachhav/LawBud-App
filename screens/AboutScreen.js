import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Header from "../components/AboutScreen/Header";

import image1 from "../assets/image.jpg";
import { COLORS } from "../components/constants";

function AboutScreen({ route }){
    return(
        <View style={{flex:1}}>
            <Header/>
            <View style={styles.container}>
                <Card name={ route.params.name } type={ route.params.type } languages={ route.params.languages } experience={ route.params.experience } />
                <View  style={styles.textStyle}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, provident pariatur dolorum quidem nihil, quaerat voluptatibus nam adipisci consectetur repellendus, facilis excepturi? Aliquam assumenda enim quia laboriosam. Quam, temporibus perspiciatis?</Text>
                </View>
                <Report_Button/>
            </View>
        </View>
    );
}

function Card({ name, type, languages, experience }) {
    const navigation = useNavigation();
    console.log(experience);
    return (
        <View style={{ borderWidth: 1, borderRadius: 7, marginBottom: 10,overflow: 'hidden' }} >
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                navigation.navigate('About');
            }} >

            <Image
                source={image1}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10 }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10,marginTop: 5 }} >
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{name}</Text>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={21} color={COLORS.black} />
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
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    imgStyle: {
        width: 80,
        height: 110,
        // borderWidth: 5,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    textStyle:{
        elevation:10,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        padding: 5
    },
    report_btn:{
        marginTop: 10,
        paddingVertical: 10,
        alignItems: 'center',
        borderColor: COLORS.red,
        borderWidth: 1,

    }
});

export default AboutScreen;