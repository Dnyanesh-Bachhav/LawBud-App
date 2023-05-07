import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
function Header({ headerText, isEnabled, setIsEnabled }) {
  const navigation = useNavigation();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 16 }}>
          {headerText}
        </Text>
      </View>

      <View
        style={{
          alignSelf: "flex-end",
          backgroundColor: COLORS.gray,
        //   padding: 2,
          paddingHorizontal: 4,
          borderRadius: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <MaterialIcons name="edit" size={18} color={COLORS.white} /> */}
          <Text style={{ color: COLORS.white }}>Edit</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#1976d2" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{
                padding: 0,
                margin: 0,
                height: 30
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    paddingRight: 16,
    backgroundColor: "#000000",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgStyle: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
export default Header;
