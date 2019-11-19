import moment from 'moment';
import 'moment/locale/vi';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { Linking, Platform } from 'react-native';

// validate fields
export const validateEmpty = field => {
  return field !== '';
};

// validate email
export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

// validate phone number
export const validatePhone = phone => {
  // const regex = /^0(1\d{9}|8\d{8}|9\d{8})$/;
  const regex = /((09|03|07|08|05)+([0-9]{8})\b)$/;
  return regex.test(phone);
};

// format date
export const formatDate = date => {
  return moment(date).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')
    ? 'Today'
    : moment(date).format('DD/MM/YYYY hh:mm');
};

// validate name
export const validateName = name => {
  const regex = /^[^0-9 *&^$#@!(){}\[\]\\//]+[^0-9*&^$#@!(){}\[\]\\//]+$/;
  return regex.test(name);
};

// change alias
export const changeAlias = alias => {
  let str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ {2}|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ {2}|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    '-'
  );
  str = str.replace(/-+-/g, '-');
  str = str.replace(/^\-+|\-+$/g, '');
  return str;
};

// get user position
export const getUserPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      }
    );
  });
};

// format money
export const formatMoney = (number, n = 2, x = 3) => {
  const re = `\\d(?=(\\d{${x}})+${n > 0 ? '\\.' : '$'})`;
  return Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), '$& ');
};

// check image url
export const checkURLImg = url => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

// open web link
export const openURL = (url, isWeb) => {
  let newUrl = url;
  if (
    isWeb &&
    newUrl.indexOf('http://') < 0 &&
    newUrl.indexOf('https://') < 0
  ) {
    newUrl = `http://${newUrl}`;
  }
  Linking.canOpenURL(newUrl)
    .then(supported => {
      if (!supported) {
      } else {
        return Linking.openURL(newUrl);
      }
    })
    .catch(err => {});
};

// format date by locale relative time
export function formatDateByRelativeTimeLocale(date, locale) {
  moment.locale(locale);
  const diffTime = moment(
    moment(date).format('YYYYMMDD HHmm'),
    'YYYYMMDD HHmm'
  ).fromNow();
  return diffTime;
}

// convert array to object
export function convertArrayToObject(arr, key) {
  return _.reduce(
    arr,
    (acc, cur) => {
      acc[cur[key]] = cur;
      return acc;
    },
    {}
  );
}

// check if device has notch or not
export const hasNotch = DeviceInfo.hasNotch();

// check platform
export const isIOS = Platform.OS === 'ios';

// check isPad

export const isPad = Platform.isPad;

// convert hex to rgba
export const hexToRGBA = (hex, opacity) => {
  return (
    'rgba(' +
    (hex = hex.replace('#', ''))
      .match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
      .map(function(l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .concat(opacity || 1)
      .join(',') +
    ')'
  );
};

// convert hex to rgb
export const hexToRGB = hex => {
  return (
    'rgba(' +
    (hex = hex.replace('#', ''))
      .match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
      .map(function(l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .join(',') +
    ')'
  );
};

// convert rgb to hex
export const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
