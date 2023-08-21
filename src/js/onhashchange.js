import { changeScreen } from './home';
/**
 * 获取url中的路径参数并进行匹配
 */
export function onHashChange(sidebarInfo, _initScreen) {
    // 获取url中的有效路径参数
    let hash = location.hash.slice(location.hash.indexOf('#') + 1);
    if (hash.charAt(0) === '/') {
        hash = hash.slice(1);
    }
    if (hash.charAt(hash.length - 1) === '/') {
        hash = hash.slice(0, hash.length - 1);
    }

    // 将路径参数转化为数组

    const screen = hash || _initScreen || 'home';
    changeScreen(screen, sidebarInfo[screen]?.hasSideBar);
}
