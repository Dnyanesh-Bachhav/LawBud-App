import { Text, View, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { CATEGORIES, COLORS } from "../constants";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { getLawyersCategories } from "../../Services/requests";
const CARD_WIDTH = Dimensions.get("window").width / 4.8;
const CARD_HEIGHT = Dimensions.get("window").height / 4;
function Categories() {
    const [lawyersCategoriesData, setLawyersCategoriesData] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getLawyersCategoriesData1() {
        if (loading) {
            return;
        }
        setLoading(true);
        const response = await getLawyersCategories();
        setLawyersCategoriesData(response.data);
        // console.log("Data: " + JSON.stringify(lawyersCategoriesData));
        setLoading(false);
    }


    useEffect(() => {
        getLawyersCategoriesData1();
        // console.log("Data1: " + JSON.stringify(lawyersCategoriesData));
    }, []);
    return (
        <View>
            {
                loading && <ActivityIndicator size={"small"} color={COLORS.black} />
            }
            {lawyersCategoriesData && (
                <FlatList
                    data={lawyersCategoriesData}
                    numColumns={4}
                    style={{ flexWrap: "wrap", alignSelf: 'center' }}
                    columnWrapperStyle={{ alignContent: 'center', }}
                    renderItem={({ item, index }) => (
                        <Card name={item.name||"HI"} key={index} />
                    )}
                    keyExtractor={(item, index) => index}
                />)
            }
                 <TouchableOpacity style={{ padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10, borderRadius: 5, width: '30%', backgroundColor: COLORS.lightGray }} >
                 
                            <Text>See More</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                         
                </TouchableOpacity>
 
        </View>
    );
}
function Card({ name, key }) {
    return (
        <View style={{ position: 'relative',  top: 0, marginLeft: 10, marginTop: 16, width: 80 }} key={key}>
            <View style={{ width: CARD_WIDTH, height: CARD_WIDTH, borderRadius: 50, backgroundColor: COLORS.gray, }} >

            </View>
            <Text numberOfLines={2} style={{ fontSize: 14, textAlign: 'center' }} >{name || "HI" }</Text>
        </View>
    );
}
export default Categories;