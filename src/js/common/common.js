import axios from 'axios';
import { confPath, debugMode, mockPath, urlConfig } from './globalVar';
import { _saveMock, userInfo } from '../main';
import dayjs from 'dayjs';

/**
 *
 * @param  主题色 dark | light
 * @param  亮色颜色 todo
 */
export function changeTheme(themeColor, lightColor) {
    document.documentElement.setAttribute('data-theme', themeColor || 'dark');
    // document.body.style.setProperty('--theme-color-dark', lightColor);
}
/**
 * @param 'xx.html?a=1&b=true'
 * @returns {a:1,b:true}
 *  {}
 */
export function getUrlParamsFromUrl(url) {
    let _params = {};
    let _url = url.replace(/^.*\?/, '');
    let _hash = url.includes('#') ? url.replace(/^.*#/, '') : '';
    _url = _url.replace(/\#.*$/, '');
    if (_url !== '') {
        let paramList = _url.split('&');
        for (let i = 0; i < paramList.length; i++) {
            if (paramList[i].indexOf('=') < 0) {
                continue;
            }
            let keyVal = paramList[i].split('=');
            let _k = keyVal[0];
            let _v = decodeURI(keyVal[1]);
            if (_k in _params) {
                if (!(_params[_k] instanceof Array)) {
                    let _l = [];
                    _l.push(_params[_k]);
                    _params[_k] = _l;
                }
                _params[_k].push(_v);
            } else {
                _params[_k] = _v;
            }
        }
    }
    if (_hash !== '') {
        _params['#'] = _hash;
    }
    _params = unFlattenObject(_params);
    return _params;
}
function unFlattenObject(o) {
    let _ret = {};
    let _keys = Object.keys(o);
    for (let i = 0; i < _keys.length; i++) {
        let _arr = _keys[i].split('.');
        let _parent = _ret;
        for (let j = 0; j < _arr.length; j++) {
            let _key = _arr[j];
            if (!(_key in _parent)) {
                _parent[_key] = {};
            }
            if (j === _arr.length - 1) {
                _parent[_key] = o[_keys[i]];
            } else {
                _parent = _parent[_key];
            }
        }
    }
    return _ret;
}

export function confignize(_data) {
    _data.__proto__ = Object.create({
        get: function (_key, _default) {
            return _key in this ? this[_key] : _default;
        },
        getNumber: function (_key, _default) {
            return _key in this ? toNumber(this[_key]) : _default;
        },
        getString: function (_key, _default) {
            return _key in this ? String(this[_key]) : _default;
        },
        getBoolean: function (_key, _default) {
            return _key in this ? toBoolean(this[_key]) : _default;
        },
        getStringList: function (_key) {
            let _ret = [];
            if (_key in this) {
                _ret = String(this[_key])
                    .trim()
                    .split(',')
                    .map((el) => el.trim());
            }
            return _ret;
        }
    });
}

function toNumber(_o) {
    if (typeof _o === 'number') {
        return _o;
    } else {
        return Number(_o);
    }
}

function toBoolean(_o) {
    if (typeof _o === 'boolean') {
        return _o;
    } else if (String(_o).trim().toLowerCase() === 'true') {
        return true;
    } else if (String(_o).trim().toLowerCase() === 'false') {
        return false;
    } else {
        return Boolean(_o);
    }
}
/**
 * 获取common/conf目录下配置信息
 * @param {*} 文件名
 * @param {*} 默认值
 * @returns
 */

const okStatus = document.location.protocol === 'file:' ? 0 : 200;

export function loadConf(_filename, _default) {
    let _res = null;
    console.log(`Load config from <${_filename}>`);

    let xhr = new XMLHttpRequest();

    const _tt = `${confPath}${_filename}`;
    xhr.open('GET', _tt, false);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send();
    if (xhr.status === okStatus) {
        _res = JSON.parse(xhr.responseText);
    } else {
        console.error(`Failed load config from <${_filename}>`);
    }

    if (_res === null) {
        if (_default !== undefined) {
            _res = _default;
        } else {
            _res = {};
        }
    }
    if (!Array.isArray(_res)) {
        confignize(_res);
    }
    return _res;
}

export function debug(content) {
    if (!debugMode) {
        return;
    }
    if (content instanceof Error) {
        console.error(content.stack);
        return;
    }
    console.error(content);
}
// 通用方法
let ajaxCallingMap = {};

export function ajaxCall(
    key,
    opt = {
        success() {},
        error() {},
        type: 'get',
        useMock: false,
        headers: {}
    }
) {
    if (!(key in urlConfig) && key !== '@_@') {
        console.error(`no ${key} in urlConfig`);
        return;
    }
    const uniqId = opt.uniqId ? opt.uniqId : key;
    if (uniqId in ajaxCallingMap) {
        if (opt.abortCurrent) {
            console.log('<' + uniqId + '> current loading request aborted.');
            ajaxCallingMap[uniqId].abort();
            typeof opt.abortCurrent === 'function' && opt.abortCurrent();
        } else {
            console.log('<' + uniqId + '> data is loading right now, request ignored.');
            return;
        }
    }

    const _urlInfo =
        key === '@_@'
            ? {
                  url: opt.url,
                  mockData: opt.mockData
              }
            : urlConfig[key];
    let _useMock = false;
    const URL = (() => {
        const _mockInfo = getMockConfig(_urlInfo.url);
        if (opt.useMock === true || _globalMockFlag || (_mockInfo && _mockInfo.block === true)) {
            let _newURL = _urlInfo.mockData;
            if (_mockInfo && _mockInfo.alternative) {
                _newURL = _mockInfo.alternative;
            }
            if (debugMode) {
                console.log(_urlInfo.url + '的返回已使用' + _newURL + '替换');
            }
            _useMock = true;
            return _newURL;
        }
        return _urlInfo.url;
    })();

    if (_saveMock && _urlInfo.mockData && !URL.endsWith('.json')) {
        let _data = {
            mockPath: _urlInfo.mockData.replaceAll(/\.\.\//g, '')
        };
        if (URL.match(/^.*\?/)) {
            Object.assign(_data, getUrlParamsFromUrl(URL));
        }
        let _optData = opt.params;
        if (_optData && typeof _optData === 'object') {
            Object.assign(_data, _optData);
        } else if (_optData && opt.type === 'post') {
            let _json = JSON.parse(_optData);
            Object.assign(_data, _json);
            _data = JSON.stringify(_data);
        } else if (_optData && typeof _optData === 'string') {
            let _json = getUrlParamsFromUrl(_optData);
            Object.assign(_data, _json);
            _data = map2UrlParam(_data);
        }
        ajaxOption.data = _data;
    }

    function _successFunc(result) {
        let _cause = null;
        if (opt.loadFile) {
            opt.success(result);
        } else {
            if (result != null) {
                _cause = 'cause' in result ? result.cause : result.message;
                if (('code' in result || 'state' in result) && 'data' in result) {
                    debug('Loading <' + uniqId + '> data state: ' + result.state);
                    let _code = 'state' in result ? result.state : result.code;
                    _code = parseInt(_code);
                    if (_code > -1) {
                        try {
                            opt.success(result?.data || result, _cause);
                            debug(`success func called, URL: ${URL}`);
                            // downloadMock(ajaxOption.mockData, result.data);
                            _cause = null;
                        } catch (err) {
                            console.error('Failed to call success function.', err);
                        }
                        // setLocalStorage();
                    } else {
                        if (!_cause) {
                            _cause = 'returned state is -1';
                            if (opt?.error) {
                                opt.error(result?.msg || result);
                            }
                        }
                    }
                } else {
                    try {
                        opt.success(result?.data || result, _cause);
                        debug(`success func called, URL: ${URL}`);
                        // downloadMock(ajaxOption.mockData, result);
                        _cause = null;
                    } catch (err) {
                        console.error('Failed to call success function.', err);
                    }
                }
            } else {
                _cause = 'Result recieved of <' + uniqId + '> is null.';
            }
            if (_cause != undefined && _cause != null) {
                try {
                    failedFunc(_cause);
                    debug(`failed func called, URL: ${URL}`);
                } catch (err) {
                    debug('Failed to call failure function.');
                }
            }
        }
    }

    let mockData = mockPath + _urlInfo.mockData;
    if (!mockData.endsWith('.json')) {
        mockData += '.json';
    }
    const controller = new AbortController();
    // priority: ajaxOption.delayTime > urlParams.ajaxTo > homepageConfig.ajaxTo > 10-by-default
    let _delayTime = 10;
    const config = {
        url: _urlInfo.url,
        params: opt?.params || {},
        method: opt?.type || 'get',
        timeout: _delayTime * 1000,
        signal: controller.signal
    };
    if (config.method === 'post') {
        config.data = config.params;
        delete config.params;
    }
    if (opt.responseType) {
        config.responseType = opt.responseType;
    }
    if (opt.queryPost) {
        //post请求地址拼接请求数据
        config.url = opt.url;
    }
    if (opt.headers) {
        config.headers = opt.headers;
    }
    axios(config)
        .then(function (response) {
            _successFunc(response.data);
        })
        .catch(function (error) {
            console.log('error', error);
            const status = error?.response?.status;
            if (mockData || [404, 405, 501].includes(status)) {
                axios.get(mockData).then(function (data) {
                    _successFunc(data.data);
                });
            }
        })
        .finally(() => {
            if (opt.complete) {
                opt.complete();
            }
            delete ajaxCallingMap[uniqId];
        });
    // ajaxCallingMap[uniqId] = controller;
}
function removeUrlParams(_src) {
    return _src.replace(/\?.*$/, '');
}

let mock = {};
let _globalMockFlag = false;

export function getMockConfig(key) {
    if (!mock) {
        mock = loadConf('mockConfig.json') || {};
        if ('all' in mock) {
            console.log('已设置为全局使用mock数据');
            _globalMockFlag = true;
        }
    }
    return mock[key];
}
export const arrayFunc = {
    remove(arr, val) {
        var index = arr.indexOf(val);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },
    unique(arr) {
        const _arr = [];
        for (var i = 0; i < arr.length; i++) {
            if (!_arr.includes(arr[i])) {
                _arr.push(arr[i]);
            }
        }
        return _arr;
    },
    diff(arr1, arr2) {
        return arr1.filter((item) => {
            return !arr2.includes(item);
        });
    },
    union(arr1, arr2) {
        return arr1.concat(arr2.filter((el) => arr1.indexOf(el) < 0));
    }
};

let someCardIsMoving = false;
let __baseZIndex = 10086;

export function buildClock(_opt) {
    _opt = _opt || {};
    let _alreadyBuilt = false;
    let _clockWrapper = document.querySelector('.clock-wrapper');
    let _clock;
    if (_clockWrapper) {
        _alreadyBuilt = true;
        _clock = _clockWrapper.querySelector('.clock');
    } else {
        _clockWrapper = document.createElement('div');
        _clockWrapper.classList.add('clock-wrapper');
        _clock = document.createElement('div');
        _clock.classList.add('clock');
        _clockWrapper.appendChild(_clock);
    }
    ['top', 'left', 'bottom', 'right', 'font-size'].forEach((_key) => {
        if (_opt[_key]) {
            if (_key === 'bottom') {
                _clockWrapper.style.top = 'unset';
            }
            if (_key === 'right') {
                _clockWrapper.style.left = 'unset';
            }
            _clockWrapper.style[_key] = _opt[_key];
        } else {
            _clockWrapper.style[_key] = '';
        }
    });
    _clock.className = 'clock ' + (_opt.class ? _opt.class : '');
    if (_alreadyBuilt) {
        return;
    }
    _clock.innerHTML = `
        <div class="clock-face">
            <div class="buttons">
                <button class="anabutt"></button>
                <button class="labelbutt" onclick="event.stopPropagation();this.parentElement.parentElement.parentElement.classList.toggle('labelall')"></button>
                <button class="shapebutt" onclick="event.stopPropagation();this.parentElement.parentElement.parentElement.classList.toggle('square')"></button>
                <button class="contbutt" onclick="event.stopPropagation();this.parentElement.parentElement.parentElement.classList.toggle('continuous')"></button>
            </div>
            <div class="marks"></div>
            <div class="labels">
                <div class="label-0 p" data-b="12" data-a="6" style="--deg: 0deg;"></div>
                <div class="label-1 s" data-b="1" data-a="7" style="--deg: 30deg;"></div>
                <div class="label-2 s" data-b="2" data-a="8" style="--deg: 60deg;"></div>
                <div class="label-3 p" data-b="3" data-a="9" style="--deg: 90deg;"></div>
                <div class="label-4 s" data-b="4" data-a="10" style="--deg: 120deg;"></div>
                <div class="label-5 s" data-b="5" data-a="11" style="--deg: 150deg;"></div>
            </div>
            <div class="hands">
                <div class="hand hour"></div>
                <div class="hand min"></div>
                <div class="hand second"></div>
            </div>
        </div>
    `;

    function setDate() {
        const now = new Date();
        const seconds = now.getSeconds();
        const mins = now.getMinutes();
        const hours = now.getHours();

        const _secOfDay = hours * 60 * 60 + mins * 60 + seconds;
        let secondsDegrees = (_secOfDay / 60) * 360 + 90;
        if (_clock.classList.contains('continuous')) {
            secondsDegrees += 6;
        }
        const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
        const hoursDegrees = (hours / 12) * 360 + (mins / 60) * 30 + 90;

        _clock.style.setProperty('--sec-deg', toFixed(secondsDegrees, 1) + 'deg');
        _clock.style.setProperty('--min-deg', toFixed(minsDegrees, 1) + 'deg');
        _clock.style.setProperty('--hr-deg', toFixed(hoursDegrees, 1) + 'deg');

        _clock.setAttribute('data-time', dayjs().format('HH:mm:ss'));
        _clock.setAttribute('data-year', now.getFullYear());
        _clock.setAttribute('data-month', now.getMonth() + 1);
        _clock.setAttribute('data-date', now.getDate());
    }
    setDate();
    setTOInterval(setDate, 1000, true);
    makeMovable(
        _clockWrapper,
        document.body,
        function () {
            _clock.style.cursor = 'pointer';
            _clockWrapper.classList.remove('moving');
            printPosInVhVw(_clockWrapper, { topBias: '48px' });
        },
        function () {
            _clock.style.cursor = 'grabbing';
            _clockWrapper.classList.add('moving');
        }
    );
    _clockWrapper.addEventListener('click', function () {
        if (_clockWrapper.classList.contains('moving')) {
            return;
        }
        _clock.classList.toggle('analog');
    });
    document.body.appendChild(_clockWrapper);
    let _scrollTo = -1;
    _clock.addEventListener('wheel', function (e) {
        // scroll to zoom
        clearTimeout(_scrollTo);
        _clockWrapper.style.setProperty('--ts-factor', 0);
        e.preventDefault();
        const _zoom = parseFloatFailover(_clockWrapper.style.getPropertyValue('--zoom') || 1);
        let _newZoom = _zoom + e.deltaY / 1000;
        if (_newZoom < 1) {
            _newZoom = 1;
        }
        _clockWrapper.style.setProperty('--zoom', _newZoom);
        _scrollTo = setTimeout(function () {
            _clockWrapper.style.removeProperty('--ts-factor');
        }, 200);
    });
}

function destroyClock() {
    let _clockWrapper = document.querySelector('.clock-wrapper');
    if (_clockWrapper) {
        _clockWrapper.parentNode.removeChild(_clockWrapper);
    }
}

function toFixed(number, decimalPlace) {
    return round(number, decimalPlace).toFixed(decimalPlace);
}

function round(number, decimalPlace) {
    decimalPlace = decimalPlace || 0;
    if (number === undefined || number === null || isNaN(number)) {
        return 0;
    }
    if (typeof number === 'string') {
        let _matchee = number.match(/[+-]?\d+(\.\d+)?/g);
        if (_matchee) {
            number = parseFloat(_matchee[0]);
        } else {
            return 0;
        }
    }
    return parseFloat(
        Math.round(number * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace)
    );
}

function convert2Px(lengthInV) {
    if (typeof lengthInV === 'number') {
        return lengthInV + 'px';
    }
    if (String(lengthInV).endsWith('px')) {
        return lengthInV;
    }
    var ret = lengthInV;
    if (String(lengthInV).endsWith('vh')) {
        ret =
            round((document.documentElement.clientHeight * parseFloat(lengthInV)) / 100, 2) + 'px';
    } else if (String(lengthInV).endsWith('vw')) {
        ret =
            round((document.documentElement.clientWidth * parseFloat(lengthInV)) / 100, 2) + 'px';
    } else if (String(lengthInV).endsWith('rem')) {
        ret =
            round(
                parseFloat(
                    window.getComputedStyle(document.documentElement).getPropertyValue('font-size')
                ) * parseFloat(lengthInV),
                2
            ) + 'px';
    }
    return ret;
}

function convert2Vh(heightInPixel, decimal) {
    return (
        round(
            (parseFloat(heightInPixel) / document.documentElement.clientHeight) * 100,
            isNaN(decimal) ? 2 : decimal
        ) + 'vh'
    );
}

function convert2Vw(widthInPixel) {
    return (
        round((parseFloat(widthInPixel) / document.documentElement.clientWidth) * 100, 2) + 'vw'
    );
}

function printPosInVhVw(_el, _opt) {
    const _rect = _el.getBoundingClientRect();
    const _top = parseFloatFailover(
        convert2Vh(_rect.top - parseFloatFailover(convert2Px(_opt.topBias || 0)))
    );
    const _left = parseFloatFailover(
        convert2Vw(_rect.left - parseFloatFailover(convert2Px(_opt.leftBias || 0)))
    );
    const _height = parseFloatFailover(convert2Vh(_rect.height));
    const _width = parseFloatFailover(convert2Vw(_rect.width));
    const _pos = {};
    if (_top + _height > 66) {
        _pos.bottom = `${round(100 - _top - _height, 2)}vh`;
    } else {
        _pos.top = `${_top}vh`;
    }
    if (_left + _width > 66) {
        _pos.right = `${round(100 - _left - _width, 2)}vw`;
    } else {
        _pos.left = `${_left}vw`;
    }
    if (_opt) {
        if (_opt.topBias && _pos.top) {
            _pos.top = `calc(${_pos.top} + ${_opt.topBias})`;
        }
        if (_opt.leftBias && _pos.left) {
            _pos.left = `calc(${_pos.left} + ${_opt.leftBias})`;
        }
        if (_opt.BottomBias && _pos.bottom) {
            _pos.bottom = `calc(${_pos.bottom} + ${_opt.bottomBias})`;
        }
        if (_opt.rightBias && _pos.right) {
            _pos.right = `calc(${_pos.right} + ${_opt.rightBias})`;
        }
    }
    console.log(`Clock pos ${JSON.stringify(_pos)}`);
}

function setTOInterval(callback, delay, alignToSec = false) {
    let _id = setTimeout(tt, delay);
    function tt() {
        callback();
        let _alignedDelay = delay;
        if (delay >= 1000 && alignToSec) {
            _alignedDelay = delay - new Date().getMilliseconds();
        }
        _id = setTimeout(tt, _alignedDelay);
    }
    return _id;
}

function clearTOInterval(_id) {
    clearTimeout(_id);
}
function parseFloatFailover(_target, _default) {
    let _ret = parseFloat(_target);
    if (isNaN(_ret) && _default !== undefined) {
        _ret = _default;
    }
    return _ret;
}
let cardMovingTo = {};
function makeMovable(cardId, containment, extraProcess, extraStartProcess) {
    if (cardId == undefined) {
        return;
    }
    var $body = $('body');
    if (containment == undefined) {
        containment = $body;
    }
    var offset = [];
    let $card;
    if (typeof cardId === 'string') {
        $card = $('#' + cardId);
    } else {
        $card = $(cardId);
    }
    // var $cardTitle = $('#' + cardId + '-title');
    // var $handle = $('#' + cardId + ' .movablehandle');
    // if ($handle.length == 0) {
    //   $card.append('<div class="movablehandle"></div>');
    //   $handle = $('#' + cardId + ' .movablehandle');
    // }
    if (!cardMovingTo.hasOwnProperty(cardId)) {
        cardMovingTo[cardId] = -1;
    }
    $card.addClass('movable');
    $card.on({
        mousedown: function () {
            setToFront(this);
        },
        mouseenter: function (e) {
            $card.draggable({
                enable: true,
                containment: containment,
                iframeFix: true,
                scroll: false,
                delay: 50,
                start: function (e, ui) {
                    clearTimeout(cardMovingTo[cardId]);
                    someCardIsMoving = true;
                    $('iframe').css({
                        'pointer-events': ''
                    });
                    $card.css({
                        transition: 'none',
                        bottom: 'unset',
                        right: 'unset'
                    });
                    // hideCard(this);
                    if (extraStartProcess) {
                        extraStartProcess();
                    }
                },
                drag: function (e, ui) {},
                stop: function (e, ui) {
                    clearTimeout(cardMovingTo[cardId]);
                    someCardIsMoving = false;
                    $('iframe').css({
                        'pointer-events': ''
                    });
                    $card.css({
                        transition: ''
                    });
                    if (extraProcess != undefined) {
                        cardMovingTo[cardId] = setTimeout(function () {
                            extraProcess();
                        }, 200);
                    }
                    // $('#' + cardId).draggable('destroy');
                    // unhideCard(this);
                }
            });
        },
        mouseleave: function (e) {
            if (!someCardIsMoving && $card.hasClass('.ui-draggable')) {
                $card.draggable('destroy');
            }
        }
    });
}

function setToFront(_el) {
    if (_el.classList.contains('z-index-max')) {
        return;
    }
    const _switchables = Array.from(document.querySelectorAll('.z-index-switchable'));
    if (!_switchables.includes(_el)) {
        _el.classList.add('z-index-switchable');
    }
    _switchables
        .filter((_s) => _s !== _el)
        .sort((_a, _b) => _a.style.zIndex - _b.style.zIndex)
        .concat([_el])
        .forEach((_sorted, _idx, _arr) => {
            _sorted.style.zIndex = __baseZIndex + _idx;
            if (_idx === _arr.length - 1) {
                _sorted.classList.add('z-index-max');
            } else {
                _sorted.classList.remove('z-index-max');
            }
        });
}
