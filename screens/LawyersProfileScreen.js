import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/LawyersDashboard/ProfileHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/context";
import { loginContext } from "../components/context1";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../components/constants";
import image1 from "../assets/default_user.jpg";

function LawyersProfileScreen({ route }) {
  const [image, setImage] = useState(null);
  const { signOut } = useContext(loginContext);
  const { usersType } = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState( route.params.currentUserData);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // Userdata states
  const [name, setName] = useState(currentUserData[0].name);
  const [contact, setContact] = useState(currentUserData[0].contact);
  const [email, setEmail] = useState(currentUserData[0].email_id);
  const [address, setAddress] = useState(currentUserData[0].address);
  const [profession, setProfession] = useState(currentUserData[0].type);
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
  async function getData() {
    setLoading(true);
    let userData = await AsyncStorage.getItem("currentUserData");
    console.log("In a profile:" + JSON.parse(userData));
    setCurrentUserData(JSON.parse(userData));
    setLoading(false);
  }
  function handleVerification() {
    Alert.alert("Verification", "Please verify your email...", [
      {
        text: "Ok",
        onPress: () => {
          console.log("Ok clicked...");
        },
      },
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          console.log("Cancel clicked...");
        },
      },
    ]);
  }
  useEffect(() => {
    // getData();
    console.log(usersType === "user");
  }, []);
  return (
    <View style={styles.container}>
      <Header
        headerText={"My Account"}
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
      />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: COLORS.grey,
          borderRadius: 50,
          marginTop: 10,
          alignSelf: "center",
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
            overflow: "hidden",
          }}
        >
          {currentUserData != null ? (
            <Image
              source={{ uri: currentUserData[0].profile_image || image }}
              style={styles.imageStyle}
            />
          ) : (
            <Image source={image1} style={styles.imageStyle} />
          )}
        </View>
        <TouchableOpacity style={styles.badgeStyle} onPress={pickImage}>
          <View>
            <MaterialIcons name="edit" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
      {currentUserData && (
        <ScrollView style={{ marginBottom: 10 }}>
          <Field
            name="Name"
            value={currentUserData[0].name}
            editable={isEnabled}
          />
          {/* <Field name="Contact" value={String(currentUserData[0].contact)} /> */}
          <View style={styles.fieldContainer}>
            <Text>Contact</Text>
            <TextInput
              style={styles.inputStyle}
              cursorColor={COLORS.gray}
              value={String(currentUserData[0].contact) || "hi"}
              editable={false}
            />
          </View>
          <Text style={{ paddingHorizontal: 15, marginTop: 10 }}>Email</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              marginTop: 10,
            }}
          >
            <TextInput
              style={{ ...styles.inputStyle, width: "90%" }}
              cursorColor={COLORS.gray}
              value={currentUserData[0].email_id}
              editable={false}
            />
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.lightGray,
                marginLeft: 5,
                padding: 2,
                borderRadius: 50,
              }}
              onPress={handleVerification}
            >
              <Octicons
                name="unverified"
                size={21}
                color={COLORS.yellow}
                style={{ alignSelf: "flex-end" }}
              />
            </TouchableOpacity>
          </View>
          {usersType === "user" ? (
            <Field name="Home Address" value={currentUserData[0].address} />
          ) : (
            <Field name="Office Address" value={currentUserData[0].address} />
          )}
          {/* <Field name="Profession" value={currentUserData[0].type} /> */}
          <View style={styles.fieldContainer}>
            <Text> Profession </Text>
            <TextInput
              style={styles.inputStyle}
              cursorColor={COLORS.gray}
              value={currentUserData[0].type || "hi"}
              editable={false}
            />
          </View>

          {usersType === "lawyer" ? (
            <View>
              <Field
                name="Degree Certificate"
                value={
                  currentUserData[0].user_law_data.degree.default.file.file
                }
              />
              <Field
                name="Bar Membership"
                value={
                  currentUserData[0].user_law_data.bar_membership.default.file
                    .file
                }
              />
              <Field
                name="Sanat Number"
                value={currentUserData[0].user_law_data.sanat.sanat}
              />
              <Field
                name="Experience"
                value={currentUserData[0].user_law_data.experience.experience}
              />
            </View>
          ) : null}
        </ScrollView>
      )}
      {loading && <ActivityIndicator size={"small"} color={COLORS.black} />}
      <Logout_Button signOut={signOut} />
    </View>
  );
}
function Field({ name, value }) {
  return (
    <View style={styles.fieldContainer}>
      <Text>{name}</Text>
      <TextInput
        style={styles.inputStyle}
        cursorColor={COLORS.gray}
        value={value || "hi"}
      />
    </View>
  );
}

function Logout_Button({ signOut }) {
  return (
    <TouchableOpacity
      style={styles.report_btn}
      onPress={() => {
        signOut();
      }}
    >
      <Text> Logout </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  imgStyle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 10,
  },
  badgeStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    padding: 5,
  },
  inputStyle: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    paddingLeft: 5,
  },
  fieldContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  report_btn: {
    marginTop: 10,
    paddingVertical: 10,
    width: "90%",
    // position: 'absolute',
    bottom: 10,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderColor: COLORS.red,
    borderWidth: 1,
    borderRadius: 5,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
export default LawyersProfileScreen;
