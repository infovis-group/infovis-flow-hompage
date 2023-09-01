import '../css/home.scss';
import '../css/common.scss';
import { buildBaseHtml, getExternalCard } from './init';
import { buildSideBar } from './sidebar';
import './card/main';
// import { buildClock } from './common/common';

let sidebarStatusTemp = null;
export function changeScreen(key, hasSideBar) {
    console.log('jam.current', jam.current);
    console.log('key', key);
    if (sidebarStatusTemp !== hasSideBar) {
        sidebarStatusTemp = hasSideBar;
        const mainContainer = document.getElementById('main-container');
        let bodyContainer = document.getElementById('body-container');
        if (!hasSideBar) {
            try {
                mainContainer.getElementsByClassName('content')[0].removeChild(bodyContainer);
            } catch (error) {
                console.warn(error);
            }
            document.body.appendChild(bodyContainer);
            mainContainer.classList.add('hidden');
        } else {
            try {
                document.body.removeChild(bodyContainer);
            } catch (error) {
                console.warn(error);
            }
            mainContainer.getElementsByClassName('content')[0].appendChild(bodyContainer);
            mainContainer.classList.remove('hidden');
        }
    }
    if (jam.current !== key) {
        jam.buildScreen(key);
    }
}
$(document).ready(() => {
    buildBaseHtml();
    getExternalCard();
    buildSideBar();
    const TITLE = document.getElementById('header');
    TITLE.addEventListener('click', function () {
        location.hash='home'
    });
    // buildClock({ bottom: '0.6rem', right: '0.6rem' });
    // 设置全局监听关卡，开卡
    mangoJam.addVariableListener('update', 'os', function (_data) {
        if (!_data) {
            return;
        }
        const id = _data.id;
        switch (_data.action) {
            case 'openCard':
                if (!_data.pos) {
                    _data.pos = {
                        top: '20%',
                        left: '20%',
                        height: '60%',
                        width: '60%'
                    };
                }
                JamCard.buildCard(_data);
                break;
            case 'closeCard':
                const card = JamCard.getCard(id);
                if (card) {
                    card.destroy();
                }
                break;
            case 'openScreen':
                //todo 切换屏幕
                break;
        }
    });
});

// 幕布
const curtainDom = document.createElement('div');
curtainDom.id = 'body-curtain';
curtainDom.onclick = function () {
    $('.jamui-card.movable').find('.close-butt').trigger('click');
};

JamCard.index = 1000;
let _curtainFlag = false;
JamCard.remove = function (card) {
    if (!card.$max) return;
    mangoJam.sync('os', null);
    if ($('.jamui-card.movable').length === 1) {
        curtainDom.remove();
    }
};
JamCard.afterBuild = function () {
    const _parent = this.$max.parent();
    if (_parent.hasClass('edit')) {
        return;
    }
    setTimeout(() => {
        if (!_curtainFlag && this.$max.hasClass('movable')) {
            document.body.appendChild(curtainDom);
        }
    }, 5);
};
