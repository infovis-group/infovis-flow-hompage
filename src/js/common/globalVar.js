import { confignize, getUrlParamsFromUrl, loadConf, ajaxCall } from './common';
import _ from 'lodash';

export const confPath = '../../common/conf/';
export const mockPath = `../../common/mockData/`;
export const urlPath =
    process.env.NODE_ENV === 'development' ? `http://192.168.201.95:18090` : 'logsApi'; //后台包位置
export const authPath =
    process.env.NODE_ENV === 'development' ? `http://192.168.201.201:8878` : 'commonApi'; //后台包位置

export let debugMode = process.env.NODE_ENV === 'development';

export const urlConfig = {
    test: {
        url: '',
        mockData: ''
    },
    getNetVisHostInfos:{
        url: urlPath + '/v1/ccs/op/traffic/getNetVisHostInfos',
        mockData: 'netVisHostMockData.json'
    },
    getRtNetNcInfos:{
        url: urlPath + '/v1/ccs/op/host/getRtNetNcInfos',
        mockData: 'getRtNetNcInfos.json'
    },
    getNetVisWarnInfos:{
        url: urlPath + '/v1/ccs/op/traffic/getNetVisWarnInfos',//告警浏览表格数据
        mockData: 'getNetVisWarnInfos.json'
    }
    
};

let externalUrls;
export function getExternalUrls(url) {
    if (externalUrls) {
        const _conf = loadConf('url.json');
        Object.keys(_conf).forEach((key) => {
            if (process.env.NODE_ENV === 'development' && 'url-dev' in _conf[key]) {
                externalUrls[key] = _conf[key]['url-dev'];
            } else {
                externalUrls[key] = _conf[key].url;
            }
        });
    }
    return externalUrls[url];
}

let urlParams;
export function getUrlParam(key) {
    if (!urlParams) {
        urlParams = getUrlParamsFromUrl(window.location.search);
        confignize(urlParams);
        debugMode = urlParams.getBoolean('debug', debugMode);
    }
    return key ? urlParams[key] : urlParams;
}
let HOME_CONFIG;
export function getHomeconfig(key) {
    if (!HOME_CONFIG) {
        HOME_CONFIG = loadConf('config.json', {});
    }
    return key ? HOME_CONFIG[key] : HOME_CONFIG;
}
