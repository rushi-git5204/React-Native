import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserCreation from './Components/UserCreation';
import FlatCards from "./Components/UserCreationUtility";
import Login from "./Components/LoginCompoent"
import HelpComponent from './Components/HelpComponent';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
          headerTitleAlign: 'center', 
        }}>
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Userutility" component={FlatCards} />
        <Stack.Screen name="UserCreation" component={UserCreation} />
        <Stack.Screen name="HelpComponent" component={HelpComponent} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

