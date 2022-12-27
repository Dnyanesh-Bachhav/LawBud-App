import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../components/constants";
import AboutScreen from "../screens/AboutScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatsListScreen from "../screens/ChatsListScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import HomeScreen from "../screens/HomeScreen";
import NewsAlertScreen from "../screens/NewsAlertsScreen";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreenStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerStack(){
  return(
    <Drawer.Navigator initialRouteName="Home1" drawerContent={(props)=> <CustomDrawer {...props} />} screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: COLORS.primary,
      drawerActiveTintColor: COLORS.white,
      drawerInactiveTintColor: COLORS.black,
      drawerLabelStyle:{
          marginLeft: -25
      }
      
  }} >
    <Drawer.Screen name="Home " component={HomeScreen} options={{
                drawerIcon: ({color})=>(
                    <FontAwesome name="home" size={24} color={color} />
                )
            }} />
            {/* <Drawer.Screen name="Market" component={MarketScreen} options={{
                drawerIcon: ({color})=>(
                    <FontAwesome name="line-chart" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="News" component={NewsScreen}
            options={{
                drawerIcon: ({color})=>(
                    <Ionicons name="newspaper-outline" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Basket" component={BasketsScreen} 
            options={{
                drawerIcon: ({color})=>(
                    <Fontisto name="shopping-basket" size={24} color={color} />
                )
            }} /> */}
            
        </Drawer.Navigator>
  );
}

function HomeStack(){
    return(
        <HomeScreenStack.Navigator>
            <HomeScreenStack.Screen name='Home' component={DrawerStack} options={{
              headerShown: false,
            }} />
            <HomeScreenStack.Screen name='About' component={AboutScreen} options={{
              headerShown: false,
            }}/>
            <HomeScreenStack.Screen name='Chat' component={ChatScreen} options={{
              headerShown: false,
            }}/>
            <HomeScreenStack.Screen name='Favourite' component={FavouritesScreen} options={{
              headerShown: false,
            }}/>
            <HomeScreenStack.Screen name='ChatsList' component={ChatsListScreen} options={{
              headerShown: false,
            }}/>
            <HomeScreenStack.Screen name='NewsAlert' component={NewsAlertScreen} options={{
              headerShown: false,
            }}/>
        </HomeScreenStack.Navigator>
    );

}
export default HomeStack;