import { Text, View, StyleSheet, TextInput } from "react-native";
import Header from "../components/ChatScreen/Header";
import { COLORS } from "../components/constants";
import { Feather } from '@expo/vector-icons';

function ChatScreen({route}){
    return(
        <View style={styles.container}>
            <Header headerText={ route.params.name } imgSrc={ route.params.imgSrc }  />
            <SentMessage/>
            <ReceiveMessage />
            <InputMessage/>
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