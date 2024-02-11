import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function ForcastWeathe({forecastData}) {
  const [forecastDetails, setForecastDetails] = useState([]);

  useEffect(() => {
    if (forecastData && forecastData.list && forecastData.list.length > 0) {
      const groupedByDay = {};
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', {weekday: 'short'});

        if (!groupedByDay[day]) {
          groupedByDay[day] = {
            dtTxt: day,
            tempMin: item.main.temp_min,
            tempMax: item.main.temp_max,
            weatherIcons: item.weather.map(weather => weather.icon),
          };
        }
      });

      const details = Object.values(groupedByDay);

      setForecastDetails(details);
    }
  }, [forecastData]);

  return (
    <View style={styles.container}>
      {forecastDetails.map((details, index) => (
        <View key={index} style={styles.main}>
          <View style={styles.box}>
            <Text style={styles.text}>{details?.dtTxt}</Text>
          </View>
          <View style={[styles.box, {alignItems: 'center'}]}>
            {details?.weatherIcons?.map((icon, iconIndex) => (
              <Image
                key={iconIndex}
                resizeMode={'contain'}
                source={{
                  uri: `http://openweathermap.org/img/w/${icon}.png`,
                }}
                style={{width: 30, height: 30, marginRight: 5}}
              />
            ))}
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>
              {details?.tempMin} / {details?.tempMax} C
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  main: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  box: {
    width: '30%',
  },
});
