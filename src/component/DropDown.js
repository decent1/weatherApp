import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import ActionSheetComponent from './ActionSheet';
import {dropDown} from '../assets/backgroundImages';

export default function DropDown({fetchWeatherData}) {
  const [cityName, setCityName] = useState('');
  const actionSheetRef = useRef();
  const cities = [
    'Karachi',
    'New York',
    'London',
    'Sydney',
    'Hong Kong',
    'Seattle',
    'Nagoya',
    'Stockholm',
    'Doha',
    'Auckland',
  ];

  return (
    <View style={styles.dropDown}>
      <ActionSheetComponent
        ref={actionSheetRef}
        title="Select City"
        dataset={cities}
        onPress={item => {
          setCityName(item);
          fetchWeatherData(item);
        }}
      />
      <TouchableOpacity
        style={styles.dropDownBar}
        onPress={() => actionSheetRef.current.show()}>
        <Text style={styles.text}>{cityName ? cityName : 'select city'}</Text>
        <Image
          resizeMode={'contain'}
          source={dropDown}
          style={{width: 10, height: 20}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownBar: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderColor: 'lightgray',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});
