import { loadConf } from './common/common';

export function buildBaseHtml() {
    if (document.getElementById('body-container')) {
        return;
    }
    document.body.innerHTML = `
    <div class="main-container">
        <div id="header">
            <div class="left">
                <div class="img"><img src="../../jsbscs-logs-common/image/title.png" /></div>
                <div class="title">监控日志</div>
            </div>
            <div class="user-info">
                
            </div>
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
