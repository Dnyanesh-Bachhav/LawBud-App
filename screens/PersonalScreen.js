import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from 'yup';
const UserPersonalSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    HAddress: Yup.string().min(2, "Too short address").max(100, "Too long address").required('Required'),
    AlternatePhone: Yup.string().min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits").matches(/^[0-9]+$/, "Must be only digits").notRequired()
});
const LawyerPersonalSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    OAddress: Yup.string().min(2, "Too short address").max(100, "Too long address").required('Required'),
    AlternatePhone: Yup.string().min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits").matches(/^[0-9]+$/, "Must be only digits").notRequired()
});
function PersonalScreen({ route }) {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>

            <RegistrationProgress userType={route.params.userType} />

            <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }} >
                <View style={{ width: 100, height: 100, backgroundColor: COLORS.grey, borderRadius: 50, alignSelf: 'center' }} >
                    <TouchableOpacity style={styles.badgeStyle}>
                        <View>
                            <MaterialIcons name="edit" size={24} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    route.params.userType === "user"
                        ?
                        <Formik
                            initialValues={{
                                name: '',
                                HAddress: '',
                                AlternatePhone: ''
                            }}
                            validationSchema={UserPersonalSchema}>
                            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                                <>
                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: COLORS.gray }}>Name*</Text>
                                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.name} onChangeText={handleChange('name')} onBlur={() => setFieldTouched('name')} />
                                        {touched.name && errors.name && (
                                            <Text style={styles.errorText}>{errors.name}</Text>
                                        )}
                                    </View>
                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: COLORS.gray }}>Home Address*</Text>
                                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.HAddress} onChangeText={handleChange('HAddress')} onBlur={() => setFieldTouched('HAddress')} />
                                        {touched.HAddress && errors.HAddress && (
                                            <Text style={styles.errorText}>{errors.HAddress}</Text>
                                        )}
                                    </View>
                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: COLORS.gray }}>Alternate Phone Number</Text>
                                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.AlternatePhone} onChangeText={handleChange('AlternatePhone')} onBlur={() => setFieldTouched('AlternatePhone')} />
                                        {touched.AlternatePhone && errors.AlternatePhone && (
                                            <Text style={styles.errorText}>{errors.AlternatePhone}</Text>
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("Home");
                                    }} disabled={!isValid} style={{ backgroundColor: isValid ? COLORS.black : COLORS.grey, marginTop: 10, borderRadius: 4 }}>
                                        <Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} >Next</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                        :
                        <Formik
                            initialValues={{
                                name: '',
                                OAddress: '',
                                AlternatePhone: ''
                            }}
                            validationSchema={LawyerPersonalSchema}>
                            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                                <>
                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: COLORS.gray }}>Name*</Text>
                                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.name} onChangeText={handleChange('name')} onBlur={() => setFieldTouched('name')} />
                                        {touched.name && errors.name && (
                                            <Text style={styles.errorText}>{errors.name}</Text>
                                        )}
                                    </View>
                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: COLORS.gray }}>Office address*</Text>
                                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.OAddress} onChangeText={handleChange('OAddress')} onBlur={()=> setFieldTouched('OAddress') } />
                                        {touched.OAddress && errors.OAddress && (
                                            <Text style={styles.errorText}>{errors.OAddress}</Text>
                                        )}
                                    </View>
                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: COLORS.gray }}>Alternate Phone Number</Text>
                                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.AlternatePhone} onChangeText={handleChange('AlternatePhone')} onBlur={() => setFieldTouched('AlternatePhone')} />
                                        {touched.AlternatePhone && errors.AlternatePhone && (
                                            <Text style={styles.errorText}>{errors.AlternatePhone}</Text>
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("Skills", {
                                            userType: route.params.userType,
                                            lawyersCategoriesData: route.params.lawyersCategoriesData
                                        });
                                    }} disabled={!isValid} style={{ backgroundColor: isValid ? COLORS.black : COLORS.grey, marginTop: 10, borderRadius: 4 }}>
                                        <Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} >Next</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                }


            </View>
        </View >
    );
}
function RegistrationProgress({ userType }) {
    return (

        <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-around', borderRadius: 5 }} >
            {
                userType === "lawyer" ?
                    <>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>Register</Text>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>Personal</Text>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>SkillSets</Text>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>Documents</Text>
                    </>
                    :
                    <>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>Register</Text>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>Personal</Text>
                    </>
            }
        </View>
    );
}
function InputComponent({ title }) {
    return (
        <View style={{ marginTop: 10 }} >
            <Text style={{ color: COLORS.gray }}>{title}</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    badgeStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        padding: 5
    },
    inputStyle: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4
    },
    errorText: {
        color: COLORS.red,
    }
})
export default PersonalScreen;