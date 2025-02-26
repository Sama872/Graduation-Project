import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { Toast } from "toastify-react-native";
import { Formik } from "formik";
import { ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";
import { useFonts, MarkaziText_400Regular, MarkaziText_700Bold } from '@expo-google-fonts/markazi-text';

const signin = require("../../assets/signin.png");

export default function ResetPassword({ navigation }) {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  const [isPressed, setIsPressed] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { temporaryToken } = useContext(AuthContext);
  // const JWT =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxZGIzOTdmNzg3ZjliMWI3MWViNGUiLCJpYXQiOjE3MDkzMTg4MDIsImV4cCI6MTcxNzk1ODgwMn0.EkfxpObCa6FmyUmvJDFo0_mxQJZS5ZpiUOvsPfACk38";
  let formValidation = Yup.object({
    newPassword: Yup.string()
      .required("يرجى ادخال كلمة المرور")
      .matches(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/,
        "يجب ان تحتوي كلمة المرور علي ستة أحرف علي الاقل وحرف كبير وحرف خاص ($,@,&,!)"
      ),
    passwordConfirm: Yup.string()
      .required("يرجي تاكيد كلمه المرور")
      .oneOf([Yup.ref("newPassword")], "تأكيد كلمة المرور غير صحيح"),
  });

  async function newPasswordSubmit(values) {
    try {
      const response = await fetch(
        "http://192.168.1.6:8000/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + temporaryToken,
          },
          body: JSON.stringify({
            newPassword: values.newPassword,
            passwordConfirm: values.passwordConfirm,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        setApiMessage(data);
        Toast.success(apiMessage);
        setTimeout(() => {
          navigation.navigate("SigninScreen");
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#76b49f"} color={"white"} />
      <Formik
        initialValues={{
          newPassword: "",
          passwordConfirm: "",
        }}
        validationSchema={formValidation}
        onSubmit={newPasswordSubmit}
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
                  source={signin}
                  style={styles.signupImg}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.form}>
                <View style={styles.createAcc}>
                  <FontAwesome name="stethoscope" size={60} color="#76b49f" />
                  <Text style={styles.createAccText}>تغيير كلمه السر</Text>
                </View>
              </View>
              <View></View>

              {/* password*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="key" size={30} color="#76b49f" />
                  <Text style={styles.label}> كلمه المرور</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="  كلمه المرور"
                  placeholderTextColor={"#071355"}
                  keyboardType="default"
                  secureTextEntry={true}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                />
                {errors.newPassword && touched.newPassword ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.newPassword}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              {/* confirmpassword*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="key" size={30} color="#76b49f" />
                  <Text style={styles.label}> تأكيد كلمه المرور</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder=" تأكيد كلمه المرور"
                  placeholderTextColor={"#071355"}
                  keyboardType="default"
                  secureTextEntry={true}
                  onChangeText={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  value={values.passwordConfirm}
                />
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.passwordConfirm}
                  </Text>
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
                    { backgroundColor: isPressed ? "#9abf4d" : "#76b49f" },
                  ]}
                  type="submit"
                >
                  تسجيل{" "}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 20,
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
  createAcc: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  createAccText: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "#76b49f",
    fontFamily: 'MarkaziText_700Bold',
  },
  signupIcon: {
    width: 200,
    height: 100,
  },
  inputsView: {
    marginTop: 40,
  },
  input: {
    borderBottomColor: "#9abf4d",
    borderBottomWidth: 2,
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    backgroundColor: "white",
    color: "#071355",
    paddingHorizontal: 5,
    textAlign: "right",
    fontFamily: 'MarkaziText_400Regular',
  },
  labelView: {
    flexDirection: "row-reverse", // Change the direction of the row to right-to-left
    alignItems: "center", // Align the items in the center
  },
  label: {
    color: "#76b49f",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "right",
    marginRight: 10,
    fontFamily: 'MarkaziText_400Regular',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    // fontWeight: "bold",
    fontFamily: 'MarkaziText_700Bold',
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
    marginVertical: 20,
  },
});
