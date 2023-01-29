import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
const DocumentsSchema = Yup.object().shape({
    degreeCertificate: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    barCertificate: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    sanatNumber: Yup.string().min(1, "Too short number").max(100, "Too long number").required('Required'),
    experience: Yup.string().min(1, "Must be greater than or equal to 1 digit").matches(/^[0-9]+$/, "Must be only digits").notRequired()
});
function DocumentsScreen({route}){
    
    const navigation = useNavigation();
    let[itemsArray,setItemsArray] = useState([]);
    var itemsArray1 = [];
    return(
        <View style={styles.container}>
        <Text style={{color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>
        <RegistrationProgress userType={ route.params.userType} />
        <Formik
        initialValues={{
            degreeCertificate:'',
            barCertificate:'',
            sanatNumber:'',
            experience:''
        }}
        validationSchema={DocumentsSchema}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                                
            <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}}>
                <Text style={{fontSize: 16,color: COLORS.gray, }}>What describes you best?</Text>
                <Text style={{color: COLORS.gray}}>Degree Certificate*</Text>
                <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.degreeCertificate} onChangeText={handleChange('degreeCertificate')} onBlur={()=> setFieldTouched('degreeCertificate') } />
                {touched.degreeCertificate && errors.degreeCertificate && (
                        <Text style={styles.errorText}>{errors.degreeCertificate}</Text>
                )}
                <Text style={{color: COLORS.gray}}>Bar Membership*</Text>
                <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.barCertificate} onChangeText={handleChange('barCertificate')} onBlur={()=> setFieldTouched('barCertificate') } />
                {touched.barCertificate && errors.barCertificate && (
                        <Text style={styles.errorText}>{errors.barCertificate}</Text>
                )}
                <View style={{ marginTop: 10 }} >
                    <Text style={{ color: COLORS.gray }}>Sanat Number*</Text>
                    <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.sanatNumber} onChangeText={handleChange('sanatNumber')} onBlur={()=> setFieldTouched('sanatNumber') } />
                    {touched.sanatNumber && errors.sanatNumber && (
                        <Text style={styles.errorText}>{errors.sanatNumber}</Text>
                    )}
                </View>
                <View style={{ marginTop: 10 }} >
                    <Text style={{ color: COLORS.gray }}>Work Experience(in years)</Text>
                    <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.experience} onChangeText={handleChange('experience')} onBlur={()=> setFieldTouched('experience') } />
                    {touched.experience && errors.experience && (
                        <Text style={styles.errorText}>{errors.experience}</Text>
                    )}
                </View>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("LawyersDashboard");
                    }} disabled={!isValid} style={{backgroundColor: isValid ? COLORS.black : COLORS.grey,marginTop: 10, borderRadius: 4 }} ><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
            )}
        </Formik>
        </View>
        );
}
function RegistrationProgress({userType}){
    return(
        
    <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-around', borderRadius: 5}} >
        {
            userType === "lawyer" ?
            <>
        <Text style={{fontSize: 12, color: COLORS.black}}>Register</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Personal</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>SkillSets</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Documents</Text>
            </>
            : 
            <>
        <Text style={{fontSize: 12, color: COLORS.black}}>Register</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Personal</Text>    
            </>
        }
    </View>
    );
}
function InputComponent({title}){
    return(
        <View style={{marginTop: 10}} >
            <Text style={{color: COLORS.gray}}>{title}</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    badgeStyle:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        padding: 5
    },
    inputStyle:{
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4
    },
    errorText: {
        color: COLORS.red,
    }
})
export default DocumentsScreen;