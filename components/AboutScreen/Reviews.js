import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { COLORS } from "../constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import axios from "axios";

function Reviews({ reviews, userId, currentUserData }) {
    console.log(reviews);
    const [review, setReview] = useState();
    async function handleSubmit() {
        let msg =
        {
            "reviewer": currentUserData[0].user_id,
            "reviewed_on": userId,
            "review_msg": review,
            "rating": 5,
        }
        console.log(msg);
        axios.post("https://lawbud-backend.onrender.com/user/addReview/", msg).then((response)=>{
            reviews.push(msg);
        })


    }
    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 10 }} >Reviews</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <View style={{ width: 50, height: 50, backgroundColor: COLORS.grey, borderRadius: 50 }}></View>
                <TextInput
                    placeholder=" Write a review "
                    style={{ width: '70%', paddingHorizontal: 10, marginLeft: 10, backgroundColor: COLORS.lightGray }} onChangeText={(data) => {
                        setReview(data);
                    }} />
                <TouchableOpacity onPress={handleSubmit}>
                    <MaterialCommunityIcons name="send" size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>


            {
                reviews.length == 0 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }} >No Reviews...</Text></View> :

                    <FlatList
                        data={reviews}
                        renderItem={({ item, index }) => (
                            <View style={{ marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <View style={{ width: 50, height: 50, backgroundColor: COLORS.grey, borderRadius: 50 }}></View>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Username</Text>
                                </View>
                                <Text style={{ color: COLORS.gray, marginLeft: 5, }} >{item.review_msg}</Text>
                            </View>
                        )}
                        keyExtractor={({ item, index }) => index}
                    />

            }
            {
                reviews.length > 1 ?
                    <TouchableOpacity>
                        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10, borderRadius: 5, width: '70%', backgroundColor: COLORS.lightGray }} >
                            <Text>See More</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                        </View>
                    </TouchableOpacity> : null
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
    }
})

export default Reviews;