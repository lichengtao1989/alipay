;(function() {
    
    var $commentList = $('#commentList'),
        _rest = false,
        _count = 0,
        _obj = {
            init: function() {
                this.render([{
                    face : "",
                    nick : "bbbb",
                    commentTime : new Date().valueOf(),
                    score : 4,
                    comment : "好评"
                }]).bindEvent();
                $(window).scroll();
            },
            renderTpl:function(data){
                data = data || [];
                var _html = "";
                var len = data.length;
                if(len > 0){
                    for(var i = 0 ; i < len;i++){
                        _html += '<dd>'
                                    +'<div class="_left" data-original="'+data[i].face+'"></div>'
                                        +'<div class="_right">'
                                            +'<div class="_top">'
                                                +'<p class="_name">'+data[i].nick+'</p>'
                                                +'<p class="_time">'+QccrCom.format(data[i].commentTime)+'</p>'
                                            +'</div>'
                                        +'<div class="_comment">'+QccrCom.score(data[i].score)+'</div>'
                                        +'<p class="_commentstr">'+data[i].comment+'</p>'
                                    +'</div>'
                                +'</dd>';
                    }
                }
                return _html;
            },
            render: function(data) {
                var _me = this;
                $commentList.html(_me.renderTpl(data));
                this.lazyload();
                QccrCom._hideLoading();
                return this;
            },
            lazyload: function() {
                $('#commentList ._left').picLazyLoad({
                    threshold: 100
                });
                return this;
            },
            showIndex: function(type) {
                var _el = $('#loadingMore p');
                type = type || '';
                if (type == "noData") {
                    _el.eq(1).show().siblings('p').hide();
                } else if (type == "showMore") {
                    _el.eq(0).show().siblings('p').hide();
                } else {
                    _el.eq(-1).show().siblings('p').hide();
                }
                return this;
            },
            bindEvent: function() {
                var _me = this;
                $(window).on('scroll', function() {
                    var scrollTop = $(window).scrollTop(), //滚动的高度
                        scrollHeight = $(document).height(), //页面高度
                        windowHeight = $(window).height(); //窗口高度
                    if (scrollTop + windowHeight >= scrollHeight - 150) {
                        if (!_rest) {
                            _rest = true;
                            _me.showIndex();
                            setTimeout(function() {
                                $commentList.append(_me.renderTpl([]));
                                _me.lazyload().showIndex('showMore');
                                _rest = false;
                                _count++;
                                if (_count >= 3) {
                                    _me.showIndex('noData');
                                    _rest = true;
                                }
                            }, 3000);
                        }
                    }
                });
                return this;
            }
        };
    _obj.init();
}());
