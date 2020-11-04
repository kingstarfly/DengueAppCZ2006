import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MailComposer from "expo-mail-composer";
import { globalStyles } from "../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const ReportScreen = ({ navigation }) => {
  const [details, setDetails] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [picture, setPicture] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setPicture({ localUri: pickerResult.uri });
  };

  let handleSendEmail = async () => {
    let options = {
      recipients: ["Contact_NEA@nea.gov.sg"],
      // recipients: ["xingxiang@twotreesgroup.com"],
      subject: "Potential Dengue Breeding Spot",
      body: `Dear NEA,\n\nThere is a potential breeding spot I would like to report!\n\nLocation: ${details}.\n\nBrief Description: ${desc}\n\nThank you.`,
    };
    if (picture) {
      options = { ...options, attachments: [picture.localUri] };
    }
    let result = await MailComposer.composeAsync(options);

    return Alert.alert(
      "Email Success",
      "Thank you for reporting this potential breeding ground!",
      [
        {
          text: "Clear and Return to Home",
          onPress: handleClear,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  let handleClear = () => {
    setDetails("");
    setPicture(null);
    navigation.navigate("Home");
  };

  let handleCurrentLocation = async () => {
    setDetails("Please wait...");

    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied.");
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    let coords = location.coords;
    let fullAddress = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    const { name, street, country, postalCode } = fullAddress[0];
    let formattedAddress = `${name} ${street} ${country}`;
    if (postalCode) {
      formattedAddress += ` ${postalCode}`;
    }
    setDetails(formattedAddress);
  };

  return (
    <SafeAreaView style={globalStyles.redContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Report Dengue Breeding Ground</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.speechBubble}>
          <Text style={styles.textBig}>Location</Text>
          <TouchableOpacity
            onPress={handleCurrentLocation}
            style={{ marginTop: -20 }}
          >
            <Text style={styles.blueText}>Use Current Location</Text>
          </TouchableOpacity>
          <TextInput
            onChangeText={(text) => setDetails(text)}
            value={details}
            placeholder={"Type here ..."}
            placeholderTextColor={"#333"}
            style={styles.textInput}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
        </View>

        <View style={styles.speechBubble}>
          <Text style={styles.textBig}>Brief Description</Text>
          <TextInput
            onChangeText={(text) => setDesc(text)}
            value={desc}
            placeholder={"Type here..."}
            placeholderTextColor={"#333"}
            style={styles.textInput}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
        </View>
      </View>

      {!picture ? (
        <TouchableOpacity
          style={styles.uploadImg}
          onPress={openImagePickerAsync}
          disabled={picture}
        >
          <Ionicons name="md-camera" size={40} color="#fffc" />
          <Text style={styles.buttonText}>Attach a Photo</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: picture.localUri }} style={styles.thumbnail} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
  },

  titleContainer: {
    flex: 3,
    // borderWidth: 1,
    justifyContent: "center",
    // alignItems: "flex-start",
    paddingHorizontal: 50,
    // borderWidth: 1,
  },

  detailsContainer: {
    flex: 4,
    marginHorizontal: 20,
    // borderWidth: 1,
  },

  imageContainer: {
    flex: 5,
    width: "50%",
    marginTop: 40,
    // borderWidth: 1,
  },

  speechBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    height: 100,
    width: 300,
    borderRadius: 20,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 25,
    marginBottom: 20,
  },

  buttonContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#e64f6e",
    borderRadius: 10,
    width: 150,
    alignSelf: "center",
    margin: 20,
    padding: 19,
  },

  uploadImg: {
    backgroundColor: "#e64f6e",
    borderRadius: 20,
    width: 150,
    height: 100,
    alignSelf: "center",
    margin: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 6,
    // borderColor: "#bbb",
  },

  thumbnail: {
    flex: 1,
    resizeMode: "contain",
    width: undefined,
    height: undefined,
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "red",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
  },

  textBig: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
  },
  textSmall: { color: "#333", fontSize: 14 },
  textInput: {
    paddingVertical: 10,
  },

  blueText: {
    fontSize: 12,
    color: "#246EEC",
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default ReportScreen;
