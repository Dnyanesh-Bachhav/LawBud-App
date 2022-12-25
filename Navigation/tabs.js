import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../components/constants";
import ChatStack from "../Stacks/ChatStack";
import HomeStack from "../Stacks/HomeStack";

const Tab = createBottomTabNavigator();
function Tabs(){
    return(
        <Tab.Navigator
        screenOptions={{
            "tabBarShowLabel": false,
            "tabBarStyle": [
              {
                "display": "flex"
              },
              null
            ]
          }}

        
        >
            <Tab.Screen name="HomeScreen" component={HomeStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                    {/* <TouchableOpacity> */}
                        <Image source={require("../assets/Home.png")} style={{
                            tintColor: focused ? COLORS.primary : COLORS.black,
                            ...styles.imgStyle}}/>
                        <Text style={{color: focused ? COLORS.primary : COLORS.black,}} >Home</Text>
                    {/* </TouchableOpacity> */}
                    </View>
                )
            }} />
            <Tab.Screen name="ChatScreen" component={ChatStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                    {/* <TouchableOpacity> */}
                        <Image source={require("../assets/Home.png")} style={{
                            tintColor: focused ? COLORS.primary : COLORS.black,
                            ...styles.imgStyle}}/>
                        <Text style={{color: focused ? COLORS.primary : COLORS.black,}} >Home</Text>
                    {/* </TouchableOpacity> */}
                    </View>
                )
            }} />
                          
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    imgStyle:{
        width: 24,
        height: 24,
    },
    tabOption:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Tabs;