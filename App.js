import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Home from './src/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <Wrapper>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'white'}}>
        <SafeAreaView  style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Home />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default App;

const Wrapper = ({children}) => {
  if (Platform.OS === 'ios')
    return (
      <SafeAreaView style={{flex: 1}} behavior="padding">
        {children}
      </SafeAreaView>
    );
  return <View style={{flex: 1}}>{children}</View>;
};

const styles = StyleSheet.create({});
