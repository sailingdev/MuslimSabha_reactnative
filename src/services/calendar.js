import axios from 'axios'
import moment from 'moment'
import { hijriBase } from './init'

export const getTodayDate = () => {
  let date = moment().format('DD-MM-YYYY')
  return axios({
      method: 'get',
      url: 'http://' + hijriBase + `gToH?date=${date}`,
      // withCredentials: true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
      }
  })
}

export const getPrayerTimes = (timestamp, lat, long) => {
  return axios({
      method: 'get',
      url: 'http://' + hijriBase + `timings?latitude=${lat}&longitude=${long}&method=4`,
      // withCredentials: true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
      }
  })
}