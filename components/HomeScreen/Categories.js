import { Text, View, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { CATEGORIES, COLORS } from "../constants";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { getLawyersCategories } from "../../Services/requests";
const CARD_WIDTH = Dimensions.get("window").width / 4.6;
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
        console.log("Data1: " + JSON.stringify(lawyersCategoriesData));
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
                    style={{ flexWrap: "wrap" }}
                    columnWrapperStyle={{ alignContent: 'center', }}
                    renderItem={({ item, index }) => (
                        <Card name={item.name||"HI"} key={index} />
                        // <Text style={{fontSize: 200}} >Hi{item.name}</Text>
                    )}
                    keyExtractor={(item, index) => index}
                />)
            }
            <View style={{ flexDirection: 'row', backgroundColor: '#cbd5e1', alignItems: 'center', width: '50%', alignSelf: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.gray, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 5, marginTop: 15 }} >
                <TouchableOpacity style={{ flexDirection: 'row' }} >
                    <Text>See More</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>

        </View>
    );
}
function Card({ name }) {
    return (
        <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 10, marginTop: 10, width: 80 }} >
            <View style={{ width: CARD_WIDTH, height: CARD_WIDTH, borderRadius: 50, backgroundColor: COLORS.gray, }} >

            </View>
            <Text numberOfLines={2} >{name || "HI" }</Text>
        </View>
    );
}
export default Categories;