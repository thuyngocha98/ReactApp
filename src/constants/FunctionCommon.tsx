import { BASEURL } from '../api/api';

export function number2money(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const thumbnails = {
  avatar0: require('../../assets/avatar/avatar0.png'),
  avatar1: require('../../assets/avatar/avatar1.png'),
  avatar2: require('../../assets/avatar/avatar2.png'),
  avatar3: require('../../assets/avatar/avatar3.png'),
  avatar4: require('../../assets/avatar/avatar4.png'),
  avatar5: require('../../assets/avatar/avatar5.png'),
};

export const transaction = {
  avatar6: require('../../assets/avatar/dollar.png'),
  avatar7: require('../../assets/avatar/transaction.png'),
  avatar8: require('../../assets/avatar/transaction1.png'),
  avatar9: require('../../assets/avatar/wallet.png'),
};

export function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const thumbnail = (Url) =>
  Url.length > 2 ? { uri: `${BASEURL}/images/avatars/${Url}` } : thumbnails['avatar' + Url];
