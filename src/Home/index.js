import {
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getForecastAPI, getWeatherAPI} from '../config';
import Weather from '../component/Weather';
import DropDown from '../component/DropDown';
import axios from 'axios';
import ForcastWeathe from '../component/ForcastWeathe';
const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const fetchWeatherData = async cityName => {
    setLoaded(false);
    const apiCall = getWeatherAPI(cityName);
    try {
      const response = await axios?.get(apiCall, {
        timeout: 10000,
      });
      console.log('Response:', response?.data);
      if (response?.status === 200) {
        setWeatherData(response.data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else if (error.code === 'ECONNABORTED') {
        console.log('Request timeout:', error.message);
      } else if (error.response) {
        console.log(
          'Server responded with an error status:',
          error.response.status,
        );
        console.log('Response data:', error.response.data);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('No response received:', error.request);
        Alert.alert('No response received from server due to internet slow');
      } else {
        console.log('Error setting up the request:', error.message);
      }
      setLoaded(true);
    }
  };
  const fetchForecastData = async (cityName) => {
    setLoaded(false);
    const forecastApiCall = getForecastAPI(cityName);
    try {
      const response = await axios?.get(forecastApiCall, {
        timeout: 10000,
      });
      // console.log('Forecast Response:', response?.data);
      if (response?.status === 200) {
        setForecastData(response.data);
      } else {
        setForecastData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error,'==forecast');
      // ... (Your existing error handling logic)
      setLoaded(true);
    }
  };
  useEffect(() => {
    fetchWeatherData('Karachi');
    fetchForecastData('Karachi')
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <DropDown fetchWeatherData={fetchWeatherData} />
          <ActivityIndicator color="gray" size={36} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchWeatherData('Karachi').finally(() => setRefreshing(false));
            }}
          />
        }
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}>
        {weatherData === null ? (
          <View style={{alignItems: 'center'}}>
            <DropDown fetchWeatherData={fetchWeatherData} />
            <Text style={styles.primaryText}>City Not Found!</Text>
          </View>
        ) : (
          <Weather
          forecastData={forecastData}
            weatherData={weatherData}
            fetchWeatherData={fetchWeatherData}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
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
  errorContainer: {justifyContent: 'center', flex: 1},
  primaryText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 20,
  },
});
