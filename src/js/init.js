import { loadConf } from './common/common';

export function buildBaseHtml() {
    if (document.getElementById('body-container')) {
        return;
    }
    document.body.innerHTML = `
    <div id="main-container">
        <div id="header">设 备 级 流 量 大 屏</div>
        <div class="content">
            <div id="sidebar"></div><div id="body-container"></div>
        </div>
    </div>
    `;
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
