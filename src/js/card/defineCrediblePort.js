import { createApp } from 'vue';
import model from './defineCrediblePort.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import '../../css/elePlus.scss';

new JamCard({
    id: 'defineCrediblePort',
    name: '定义可信主机',
    max: {
        draw($body) {
            //需要判断处理页面是否绘制，谨防造成多次绘制
            if ($body.children().length) {
                return;
            };
            this.vueApp = createApp(model);
            this.vueApp.use(ElementPlus, {
                locale: zhCn
            });
            this.vueApp.mount($body[0]);
        },
        destroy() {
            this.vueApp.unmount() 
        }
    }
});