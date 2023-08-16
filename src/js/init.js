import { loadConf } from './common/common';
import { buildSideBar } from './sidebar';

export function buildBaseHtml() {
    if (document.getElementById('body-container')) {
        return;
    }
    document.body.innerHTML = `
    <div class="main-container">
        <div id="header">设 备 级 流 量 大 屏</div>
        <div id="sidebar"></div>
        <div id="body-container"></div>
    </div>
    `;

    buildSideBar();
}
export function getExternalCard() {
    loadConf('card.json', []).forEach(_info => {
        new JamCard({
            id: _info.id,
            name: _info.name,
            icon: _info.icon,
            src: () => {
                return _info.src + window.location.search;
            }
        });
    });
}
