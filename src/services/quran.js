import axios from 'axios'
import { quranBase, quranID } from './init'

export const getSurahs = () => {
  return axios({
      method: 'get',
      url: 'https://api.quran.com/api/v4/chapters?language=en',
      // withCredentials: true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
      }
  })
}

export const getAyahFromSurah = (number, offset, limit) => {
  return axios({
      method: 'get',
      url: 'http://' + quranBase + `surah/${number}?offset=${offset}&limit=${limit}`,
      // withCredentials: true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
      }
  })
}

export const getAyahFromJuz = (number, offset, limit) => {
  return axios({
      method: 'get',
      url: 'http://' + quranBase + `juz/${number}/quran-uthmani?offset=${offset}&limit=${limit}`,
      // withCredentials: true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
      }
  })
}

export const getAyahFromSurahID = (number, offset, limit) => {
  return axios({
      method: 'get',
      url: 'https://' + quranID + `${number}/0/${offset}/${limit}`,
      // withCredentials: true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
      }
  })
}

export const getTranslationFromSurah = (number, offset, limit) => {
  console.log('http://' + quranBase + `surah/${number}/en.asad?offset=${offset}&limit=${limit}`)
  return axios({
      method: 'get',
      url: 'http://' + quranBase + `surah/${number}/en.asad?offset=${offset}&limit=${limit}`,
      // withCredentials: true,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
      }
  })
}