import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "./constants";
import { AuthContext } from "./context";
import * as Linking from 'expo-linking';
import { loginContext } from "./context1";

function CustomDrawer(props) {
   const { signOut } = useContext(loginContext);
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: COLORS.secondary }}>
                
                <View style={styles.listContainer}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                    label={"Contact us"}
                    onPress={()=>{
                        Linking.openURL('mailto:lawbud@support.com?subject=Write your Subject&body=Description')
                    }}
                    />
                    <View style={{ marginLeft: 18, marginTop: 4 }}>
                        <TouchableOpacity onPress={()=>{
                            signOut();
                        }} >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
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