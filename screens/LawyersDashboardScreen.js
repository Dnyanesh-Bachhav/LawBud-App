import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../components/constants";
import { FontAwesome } from '@expo/vector-icons';

function LawyersDashboardScreen(){
    return(
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.textStyle}>Hello, User</Text>
            <Text style={{fontSize: 24,paddingVertical: 10,fontWeight: '500',marginLeft: 10}}>Messages</Text>
            <View style={{flexDirection:'row', alignItems:'center', backgroundColor: COLORS.white, width: '90%' , alignSelf:'center', padding: 10, borderRadius: 8 }} >
                <FontAwesome name="envelope-o" size={24} color="black" />
                <Text style={{marginLeft: 5}} >You have 2 new Messages</Text>
            </View>
          </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
      },
      textStyle:{
        fontSize: 27,
        paddingVertical: 10,
        fontWeight: '500',
        marginLeft: 10
      }
});
export default LawyersDashboardScreen;