import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../components/constants";
import { MaterialIcons } from '@expo/vector-icons';
import SearchableDropDown from "react-native-searchable-dropdown";
import { useNavigation } from "@react-navigation/native";
import { getLawyersCategories, getLawyersData } from "../Services/requests";

function RegistrationScreen(){
    let[userType,setUserType] = useState("user");
    const navigation = useNavigation();
    const[ lawyersCategoriesData, setCategoriesLawyersData ] = useState([]);
    const[loading,setLoading] = useState(false);
    async function getLawyersCategoriesData1(){
        if(loading)
        {
            return;
        }
        const lawyersCategories = await getLawyersCategories();
        console.log("Category:"+lawyersCategories);
        setCategoriesLawyersData(lawyersCategories);
        setLoading(false);
    }
    useEffect(()=>{
        getLawyersCategoriesData1();
    },[]);
    return(
        <View style={styles.container}>
            <Text style={{color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>
            <RegistrationProgress userType={userType} />
            {/* Registration Screens */}
            {/* <Register userType={userType} setUserType={setUserType} /> */}
            {/* <Personal/> */}
            {
               !loading ? <SkillSets lawyersCategoriesData={lawyersCategoriesData} /> : <ActivityIndicator size={"small"} color={COLORS.black} />
            }
            {/* <Documents/> */}
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
function Register({userType,setUserType}){
    const [currentOption,setCurrentOption] = useState("user");
    const refRBSheet = useRef();
    return(
        <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }}>
            <Text style={{fontSize: 16,color: COLORS.gray, }}>What describes you best?</Text>
            <View style={{ flexDirection: 'row', borderRadius: 5, padding: 4, marginTop: 5, backgroundColor: COLORS.lightGray }} >
                <TouchableOpacity style={{width: '50%', borderRadius:5, backgroundColor: userType === "user" ? COLORS.black : COLORS.lightGray}} onPress={()=>{
                    setUserType("user");
                }} >
                    <Text style={{color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '50%', borderRadius:5, backgroundColor: userType === "lawyer" ? COLORS.black : COLORS.lightGray}} onPress={()=>{
                    setUserType("lawyer");
                }}>
                    <Text style={{color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>Lawyer</Text>
                </TouchableOpacity>
            </View>
            {/* User Data */}
            <InputComponent title={"Email id"} />
            <InputComponent title={"Phone Number"} />
            {/* Button */}
            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity onPress={()=>{
                    refRBSheet.current.open();
                }} ><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Get OTP</Text></TouchableOpacity>
            </View>
            {/* Bottom Sheet */}
            <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

            <RBSheet
                ref={refRBSheet}
                animationType="none"
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container:{
                        backgroundColor: COLORS.white,
                    },
                wrapper: {
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }                
                }}
            >
                
                <SheetComponent/>
            </RBSheet>
                </View>
        </View>
    );
}
function SheetComponent(){
    return(
        <View style={{padding: 10}} >
            <InputComponent title={"Enter OTP"} />
            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
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

function Personal(){
    return(

        <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}} >
        <View style={{width: 100,height: 100, backgroundColor: COLORS.grey, borderRadius: 50, alignSelf: 'center' }} >
            <TouchableOpacity style={styles.badgeStyle}>
            <View><MaterialIcons name="edit" size={24} color={COLORS.white} /></View>
            </TouchableOpacity>
        </View>
        <InputComponent title={"Name*"} />
        <InputComponent title={"Office/Home Address*"} />
        <InputComponent title={"Alternate Phone Number"} />

        <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
        </View>

        
    </View>
        );
}
function SkillSets({lawyersCategoriesData}){
    // console.log(lawyersCategoriesData[0]);
    let[itemsArray,setItemsArray] = useState([]);
    var itemsArray1 = [];
    return(
        <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}}>
            <Text style={{color: COLORS.gray}}>Select Your Specialization</Text>
            {/* <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} placeholder={"Search and select your skillset"} /> */}
            <View style={{flexDirection: 'row',alignItems: 'center' }} >
                
                <SearchableDropDown
                items={lawyersCategoriesData}
                onItemSelect={(item)=> {
                    setItemsArray((items)=> [...items, {name:item.name}]);
                    // itemsArray1.push({name:item.name});
                    // console.log(itemsArray1);
                    // itemsArray.push({name:item.name});
                }}
                containerStyle={{
                    width: '90%',
                }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: COLORS.lightGray,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    borderRadius:5
                }}
                itemTextStyle={{
                    color: COLORS.black
                }}
                resetValue={false}
                placeholder={"Search for lawyers in your area..."}
                placeholderTextColor={COLORS.gray}
                listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                nestedScrollEnabled= {true}
                textInputProps={{
                    underlineColorAndroid: 'transparent',
                    style:{
                        paddingLeft: 5,
                        borderWidth: 1.5,
                        borderColor: COLORS.lightGray,
                        borderRadius: 5,
                        backgroundColor: COLORS.lightGray,
                        color: COLORS.black,
                    }
                }}
            />
            </View>
            <View style={{flexDirection: 'row', marginTop: 4, height: 200 }} >
            <FlatList
            data={itemsArray}
            renderItem={({ item,index })=>(
                <View style={{flexDirection: 'row'}} >
                <TouchableOpacity style={{backgroundColor: COLORS.black, alignSelf: 'flex-start', borderRadius: 5, marginTop: 2, marginLeft: 4, paddingVertical: 2, paddingHorizontal: 5, height: 25 }} >
                    <Text style={{color: COLORS.white}}>{item.name}</Text>
                </TouchableOpacity>
                </View>
                    
            )}
            keyExtractor={(item,index)=>index}
            />
            {/* <TouchableOpacity style={{backgroundColor: COLORS.black, borderRadius: 5, marginLeft: 4, paddingVertical: 2, paddingHorizontal: 5, height: 25 }} ><Text style={{color: COLORS.white}}>Robbery</Text></TouchableOpacity> */}

            </View>

            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
        </View>
    );
}
function Documents(){
    return(
        <View style={{backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5}}>
            <Text style={{fontSize: 16,color: COLORS.gray, }}>What describes you best?</Text>
            <Text style={{color: COLORS.gray}}>Degree Certificate*</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
            <Text style={{color: COLORS.gray}}>Bar Membership*</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
            <InputComponent title={"Sanat Number*"} />
            <InputComponent title={"Work Experience(in years)"} />
            <View style={{backgroundColor: COLORS.black,marginTop: 10, borderRadius: 4 }} >
                <TouchableOpacity><Text style={{color: COLORS.white,padding: 4, textAlign: 'center'}} >Next</Text></TouchableOpacity>
            </View>
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
    
    btn:{
        backgroundColor: COLORS.white,
    },
    inputStyle:{
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4

    },
    badgeStyle:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        padding: 5
    },
});
export default RegistrationScreen;