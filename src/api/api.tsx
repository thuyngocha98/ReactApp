
import axios from 'axios';

const TIMEOUT = 100
// const BASEURL = 'http://192.168.0.135:3000/'
const BASEURL = 'http://139.180.141.68/coreapiccx/'

axios.defaults.withCredentials = true

export default {


    getProducts: async (pageIndex = 1, pageSize = 8) => {
        try {
            let url = BASEURL + 'api/be_tree/gettreesasync';
            const response = await axios.get(url, { params: { pageIndex: pageIndex, pageSize: pageSize } });
            // handle success          
            //console.log(response);
            return response.data.data;
        }
        catch (error) {
            // handle error
            console.log(error);
        }
    },

    
    //
    postOrder: async (order) => {
        try {
            let url = BASEURL + '/api/BE_Order/CreateOrderAsync';
            const response = await axios.post(url, {
                "firstName": order.firstName,
                "email": order.email,
                "address": order.address,
                "phone": order.phone,
                "districtGuid": order.districtGuid,
                "provinceGuid": order.provinceGuid,
                "ghi_chu_cua_khach_hang": order.ghi_chu_cua_khach_hang,
                "cartList": order.cartList
            });
            return response.data.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}