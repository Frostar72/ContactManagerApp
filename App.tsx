import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen';
import { ContactProvider } from './src/utils/ContactContext';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ContactProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ContactList">
            <Stack.Screen 
              name="ContactList" 
              component={ContactListScreen} 
              options={{ title: 'Contacts' }} 
            />
            <Stack.Screen 
              name="AddContact" 
              component={AddContactScreen} 
              options={{ title: 'Add Contact' }} 
            />
            <Stack.Screen 
              name="ContactDetails" 
              component={ContactDetailsScreen} 
              options={{ title: 'Contact Details' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactProvider>
    </SafeAreaProvider>
  );
}

export default App;