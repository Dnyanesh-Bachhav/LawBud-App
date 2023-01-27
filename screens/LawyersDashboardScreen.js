import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
function LawyersDashboardScreen(){
    return(
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.textStyle}>Hello, User</Text>
            <View style={styles.cardStyle}>
              <Text>Categories</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between',borderBottomWidth: 1, borderColor: COLORS.lightGray, marginTop: 5, padding: 2 }}>
                <Text style={{color: COLORS.gray }}>Lawyer Level</Text>
                <Text style={{fontWeight:'500'}} >23</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: COLORS.lightGray, marginTop: 5, padding: 2 }}>
                <Text style={{color: COLORS.gray }}>Lawyer Level</Text>
                <Text style={{fontWeight:'500'}} >23</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{color: COLORS.gray }}>Rating</Text>
                <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                  </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 20 }}>
                <View style={{alignItems: 'center'}} >
                  <View style={styles.barStyle}>
                    <Text>demo</Text>
                  </View>
                  <Text style={{fontSize: 12 }} >Lorem Epsum</Text>
                </View>
                <View style={{alignItems: 'center'}} >
                  <View style={styles.barStyle}>
                  <Text>demo</Text>
                </View>
                <Text style={{fontSize: 12 }} >Lorem Epsum</Text>
                </View>

                <View style={{alignItems: 'center'}} >
                  <View style={styles.barStyle}>
                  <Text>demo</Text>
                </View>
                <Text style={{fontSize: 12 }} >Lorem Epsum</Text>
                </View>
              </View>
            </View>
            <Text style={{fontSize: 24,paddingVertical: 10,fontWeight: '500',marginLeft: 10}}>Messages</Text>
            <View style={{flexDirection:'row', alignItems:'center', backgroundColor: COLORS.white, width: '100%', alignSelf:'center', padding: 10, borderRadius: 8 }} >
                <View style={{ backgroundColor: "#EB5757", padding: 15, borderRadius: 50, alignItems: 'center' }} >
                  <FontAwesome name="envelope-o" size={24} color={COLORS.white} />
                </View>
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
        paddingHorizontal: 20
      },
      textStyle:{
        fontSize: 27,
        paddingVertical: 10,
        fontWeight: '500',
      },
      cardStyle:{
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 5,
        paddingVertical: 10,
        elevation: 2
      },

      barStyle:{
        borderWidth: 2,
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'

      }
});
export default LawyersDashboardScreen;