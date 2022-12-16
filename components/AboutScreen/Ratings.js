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
            <View>
                <View>
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
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barStyle:{
        flexDirection: 'row',
        width: '50%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Ratings;