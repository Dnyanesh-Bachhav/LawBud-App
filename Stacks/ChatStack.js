import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsListScreen from "../screens/ChatsListScreen";


const ChatScreenStack = createNativeStackNavigator();
function  ChatStack(){
    return(
        <ChatScreenStack.Navigator>
            <ChatScreenStack.Screen name='ChatsList' component={ChatsListScreen} options={{
              headerShown: false,
            }}/>
        </ChatScreenStack.Navigator>
    );

}
export default ChatStack;