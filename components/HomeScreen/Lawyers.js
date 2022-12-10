import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import image1 from "../../assets/image.jpg";
import { COLORS, LAWYERS } from "../constants";

function Lawyers(){
    return(
        <View style={{flex: 1,marginTop: 10 }} >
            <FlatList
            data={LAWYERS}
            style={styles.listStyle}
            renderItem={({item,index})=>(
                <Card name={item.name} type={item.type} languages={item.languages} experience={item.experience} key={index} />
            )}
            keyExtractor={({item,index})=>index}
            />
        </View>
    );
}
function Card({name,type,languages,experience}){
    console.log(experience);
    return(
        <View style={{ flexDirection: 'row', borderWidth: 1,borderRadius: 7,  marginBottom: 10,marginRight: 10, overflow:'hidden' }} >
            <Image
            source={image1}
            style={styles.imgStyle}
            />
            <View style={{ flex:1, marginLeft: 10}} >
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginRight: 10 }} >
                    <Text style={{fontSize: 16, fontWeight: '500'}} >{name}</Text>
                    <AntDesign name="hearto" size={24} color={COLORS.black} />
                </View>
                <Text style={{color: COLORS.gray }} >{type}</Text>
                <Text style={{color: COLORS.gray }} >{languages.map((item)=>item+", ")}</Text>
                <View style={{flexDirection: 'row',justifyContent: 'space-between'}} >
                <Text style={{color: COLORS.gray }} >Exp: {experience}</Text>
                <View style={{flexDirection: 'row'}} >
                <AntDesign name="staro" size={24} color="black" />
                <AntDesign name="staro" size={24} color="black" />
                <AntDesign name="staro" size={24} color="black" />
                <AntDesign name="staro" size={24} color="black" />
                <AntDesign name="staro" size={24} color="black" />
                </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    imgStyle:{
        width: 80,
        height: 110,
        // borderWidth: 5,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    listStyle:{
        marginLeft: 10
    }
})
export default Lawyers;