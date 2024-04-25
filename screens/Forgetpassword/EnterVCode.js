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
import { Toast } from "toastify-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
function EnterVCode({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { setTemporaryToken } = useContext(AuthContext);

  let formValidation = Yup.object({
    resetCode: Yup.string().required("يرجي ادخال كود التاكيد"),
  });
  async function emailSubmit(values) {
    try {
      const response = await fetch(
        "http://192.168.1.9:8000/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetCode: values.resetCode,
            // values
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status === "error") {
        setApiMessage(data.message);
        Toast.error(apiMessage);
      } else {
        setTemporaryToken(data.token);
        setApiMessage(data.message);
        Toast.success(apiMessage);
        setTimeout(() => {
          navigation.navigate("ResetPassword");
        }, 3000);
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
          resetCode: "",
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
                <Text style={styles.createAccText}> كود التاكيد </Text>
              </View>

              {/* resetCode*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="envelope" size={30} color="#900" />
                  <Text style={styles.label}> كود التاكيد</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="XXXXXX"
                  placeholderTextColor={"#071355"}
                  keyboardType="numeric"
                  onChangeText={handleChange("resetCode")}
                  onBlur={handleBlur("resetCode")}
                  value={values.resetCode}
                />
                {errors.resetCode && touched.resetCode ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.resetCode}
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

export default EnterVCode;

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    // paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 40,
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
