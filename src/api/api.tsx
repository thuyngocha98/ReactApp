
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const TIMEOUT = 100;

// 52.187.177.128
export const BASEURL = 'http://192.168.1.12:3001'

axios.defaults.withCredentials = true;

export default {


    // getProducts: async (pageIndex = 1, pageSize = 8) => {
    //     try {
    //         let url = BASEURL + 'api/be_tree/gettreesasync';
    //         const response = await axios.get(url, { params: { pageIndex: pageIndex, pageSize: pageSize } });
    //         // handle success
    //         //console.log(response);
    //         return response.data.data;
    //     }
    //     catch (error) {
    //         // handle error
    //         console.log(error);
    //     }
    // },

    //
    // postOrder: async (order) => {
    //     try {
    //         let url = BASEURL + '/api/BE_Order/CreateOrderAsync';
    //         const response = await axios.post(url, {
    //             "firstName": order.firstName,
    //             "email": order.email,
    //             "address": order.address,
    //             "phone": order.phone,
    //             "districtGuid": order.districtGuid,
    //             "provinceGuid": order.provinceGuid,
    //             "ghi_chu_cua_khach_hang": order.ghi_chu_cua_khach_hang,
    //             "cartList": order.cartList
    //         });
    //         return response.data.data;
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // },


    // get data user
    _getDataUser: async () => {
        const token = await AsyncStorage.getItem('jwt');
        var dataUser = [];
        const data = {
            token: token
        };
        const json = JSON.stringify(data);
        await fetch(`${BASEURL}/api/user/get_info_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: json
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
                Accept: 'application/json'
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
    _getAllUserInTrip: async tripId => {
        var listUserInTrip = [];
        await fetch(`${BASEURL}/api/tripUser/list_all_user_by_tripId/${tripId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
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
    }
}
