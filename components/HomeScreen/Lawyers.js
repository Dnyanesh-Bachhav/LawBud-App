import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import image1 from "../../assets/image.jpg";
import { COLORS, LAWYERS } from "../constants";
import { useNavigation } from "@react-navigation/native";

function Lawyers() {
    return (
        <View style={{ flex: 1, marginTop: 10 }} >
            <FlatList
                data={LAWYERS}
                style={styles.listStyle}
                renderItem={({ item, index }) => (
                    <Card name={item.name} type={item.type} languages={item.languages} experience={item.experience} key={index} />
                    )}
                    keyExtractor={({ item, index }) => index}
                    />
        </View>
    );
}
function Card({ name, type, languages, experience }) {
    const navigation = useNavigation();
    console.log(experience);
    return (
        <View style={{ borderWidth: 1, borderRadius: 7, marginBottom: 10, marginRight: 10, overflow: 'hidden' }} >
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
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
const styles = StyleSheet.create({
    imgStyle: {
        width: 80,
        height: 110,
        // borderWidth: 5,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    listStyle: {
        marginLeft: 10
    }
})
export default Lawyers;