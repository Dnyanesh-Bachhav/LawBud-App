import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "../screens/AboutScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatsListScreen from "../screens/ChatsListScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import HomeScreen from "../screens/HomeScreen";
import NewsAlertScreen from "../screens/NewsAlertsScreen";

const HomeScreenStack = createNativeStackNavigator();
function HomeStack(){
    return(
        <HomeScreenStack.Navigator>
            <HomeScreenStack.Screen name='Home' component={HomeScreen} options={{
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