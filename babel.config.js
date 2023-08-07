module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage', // 按需引入 polyfill
                corejs: 3
            }
        ],
        [
            '@babel/preset-typescript' // 引用Typescript插件
        ]
    ],
    plugins: ['@babel/plugin-transform-runtime', '@babel/proposal-class-properties', '@babel/proposal-object-rest-spread']
};
