import { loadConf } from './common/common';

export function buildBaseHtml() {
    if (document.getElementById('body-container')) {
        return;
    }

    // <div class="img"><img src="../../common/image/title.png" /></div>
    // <div class="title">项目名</div>
    document.body.innerHTML = `
    <div class="main-container">
        <div id="header">
        设备级流量大屏
        </div>
        <div id="sidebar"></div>
        <div id="body-container"></div>
    </div>
    `;
}
export function getExternalCard() {
    loadConf('card.json', []).forEach((_info) => {
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
