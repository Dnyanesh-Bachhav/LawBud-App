import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useContext, useState } from "react";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { AuthContext } from "../components/context";
import { useEffect } from "react";
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
    const { signIn, newUserData } = useContext(AuthContext);

    const navigation = useNavigation();
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    useEffect(()=>{
        console.log("New data"+ JSON.stringify(newUserData));
    },[]);
    return (
        <View style={styles.container}>
            <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>

            <RegistrationProgress userType={route.params.userType} />

            <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }} >
                <View style={{ width: 100, height: 100, backgroundColor: COLORS.grey, borderRadius: 50, alignSelf: 'center' }} >
                    <View style={{ width: '100%', height: '100%', borderWidth: 2, borderRadius: 50, overflow: 'hidden' }}  >
                        {image && <Image
                            source={{ uri: image }}
                            style={styles.imageStyle}
                        />}
                    </View>
                    <TouchableOpacity style={styles.badgeStyle} onPress={pickImage}>
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
                                        // navigation.navigate("Home");
                                        signIn();
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
                                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.OAddress} onChangeText={handleChange('OAddress')} onBlur={() => setFieldTouched('OAddress')} />
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
    const progressStepsStyle = {
        activeStepIconBorderColor: '#686868',
        activeLabelColor: '#686868',
        activeStepNumColor: 'white',
        activeStepIconColor: '#686868',
        completedStepIconColor: '#686868',
        completedProgressBarColor: '#686868',
        completedCheckColor: '#4bb543'
    };
    return (

        <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-around', borderRadius: 5 }} >
            {
                userType === "lawyer" ?
                <View style={{flexDirection: 'row', width: '100%' }} >

                    <ProgressSteps {...progressStepsStyle} activeStep={1}>
                        <ProgressStep label="Register" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Personal" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="SkillSets" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Documents" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                    </ProgressSteps>
                </View>
                    :
                    <ProgressSteps {...progressStepsStyle} activeStep={1}>
                        <ProgressStep label="Register" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Personal" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                    </ProgressSteps>
                    
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
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    inputStyle: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4
    },
    errorText: {
        color: COLORS.red,
    },
    buttonTextStyle:{
        color: '#393939',
        padding: 0,
        margin: 0
    }
})
export default PersonalScreen;