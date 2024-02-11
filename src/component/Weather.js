import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import {haze, rainy, snow, sunny} from '../assets/backgroundImages/index';
import DropDown from './DropDown';
import ForcastWeathe from './ForcastWeathe';

export default function Weather({weatherData, fetchWeatherData,forecastData}) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const {
    weather,
    name,
    main: {temp, humidity, feels_like},
    wind: {speed, deg},
  } = weatherData;
  const [{main}] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [weatherData]);

  function getBackgroundImg(weather) {
    if (weather === 'Snow') return snow;
    if (weather === 'Clear') return sunny;
    if (weather === 'Rain') return rainy;
    if (weather === 'Haze') return haze;
    return haze;
  }

  let textColor = backgroundImage == rainy ? 'white' : 'transparent';
  const defaultBackgroundImage = haze;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground
        source={backgroundImage || defaultBackgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover">
        <DropDown fetchWeatherData={fetchWeatherData} />

        <View style={styles.weatherInfoContainer}>
          <View>
            <Text style={styles.cityName}>{name}</Text>
            <Text style={styles.temperature}>{Math.floor(temp)}°C</Text>
            <Text style={styles.weatherCondition}>{main}</Text>
          </View>

          <View style={[styles.flexDirection, {backgroundColor: textColor}]}>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.extraText, {fontWeight: 'bold'}]}>
                {speed} m/s
              </Text>
              <Text style={[styles.extraText, {fontSize: 15}]}>Wind speed</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.extraText, {fontWeight: 'bold'}]}>
                {humidity}%
              </Text>
              <Text style={[styles.extraText, {fontSize: 15}]}>Humidity</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.extraText, {fontWeight: 'bold'}]}>
                {Math.floor(feels_like)} °C
              </Text>
              <Text style={[styles.extraText, {fontSize: 15}]}>Feels Like</Text>
            </View>
          </View>
        </View>

        <ForcastWeathe forecastData={forecastData}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  weatherInfoContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cityName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  weatherCondition: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    marginTop: 10,
  },
  temperature: {
    fontSize: 40,
    color: 'black',
    marginTop: 20,
    fontWeight: '600',
  },
  extraText: {
    fontSize: 18,
    marginTop: 5,
    color: 'black',
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 22,
    color: 'white',
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '20%',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    paddingVertical: 15,
    borderBottomWidth:1
  },
});
