import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "./UserScreen";

const Stack = createNativeStackNavigator();

function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}

export default UserNavigator;
