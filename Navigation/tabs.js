import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../components/constants";
import ChatStack from "../Stacks/ChatStack";
import FavouriteStack from "../Stacks/FavouriteStack";
import HomeStack from "../Stacks/HomeStack";
import NewsStack from "../Stacks/NewsStack";

const Tab = createBottomTabNavigator();
function Tabs(){
    return(
        <Tab.Navigator
        screenOptions={{
            "tabBarShowLabel": false,
            "tabBarStyle" : { backgroundColor: COLORS.black },
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
                        <Image source={require("../assets/Home.png")} style={{
                            tintColor: focused ? COLORS.grey : COLORS.black,
                            ...styles.imgStyle}}/>
                    </View>
                )
            }} />
            <Tab.Screen name="ChatScreen" component={ChatStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                        <Image source={require("../assets/messenger.png")} style={{
                            tintColor: focused ? COLORS.grey : COLORS.black,
                            ...styles.imgStyle}}/>
                    </View>
                )
            }} />
            <Tab.Screen name="NewsScreen" component={NewsStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                        <Image source={require("../assets/book.png")} style={{
                            tintColor: focused ? COLORS.grey : COLORS.black,
                            ...styles.imgStyle}}/>
                    </View>
                )
            }} />
            <Tab.Screen name="FavouriteScreen" component={FavouriteStack} options={{
                headerShown: false,
                tabBarIcon: ({focused})=>(
                    <View style={styles.tabOption}>
                        <Image source={require("../assets/heart.png")} style={{
                            tintColor: focused ? COLORS.grey : COLORS.black,
                            ...styles.imgStyle}}/>
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