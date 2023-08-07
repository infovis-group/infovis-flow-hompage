// 单独开卡
// mangoJam.sync('os', { action: 'openCard', id: 'testtt' });
new JamCard({
    id: 'testtt',
    name: '测试1',
    max: {
        draw($body) {
            //需要判断处理页面是否绘制，谨防造成多次绘制
            if ($body.children().length) {
                return;
            }
            this.$body.html('测试卡片');
        }
    },
    listeners: {
        // 监听jam.update() 后进入方法，用于卡片间通信
        testListener(jamCard, obj) {
            // this === jamCard 卡片信息
            // obj === jam.get('testListener')  更改的内容
        }
    }
});
