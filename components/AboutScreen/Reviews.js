import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

function Reviews(){
    return(
        <View style={styles.container}>
            <Text style={{ marginBottom: 10 }} >Reviews</Text>
            <View style={{flexDirection: 'row', alignItems: 'center' }} >
                <View style={{width: 50,height: 50,backgroundColor: COLORS.grey, borderRadius: 50}}></View>
                <TextInput
                placeholder=" Write a review "
                style={{ width: '70%',paddingHorizontal: 10, marginLeft: 10, backgroundColor: COLORS.lightGray }} />
                <MaterialCommunityIcons name="send" size={24} color="black" style={{marginLeft: 10}} />
            </View>
            <View style={{marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, }} >
                <View style={{flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{width: 50,height: 50,backgroundColor: COLORS.grey, borderRadius: 50}}></View>
                    <Text style={{marginLeft: 10, fontWeight: 'bold' }}>Username</Text>
                </View>
                <Text style={{color: COLORS.gray, marginLeft: 5, }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, illo.</Text>
            </View>
            <View style={{marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, }} >
                <View style={{flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{width: 50,height: 50,backgroundColor: COLORS.grey, borderRadius: 50}}></View>
                    <Text style={{marginLeft: 10, fontWeight: 'bold' }}>Username</Text>
                </View>
                <Text style={{color: COLORS.gray, marginLeft: 5, }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, illo.</Text>
            </View>
            <View style={{marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, }} >
                <View style={{flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{width: 50,height: 50,backgroundColor: COLORS.grey, borderRadius: 50}}></View>
                    <Text style={{marginLeft: 10, fontWeight: 'bold' }}>Username</Text>
                </View>
                <Text style={{color: COLORS.gray, marginLeft: 5, }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, illo.</Text>
            </View>
            <TouchableOpacity>
                <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10, borderRadius: 5, width: '70%', backgroundColor: COLORS.lightGray }} >
                    <Text>See More</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </View>        
    );
}
const styles = StyleSheet.create({
    container:{
        padding: 5,
    }
})

export default Reviews;