import { Text, View, StyleSheet, TextInput } from "react-native";
import Header from "../components/ChatScreen/Header";
import { COLORS } from "../components/constants";
import { Feather } from '@expo/vector-icons';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useCallback, useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
// Chat Screen
function ChatScreen({route}){
    const [messages, setMessages] = useState([]);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, []);
    
    const renderBubble = (props)=>{
        return(

            <Bubble
            {...props}
            wrapperStyle={{
                right:{
                    backgroundColor: COLORS.purple,
                    padding: 5,
                    borderRadius: 5,
                    elevation: 2,
                },
                left:{
                    backgroundColor: COLORS.white,
                    padding: 5,
                    borderRadius: 5,
                    elevation: 2,
                }
            }}
            textStyle={{
                right:{
                    color: COLORS.gray,
                },
                left:{
                    color: COLORS.gray,
                }
            }}
            
            />
            );
    }
    const scrollToBottomComponent = ()=>{
        return(
            <FontAwesome name="angle-double-down" size={24} color="black" />
        );
    }
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
            _id: 2,
            text: 'Hello World...!!!',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
      ])
    }, []);
    
    return(
        <View style={styles.container}>
            <Header headerText={ route.params.name } imgSrc={ route.params.imgSrc }  />
             
            {/* <SentMessage/>
            <ReceiveMessage />
            <InputMessage/> */}
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                // textInputStyle={{
                //     borderWidth: 1,
                //     padding: 5,
                //     borderRadius: 8,
                //     borderColor: COLORS.grey,
                // }}
            />
        </View>
    );
}

function SentMessage(){
    return(
        <>
        <View style={styles.sentMsgStyle}>
            <Text style={{color: COLORS.gray, }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nesciunt deserunt eius ab quo voluptate architecto ipsa ipsam neque, quae dicta nam, ut labore blanditiis similique iste odit sed a?</Text>
        </View>
        <Text style={{alignSelf:'flex-end',marginRight: 10, color: COLORS.gray, fontSize: 10 }}>Sent 4:20PM</Text>
        </>
    );
}

function ReceiveMessage(){
    return(
        <>
        <View style={styles.receiveMsgStyle} >
            <Text style={{color: COLORS.gray, }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam cupiditate vel sit beatae illo id rerum. Ut molestias debitis, culpa ipsa recusandae, excepturi praesentium unde, nihil corrupti dolores accusamus est.</Text>
        </View>
        <Text style={{alignSelf:'flex-start',marginLeft: 10, color: COLORS.gray, fontSize: 10 }}>4:22PM</Text>
        </>

    );
}

function InputMessage(){
    return(
        <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', bottom: 15 }} >
            <TextInput
             style={styles.inputStyle}
             placeholder="Send a Message."
            />
            <Feather name="mic" size={24} color={ COLORS.white } style={{backgroundColor: COLORS.black, borderRadius: 50, padding: 5, marginLeft: 10 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    sentMsgStyle:{
        backgroundColor: COLORS.purple,
        color: COLORS.white,
        padding: 5,
        alignSelf: 'flex-end',
        width: '70%',
        marginRight: 10,
        marginTop : 8,
        borderRadius: 5,
        elevation: 2,
    },
    receiveMsgStyle:{
        backgroundColor: COLORS.white,
        padding: 5,
        alignSelf: 'flex-start',
        width: '70%',
        marginLeft: 10,
        marginTop : 8,
        borderRadius: 5,
        elevation: 2,
    },
    inputStyle:{
        borderWidth: 1,
        padding: 5,
        width: '85%',
        borderRadius: 8,
        borderColor: COLORS.grey,
    }
});
export default ChatScreen;