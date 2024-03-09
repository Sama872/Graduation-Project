import { StyleSheet, Text, View } from 'react-native';
import Index from './screens/Index';
import Signup from './screens/SignupScreen';
import ReqHospital from './screens/ReqHospital';
import SigninScreen from './screens/SigninScreen';
import Profile from './screens/Profile';
import EnterEmail from './screens/Forgetpassword/EnterEmail';
import ToastManager from 'toastify-react-native'

import ResetPassword from './screens/Forgetpassword/ResetPassword';
import EnterVCode from './screens/Forgetpassword/EnterVCode';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Index/> */}
      {/* <Signup/> */}
      {/* <ReqHospital/>  */}
      {/* <SigninScreen/>  */}
      <Profile/>
      {/* <EnterEmail/> */}
      {/* <EnterVCode/> */}
      {/* <ResetPassword/> */}
      {/* <EnterEmail/> */}
      <ToastManager/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
