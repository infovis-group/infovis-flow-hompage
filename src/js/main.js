// 所有的独立html全部都需要引用

import { changeTheme } from './common/common';
import { getHomeconfig, getUrlParam } from './common/globalVar';

export let _saveMock;
export const userInfo = {};
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        changeTheme(getUrlParam('theme') ? getUrlParam('theme') : getHomeconfig('theme'));
        // 全局切换主题色
        mangoJam.addVariableListener('update', 'theme', (key) => {
            changeTheme(key);
        });
        _saveMock = (() => {
            return getUrlParam('savemock', 'false') === 'true';
        })();
    }
};
