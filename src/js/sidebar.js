import { debug, loadConf } from './common/common';
// import { changeScreen } from './home';
import { userInfo } from './main';
import { onHashChange } from './onhashchange';
let _selectDom;
// 根绝sidebar.json生成侧边栏和卡片screen
const outterUrl = loadConf('config.json')?.externalUrl || '';
export function buildSideBar() {
    const sidebarConf = loadConf('sidebar.json');
    const _screenConfig = {};
    let _initScreen = null,
        _hasSideBar;
    const _sideBar = document.getElementById('sidebar');
    sidebarConf.root.forEach(_groupItem => {
        const _groupWrap = document.createElement('div');
        _groupWrap.className = 'group-wrap';
        _groupWrap.innerHTML = `
            ${_groupItem.name ? `<div class="group-title">${_groupItem.name}</div>` : ''}
            <div class="group-item"></div>
        `;
        const _infoCntr = document.createDocumentFragment();
        _groupItem.children.forEach(_key => buildItem(_key, _infoCntr));
        _groupWrap.lastElementChild.appendChild(_infoCntr);
        if (_sideBar) _sideBar.appendChild(_groupWrap);
    });
    function buildItem(_key, parentDom) {
        const _info = sidebarConf[_key];
        if (!_info) {
            debug(`sidebar.json not include key:${_key}`);
            return;
        }
        const _dom = document.createElement('div');
        _dom.className = 'item-cntr';
        if (_info.show === false) {
            _dom.classList.add('hidden');
        }
        _dom.id = _key;
        _dom.innerHTML = `
        <span class="icon iconfont">${_info.icon || ''}</span>
        <span class="item-cntr-text">${_info.name}</span>`;
        if (_info.src || _info.screen) {
            if (_initScreen === null && _info.default) {
                // 设置第一个default菜单
                _selectDom = _dom;
                _dom.classList.add('select');
                _initScreen = _key;
                _hasSideBar = _info.hasSideBar;
            }
            const _baseConf = {
                id: _key,
                name: _info.name,
                src: _info.src ? outterUrl + _info.src + '?userId=' + userInfo.userId : null
            };
            _screenConfig[_key] = _info.screen ? Object.assign(_baseConf, _info.screen) : _baseConf;
            debug('_screenConfig', _screenConfig);
            _dom.onclick = function () {
                if (_dom === _selectDom) {
                    return;
                }
                _dom.classList.add('select');
                if (_selectDom instanceof HTMLElement) _selectDom.classList.remove('select');
                _selectDom = _dom;
                // changeScreen(_key, _info.hasSideBar);
                location.hash = _key;
            };
        }

        if (!_info.children || _info.children.length === 0) {
            parentDom.appendChild(_dom);
            return;
        }
        // 展开子菜单的图标
        const _unflodIcon = document.createElement('span');
        _unflodIcon.className = 'icon iconfont expand';
        _unflodIcon.innerHTML = '&#xe666;';
        _dom.appendChild(_unflodIcon);
        let _flag = _info.open === true;
        _dom.onclick = function () {
            _flag = !_flag;
            if (_flag) {
                _warp.classList.add('open');
            } else {
                _warp.classList.remove('open');
            }
        };
        //子菜单的容器
        const _childrenWrap = document.createElement('div');
        _childrenWrap.className = 'children-wrap';
        _childrenWrap.style.setProperty('--children-count', _info.children.length);
        _info.children.forEach(_childKey => buildItem(_childKey, _childrenWrap));
        // 父容器
        const _warp = document.createElement('div');
        _warp.className = 'item-haschildren-wrap' + (_flag ? ' open' : '');
        _warp.appendChild(_dom);
        _warp.appendChild(_childrenWrap);
        parentDom.appendChild(_warp);
    }

    console.log(_screenConfig);
    window.jam = new Jam({
        screenCntr: document,
        screen: _screenConfig,
        layoutable: {
            canvas: document.getElementById('body-container')
        }
    });

    window.addEventListener('hashchange', () => {
        onHashChange(sidebarConf);
    });
    console.log('_initScreen', _initScreen);
    // changeScreen(_initScreen, _hasSideBar);

    let hash = location.hash.slice(location.hash.indexOf('#') + 1);
    if (!hash) {
        location.hash = _initScreen;
    } else {
        _initScreen = hash;
        _selectDom = document.getElementById(hash);
    }
    onHashChange(sidebarConf, _initScreen);
}
