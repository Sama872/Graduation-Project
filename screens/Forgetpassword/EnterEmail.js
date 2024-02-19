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
} from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

const bg= require('../../assets/signin.jpg')


function EnterEmail() {
  return (
    <SafeAreaView style={styles.contanier}>
        
            <Image source={bg} style={styles.Image} resizeMode="cover" />
        
        <View style={styles.form}>
        <View style={styles.createAcc}>
          <FontAwesome name="stethoscope" size={60} color="#900" />
          <Text style={styles.createAccText}>تغيير كلمه السر</Text>
        </View>
        <View style={styles.inputsView}>
          <View style={styles.labelView}>
            <FontAwesome name="envelope" size={30} color="#900" />
            <Text style={styles.label}> البريد الالكتروني</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder=" البريد الالكتروني"
            placeholderTextColor={"#071355"}
            keyboardType="email-address"
          />
        </View>
        
        <Pressable>
          <Text style={styles.button}>ارسال الكود </Text>
        </Pressable>
     </View>    
    </SafeAreaView>
  )
}

export default EnterEmail

const styles=StyleSheet.create({
    contanier:{
        flex: 1,
        //paddingVertical: StatusBar.currentHeight,
        justifyContent: 'center',
        borderTopRightRadius:30,
        borderTopLeftRadius:40,
        
      },
      Image:{
         height: '40%',
         width: '100%',
      },
      form:{
        flex:1,
        borderTopRightRadius:30,
        borderTopLeftRadius:40,
        paddingHorizontal:15,
    
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
        backgroundColor: "#071355",
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
})
