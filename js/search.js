(function(){
	var _searchHistory = QccrCom.getItem('washCarServiceHistory') || [];
	var hasHistory = _searchHistory.length > 0 ? true : false;
	var _keyword = '';//缓存上一次搜索
	var _history = $('#historySearch');
	var _cancel = $('#cancelBtn');
	var _searchInput = $('#searchInput');
	var _washCarList = $('#washCarList');


	var _obj = {

		init : function(){
			this.bindEvent().renderHistory(_searchHistory);
		},
		renderHistory : function(data){
			var _html = '',
				len = data.length;
			if(len > 0){
				_html +='<dt>搜索历史</dt>';
				for(var i = 0 ; i < len; i++){
					_html += '<dd data-key="'+data[i]+'">'+data[i]+'</dd>'
				}
				_html += '<dt class="clear">清除历史纪录</dt>'
				_history.html(_html);
			}
			return this;
		},
		addHistory : function(data){
			var _data = QccrCom.getItem('washCarServiceHistory') || [];
				if(_data.indexOf(data) == -1){
					_data.push(data);
				}
				QccrCom.setItem('washCarServiceHistory',_data);
				hasHistory = true;
				this.renderHistory(_data);
			return this;
		},
		removeHistory : function(){
			QccrCom.clearItem('washCarServiceHistory');
			hasHistory = false;
			this.hideHistory();
			_history.html('');
			return this;
		},
		search : function(val){
			var _me = this;
			_keyword = val;
			_me.hideHistory().addHistory(_keyword);
			_searchInput.blur();
			var _data = [
                	{
                		comment : 4.3,
						openTime : "10:00",
						closeTime : "22:30",
						timeStemp : new Date().valueOf(),
						isUsed : true
                	},
                	{
                		comment : 3,
                		openTime : "10:00",
						closeTime : "23:00",
						timeStemp : new Date().valueOf()
                	},
                	{
                		comment : 3.3,
                		openTime : "0:00",
						closeTime : "23:59",
						timeStemp : new Date().valueOf()
                	}
                ];
                _washCarList.html(_me.listsTpl(_data));
                _me.lazyload();
			return;
			$.ajax({
				url: '/path/to/file',
				dataType: 'json',
				data: {keyword: _keyword},
				success : function(resp){

				},
				error : function(){
					QccrCom.setMsg('网络错误,请稍后再试');
				}
			});
			
		},
		lazyload: function() {
            _washCarList.find('.layImg').picLazyLoad({
                threshold: 100
            });
            return this;
        },
		listsTpl : function (data){
			data = data || [];
			var _len = data.length,
				_html = '';
				if(_len > 0){
					for(var i = 0;i < _len;i++){
						var _isSleep = QccrCom.isSleep(data[i].timeStemp,data[i].openTime,data[i].closeTime);
						_html += '<dd data-openTime="'+data[i].openTime+'" data-closeTime="'+data[i].closeTime+'">'
									+'<div class="layImg" data-original="images/d.png"></div>'
									+'<div class="mainInfo">'
										+'<div class="_left">'
											+'<div class="_title">'
												+'<span class=\"_tit '+ (_isSleep ? "disabled" : "") +'\">车友之家</span>'
												+(data[i].isUsed==true ? '<span class="_tip t_c '+(_isSleep ? "disabled" : "")+'">上次使用</span>':'')
											+'</div>'
											+'<div class="_comment" data-comment="'+data[i].comment+'">'+QccrCom.score(data[i].comment)+'</div>'
											+'<div class="_position">0.31km 朝阳区呼家楼街道旺座中心</div>'
										+'</div>'
										+'<div class="_right t_r">'
											+'<em>￥86</em>'
											+'<s>￥98</s>'
											+(_isSleep ? "<span class='sleep'>休息中</span>" : "")
										+'</div>'
									+'</div>'
								+'</dd>';
					}
				}else{
					_html = '<p class="noDate">抱歉，没有找到<span class="red">'+_keyword+'</span>相关的结果</p>'
				}
			return _html;
		},
		hideHistory : function(){
			_history.addClass('hide');
			return this;
		},
		bindEvent : function(){
			var _me = this;
			_cancel.on({//关闭窗口
				click : function(){
					QccrCom.callBridge('popWindow');
				}
			});

			_history.on({  //历史记录选择
				click : function(){
					var _val = this.getAttribute('data-key');
					if(_val===_keyword){
                        return;
                    }
					_me.search(_val);
				}
			},'dd')
			.on({
				click : function(){
					_me.removeHistory();
				}
			},'.clear').on({
				click : function(){
					_me.hideHistory();
				}
			});

			_washCarList.on({//列表点击事件
				click : function(){
					QccrCom.callBridge('pushWindow', {
					  url: 'http://www.baidu.com/',
					  param: {
					    readTitle: true
					  }
					});
				}
			},'dd');

			_searchInput.on({ //文本框事件
				keydown : function(e){
	                var _val = $(this).val();
	                var theEvent = e || window.event;    
	                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
	                if (code == 13) {
	                    if (_val.replace(/\s/g, '') === '') {
	                        QccrCom.setMsg('请输入商家名称');
	                        return;
	                    }
	                    if(_val===_keyword){
	                    	_me.hideHistory().addHistory(_val);
	                        return;
	                    }
	                    _me.search(_val);
	                }  
	            },
	            focus : function(){
	            	if(hasHistory){
	            		_history.removeClass('hide');
	            	}
	            }
			});
			return this;
		}
	}
	
	_obj.init();
}())
