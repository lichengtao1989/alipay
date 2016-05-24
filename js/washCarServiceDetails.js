;(function() {
    var $wap = $('#warpBox'),
        _rest = false,
        _obj = {
            init: function() {
                this.bindEvent().render();
            },
            render: function() {
                QccrCom._hideLoading();
                return this;
            },
            bindEvent: function() {
                var _me = this;
                    $wap.on({
                        click : function(){
                            console.log('前往评论列表');
                        }
                    },'#goToCommentList')
                    .on({
                        click : function(){
                            var _src = this.getAttribute('data-src');
                            QccrCom.showImg(_src);
                        }
                    },'.layImg')
                    .on({
                        click : function(){
                            var price = $(this).attr('data-price');
                            console.log(price);
                        }
                    },'#orderByQuan dd')
                    .on({
                        click : function(){
                            var price = $(this).attr('data-price');
                            QccrCom.confirm({
                                title : "请在爱车洗完之后，再进行付款。",
                                noBtn : "取消",
                                yesBtn : "去付款",
                                yesFn : function(){
                                    console.log(price);
                                }
                            })
                        }
                    },'#orderUnQuan dd');
                return this;
            }
        };
    _obj.init();
}());
