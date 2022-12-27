import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "./constants";

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