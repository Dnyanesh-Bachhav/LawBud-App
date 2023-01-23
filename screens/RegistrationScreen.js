import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../components/constants";

function RegistrationScreen(){
    return(
        <View style={styles.container}>
            <Text style={{color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>
            <RegistrationProgress/>
            <Register/>
        </View>
    );
}
function RegistrationProgress(){
    return(
    <View>
        <Text style={{fontSize: 16, color: COLORS.white}} >Register  Personal  SkillSets  Documents</Text>
    </View>
    );
}
function Register(){
    return(
        <View style={{ backgroundColor: COLORS.white,padding: 16 }} >
            <Text style={{fontSize: 16,color: COLORS.gray, }}>What describes you best?</Text>
        </View>
    );
}
function Personal(){
    <View>
        <Text>Personal</Text>
    </View>
}
function SkillSets(){
    return(
        <View>
            <Text>Skill Sets</Text>
        </View>
    );
}
function Documents(){
    return(
        <View>
            <Text>Documents...</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black,

    }
});
export default RegistrationScreen;