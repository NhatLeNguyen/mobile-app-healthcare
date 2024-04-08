import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../LoginScreen/LoginScreen";
import RegisterScreen from "../RegisterScreen/RegisterScreen";

const Stack = createNativeStackNavigator()

function InitialScreen() {
    return ( 
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: "Màn hình đăng nhập",  headerShown: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: "Màn hình đăng ký",  headerShown: false}}
          />
        </Stack.Navigator>
    );
}

export default InitialScreen;