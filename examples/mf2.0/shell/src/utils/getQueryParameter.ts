import { CAN_USE_DOM } from './constants';

const getQueryParameter = (_name: string, _url: string) => {
  let url = _url;
  if (!url && CAN_USE_DOM) {
    url = window.location.href;
  }
  const name = _name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export { getQueryParameter };
