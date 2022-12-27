import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "./constants";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import user from "../assets/user.png";
// import * as Sharing from "expo-sharing";
import { Asset, useAssets } from "expo-asset";
// async function handleShare(){
//     //    const isAvailable = await Sharing.isAvailableAsync();

//     if(isAvailable)
//     {
//         // const [asset,error] = useAssets(require("../assets/logo.png"));
//         // console.log(asset);
//         console.log("Sharing is available...");
//         await Sharing.shareAsync({
//             dialogTitle: "Download the app Now...!!!"
//         })
//         // await Sharing.shareAsync("../assets/banner1.png");
//     }
//     else{
//         Alert.alert("Sharing is not available...");
//     }

// }
function CustomDrawer(props) {
   
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: COLORS.secondary }}>
                
                <View style={styles.listContainer}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfo:{
        padding: 10,        
    },
    listContainer: {
        backgroundColor: COLORS.white,
    },
    bottomContainer: {
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        padding: 16
    },
    bottomListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    }
})
export default CustomDrawer;