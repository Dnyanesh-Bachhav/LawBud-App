import { Text, View, StyleSheet, TouchableOpacity, ProgressBarAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../constants";
function Ratings(){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Ratings</Text>
                <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={styles.ratingText}>4.69</Text>
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color="black" /></TouchableOpacity>
                    </View>
                    <Text>420 reviews</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <View style={styles.barStyle}><Text>1</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} color={COLORS.blue} style={{width:'80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>2</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} color={COLORS.blue} style={{width:'80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>3</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} color={COLORS.blue} style={{width:'80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>4</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} color={COLORS.blue} style={{width:'80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>5</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.5} color={COLORS.blue} style={{width:'80%', marginLeft: 10 }} /></View>
                </View>
                
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        padding: 5,
        width: '100%',
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText:{
        fontSize: 40,
        color: COLORS.gray,
    }
});
export default Ratings;