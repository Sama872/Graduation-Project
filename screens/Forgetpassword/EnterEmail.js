import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Toast } from "toastify-react-native";

function EnterEmail({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  let formValidation = Yup.object({
    email: Yup.string()
      .email("الخاص بك بطريقة صحيحة'gmail'يرجى ادخال ")
      .required("الخاص بك'gmail'يرجى ادخال"),
  });

  async function emailSubmit(values) {
    try {
      const response = await fetch(
        "http://192.168.1.7:8000/api/v1/auth/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            // values
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        setApiMessage(data.message);
        Toast.success(apiMessage);
        setTimeout(() => {
          navigation.navigate("EnterVCode");
        }, 3000);
      } else {
        setApiMessage(data.message);
        Toast.error(apiMessage);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <SafeAreaView style={styles.contanier}>
      <StatusBar backgroundColor={"#071355"} color={"white"} />

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={formValidation}
        onSubmit={emailSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/fun-3d-cartoon-illustration-indian-doctor_183364-114487.jpg?w=360&t=st=1708419125~exp=1708419725~hmac=673a911799f6fc9e5d5bde285346169af5f270a5ef675ceec33f29555b6e401e",
                  }}
                  style={styles.signupImg}
                  resizeMode="contain"
                />
              </View>
              {/* <View>{apiError ? <Text style={{ fontSize: 10, color: 'red' }}>{apiError}</Text> : ""}</View> */}
              <View style={styles.createAcc}>
                <FontAwesome name="stethoscope" size={60} color="#900" />
                <Text style={styles.createAccText}>ادخل البريد الالكتروني</Text>
              </View>

              {/* email*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="envelope" size={30} color="#900" />
                  <Text style={styles.label}> البريد الالكتروني</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="******@gmail.com"
                  placeholderTextColor={"#071355"}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.email}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              <Pressable
                onPress={handleSubmit}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
              >
                <Text
                  style={[
                    styles.button,
                    { backgroundColor: isPressed ? "#071355" : "#900" },
                  ]}
                >
                  تسجيل
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default EnterEmail;

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    // paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signupImg: {
    // flex: 0.5, // Set the width of the image to 20% of its parent's width
    // aspectRatio: 1, // Maintain the aspect ratio of the image
    width: 300,
    height: 300,
  },
  form: {
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 40,
    paddingHorizontal: 15,
  },
  inputsView: {
    marginTop: 40,
  },
  input: {
    borderBottomColor: "#071355",
    borderBottomWidth: 2,
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    backgroundColor: "white",
    color: "#071355",
    paddingHorizontal: 5,
    textAlign: "right",
  },
  labelView: {
    flexDirection: "row-reverse", // Change the direction of the row to right-to-left
    alignItems: "center", // Align the items in the center
  },
  label: {
    color: "#071355",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "right",
    marginRight: 10,
  },
  createAcc: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  createAccText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#071355",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#900",
    color: "white",
    fontSize: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
    textAlign: "center",
    marginVertical: 40,
  },
});
