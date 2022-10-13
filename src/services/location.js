import axios from 'axios'
import { PermissionsAndroid, Alert, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

const mapBase = 'maps.googleapis.com/maps/api/'

export const requestLocationPermission = async (callback) => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
          'title': 'Location Access Required',
          'message': 'Masjid Speaker needs to access your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callback(true)
      } else {
        Alert.alert('Warning', 'Permission Denied')
        callback(false)
      }
    } catch (err) {
      console.log("err",err)
    }
  } else {
    callback(true)
  }
}

export const getLocation = (callback) => {
  Geolocation.getCurrentPosition((position) => {
    callback(position.coords)
  }, (error) => {
    const { code, message } = error
    console.log(error)
    callback(null)
  }, {
    enableHighAccuracy: true,
    timeout: 15000,
  })
}

export const getNearbyMasjids = (lat, long) => {
  return axios({
    method: 'get',
    url: 'https://'+ mapBase + `place/nearbysearch/json?location=${lat},${long}&radius=1500&type=mosque&key=AIzaSyBC0KVa-UF8wZMv9JRMUmbflqVAVP4BktI`,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    }
  })
}

export const getPhotoReference = (ref) => {
  return axios({
    method: 'get',
    url: 'https://'+ mapBase + `place/photo?maxwidth=200&photoreference=${ref}&key=AIzaSyBC0KVa-UF8wZMv9JRMUmbflqVAVP4BktI`,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    }
  })
}

