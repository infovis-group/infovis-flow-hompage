import { createApp } from 'vue';
import model from './alarmBrowsing.vue';
new JamCard({
    id: 'alarmBrowsing',
    name: '告警浏览',
    max: {
        draw($body) {
            //需要判断处理页面是否绘制，谨防造成多次绘制
            if ($body.children().length) {
                return;
            }
            this.vueApp = createApp(model);
            this.vueApp.mount($body[0]);
        },
        destroy() {
            this.vueApp.unmount() 
        }
    }
});