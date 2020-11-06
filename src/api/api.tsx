import axios from 'axios';
import { AsyncStorage } from 'react-native';

const TIMEOUT = 100;

// 52.187.177.12
export const BASEURL = 'http://10.0.0.21:3001';

axios.defaults.withCredentials = true;

export default {
  // get data user
  _getDataUser: async () => {
    const token = await AsyncStorage.getItem('jwt');
    var dataUser = [];
    const data = {
      token: token,
    };
    const json = JSON.stringify(data);
    await fetch(`${BASEURL}/api/user/get_info_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        dataUser = res;
      })
      .catch((error) => {
        alert(error);
      });
    return dataUser;
  },

  // get list trip
  getListAllTrip: async () => {
    var listAllTrip = [];
    await fetch(`${BASEURL}/api/trip/list_all_trip`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        listAllTrip = res.data;
      })
      .catch((error) => {
        alert(error);
      });
    return listAllTrip;
  },

  // get list user by trip id
  _getAllUserInTrip: async (tripId) => {
    var listUserInTrip = [];
    await fetch(`${BASEURL}/api/tripUser/list_all_user_by_tripId/${tripId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        listUserInTrip = res.data;
      })
      .catch((error) => {
        alert(error);
      });
    return listUserInTrip;
  },

  // save trip id
  _saveTripId: async (tripId) => {
    return tripId;
  },
};
