import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { COLORS } from "../constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import axios from "axios";

function Reviews({ reviews, userId, currentUserData }) {
    console.log(reviews);
    const [review, setReview] = useState();
    const [ reviewsArray, setReviewsarray ] = useState([]);
    const [ loading, setLoading ] = useState(false);
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
            // reviews.push(msg);
            getReviews();
        })


    }


    async function getReviews(){
        setLoading(true);
        const response = await axios.get(`https://lawbud-backend.onrender.com/user/getReview/${userId}`);
        console.log( "Response: " + JSON.stringify(response.data));
        let reviews = response.data;
        console.log(reviews.data);
        setReviewsarray(reviews.data);
        setLoading(false);
    }

    useEffect(()=>{
        getReviews();
    },[]);

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
                loading && <ActivityIndicator size={"small"} color={COLORS.black} />
            }
            {
                reviewsArray.length == 0 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }} >No Reviews...</Text></View> : null
            }
            {
                reviewsArray &&
                <FlatList
                data={ reviewsArray }
                        renderItem={({ item, index }) => (
                            <>
                            {
                                item.hasOwnProperty("review_msg") ?
                                <View style={{ marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <View style={{ width: 50, height: 50, backgroundColor: COLORS.grey, borderRadius: 50 }}></View>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Username</Text>
                                </View>
                                <Text style={{ color: COLORS.gray, marginLeft: 5, }} >{item.review_msg}</Text>
                                </View> : null
                            }
                            </>
                        )}
                        inverted={true}
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