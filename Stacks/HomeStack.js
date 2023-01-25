import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../components/constants";
import AboutScreen from "../screens/AboutScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatsListScreen from "../screens/ChatsListScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import HomeScreen from "../screens/HomeScreen";
import NewsAlertScreen from "../screens/NewsAlertsScreen";
import CustomDrawer from "../components/CustomDrawer";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";

const HomeScreenStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerStack(){
  return(
    <Drawer.Navigator initialRouteName="Home1" drawerContent={(props)=> <CustomDrawer {...props} />} screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: COLORS.purple,
      drawerActiveTintColor: COLORS.white,
      drawerInactiveTintColor: COLORS.black,
      drawerLabelStyle:{
          marginLeft: 0
      }
      
  }} >
    <Drawer.Screen name="Home " component={HomeScreen}  />
            <Drawer.Screen name="Feedback" component={HomeScreen} />
            <Drawer.Screen name="Contact us" component={HomeScreen}/>
            <Drawer.Screen name="Privacy Policy" component={HomeScreen} />
            
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
            <HomeScreenStack.Screen name='Profile' component={ProfileScreen} options={{
              headerShown: false,
            }}/>
            
            <HomeScreenStack.Screen name='Register' component={RegistrationScreen} options={{
              headerShown: false,
            }}/>
            <HomeScreenStack.Screen name='Login' component={LoginScreen} options={{
              headerShown: false,
            }}/>
        </HomeScreenStack.Navigator>
    );

}
export default HomeStack;