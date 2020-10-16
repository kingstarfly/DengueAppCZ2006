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

const ReportScreen = ({ navigation }) => {
  const [details, setDetails] = React.useState("");
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
      // recipients: ["Contact_NEA@nea.gov.sg"],
      recipients: ["xingxiang@twotreesgroup.com"],
      subject: "Potential Dengue Breeding Spot",
      body: details,
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

  return (
    <SafeAreaView style={globalStyles.redContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Report Dengue Breeding Ground</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.speechBubble}>
          <Text style={styles.textBig}>
            Briefly tell us about the situation and location:
          </Text>

          <TextInput
            onChangeText={(text) => setDetails(text)}
            value={details}
            placeholder={"Type here..."}
            placeholderTextColor={"#333"}
            style={styles.textInput}
            multiline
            numberOfLines={4}
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
          <Text style={styles.buttonText}>Upload a Photo</Text>
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
    flex: 1,
    // borderWidth: 1,
    padding: 50,
  },

  detailsContainer: {
    flex: 4,
    // borderWidth: 1,
  },

  imageContainer: {
    flex: 5,
    width: "50%",
    // borderWidth: 1,
  },

  speechBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    height: 200,
    borderRadius: 20,
    padding: 20,
  },

  buttonContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#e64f6ec2",
    borderRadius: 10,
    width: 150,
    alignSelf: "center",
    margin: 20,
    padding: 19,
  },

  uploadImg: {
    backgroundColor: "#e64f6ec2",
    borderRadius: 100,
    width: 150,
    height: 150,
    alignSelf: "center",
    margin: 50,
    justifyContent: "center",
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

  textBig: { color: "#fff", fontWeight: "700", fontSize: 16 },
  textSmall: { color: "#333", fontSize: 14 },
  textInput: {
    paddingVertical: 10,
  },
});

export default ReportScreen;
