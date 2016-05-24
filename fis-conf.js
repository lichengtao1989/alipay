//fis3 release -d ./dist
fis.config.set('modules.postpackager','simple');
fis.config.set('pack', {
    '/pkg/lib.js': [
        '/js/lib/zepto.min.js',
        '/js/lib/fastclick.js',
        '/js/lib/qccrCom.js',
        '/js/lib/picLazyLoad.js'
    ]
});

fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

