;
(function(win, doc) {
	var QccrSetmsg = function(options) {
			options = options || {};
			for (var i in options) {
				this.options[i] = options[i];
			}
			this.init();
			
		},
		_obj = {
			hasClass: function(e, c) {
				var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
				return re.test(e.className);
			},
			addClass: function(e, c) {
				if (this.hasClass(e, c)) {
					return;
				}
				var newclass = e.className.split(' ');
				newclass.push(c);
				e.className = newclass.join(' ');
			},
			removeClass: function(e, c) {
				if (!this.hasClass(e, c)) {
					return;
				}

				var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
				e.className = e.className.replace(re, ' ');
			}
		};

	QccrSetmsg.prototype = {
		constructor: QccrSetmsg,
		init: function() {
			this.creatStyle().creatDivs();
		},
		isFunction: function(fn) {
			return fn && fn.constructor === Function ? !0 : !1;
		},
		creatStyle: function() {
			var _id = 'SetmsgStyle',
				_me = this;
			if (!doc.getElementById(_id)) {
				var style = doc.createElement('style'),
					_cssText = ".msg-tip{position:fixed;z-index:99999999;width:100%;display:flex;justify-content:center;left:50%;top:50%;transform:translate(-50%, -50%);transition:all 200ms ease}.msg-tip__text{text-align:center;display:block;max-width:90%;background-color:rgba(0,0,0,0.77);line-height:.6rem;padding:.2rem .4rem;border-radius:5px;color:#fff;font-size:.38rem;word-wrap:break-word;word-break:break-all}.msg-tip-enter{opacity:0;transform: translate(-50%,-30%);}.msghide{display:none;}";
				style.type = "text/css";
				style.id = _id;
				style.styleSheet ? style.styleSheet.cssText = _cssText : style.innerHTML = _cssText
				doc.getElementsByTagName('head')[0].appendChild(style);
			}
			return this;
		},
		creatDivs: function() {
			var _me = this,
				_id = 'msgTipBox';
			if (!doc.getElementById(_id)) {
				var _div = doc.createElement('div');
				var _span = doc.createElement('div');
				_span.className = 'msg-tip__text';
				_div.id = _id;
				_div.className = 'msg-tip msg-tip-enter msghide';
				_div.appendChild(_span);
				doc.body.appendChild(_div);
				_me.box = _div;
				_me.text = _span;
			}
			return this;
		},
		setMsg: function(msg, callback) {
			var _me = this;
			if (_me.timer) {
				clearTimeout(_me.timer);
			}
			if (!msg) {
				return
			}
			_me.text.innerHTML = msg;
			_obj.removeClass(this.box, 'msghide');
			_obj.removeClass(this.box, 'msg-tip-enter');
			_me.timer = setTimeout(function() {
				_obj.addClass(_me.box, 'msg-tip-enter');
				setTimeout(function() {
					_me.isFunction(callback) && callback();
					_obj.addClass(_me.box, 'msghide');
				}, 500);
			}, 2500)
			return this;
		}
	}

	function store(itemName, obj) {
		if (obj) {
			try {
				obj = JSON.stringify(obj);
			} catch (e) {
				obj = obj;
			}
			localStorage.setItem(itemName, obj);
		} else {
			var data = localStorage.getItem(itemName);
			try {
				data = JSON.parse(data);
			} catch (e) {
				data = data;
			}
			return data;
		}
	}
	$(function() {
		FastClick.attach(document.body);
	});
	var _setMsg = new QccrSetmsg();
	var _loadingBox = doc.getElementById('loadingBox');
	var QccrCom = {
		setMsg: function(msg, callback) {
			_setMsg.setMsg(msg, callback);
			return this;
		},
		_showLoading: function() {
			if (_loadingBox) {
				_obj.removeClass(_loadingBox, 'hide');
			}
			return this;
		},
		netWorkErr: function(callback) {
			this.setMsg('<span class="networkerrbox">网络不给力</span>', callback);
			return this;
		},
		score: function(commentScore) {
			if (!commentScore) {
				commentScore = 5
			}
			commentScore = parseFloat(commentScore);
			var i = 0,
				_html = '';
			for (; i < 5; i++) {
				if (commentScore >= 1) {
					_html += '<span class="star"></span>';
				} else if (0 < commentScore && commentScore < 1) {
					_html += '<span class="stargery"></span>';
				} else {
					_html += '<span class="unstar"></span>';
				}
				commentScore--;
			}
			return _html;
		},
		format: function(timestep, fmt) {
			timestep = timestep || '';
			fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
			var date = new Date(timestep)
			var o = {
				"M+": date.getMonth() + 1, //月份 
				"d+": date.getDate(), //日 
				"h+": date.getHours(), //小时 
				"m+": date.getMinutes(), //分 
				"s+": date.getSeconds(), //秒 
				"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
				"S": date.getMilliseconds() //毫秒 
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		},
		isSleep: function(now, openTime, closeTime) {
			var _open = openTime.split(":");
			var _close = closeTime.split(':');
			var _odate = new Date();
			var _cdate = new Date();
			_odate.setHours(_open[0]);
			_odate.setMinutes(_open[1]);
			if (parseInt(_close[0]) < 12) {
				_cdate.setHours(_close[0]);
				_cdate.setDate(_cdate.getDate() + 1);
			} else {
				_cdate.setHours(_close[0]);
			}
			_cdate.setMinutes(_close[1]);
			if (now > _odate.valueOf()) {
				if (now < _cdate.valueOf()) {
					return false;
				}
				return true;
			} else {
				return true;
			}
		},
		_hideLoading: function() {
			if (_loadingBox) {
				_obj.addClass(_loadingBox, 'hide');
			}
			return this;
		},
		getItem: function(itemName) {
			return store(itemName);
		},
		setItem: function(itemName, obj) {
			store(itemName, obj);
			return this;
		},
		clearItem: function(itemName) {
			if (typeof itemName != 'undefined') {
				if (typeof itemName == 'string') {
					localStorage.removeItem(itemName);
				}
				if (itemName.constructor === Array) {
					for (var i = 0, len = itemName.length; i < len; i++) {
						localStorage.removeItem(itemName[i]);
					}
				}
			}
			return this;
		},
		showImg: function(src) {
			if (!src) {
				return;
			}
			if (!document.getElementById('showPicWarp')) {
				var _picBox = $('<div class="showPicWarp" id="showPicWarp">');
				_picBox.append('<img src="' + src + '"/>');
				$('body').append(_picBox);
				$('body').on({
					click: function() {
						$(this).addClass('hide');
					}
				}, '#showPicWarp');
			} else {
				$('#showPicWarp img').attr('src', src);
				$('#showPicWarp').removeClass('hide');
			}

		},
		callBridge: function() {
			var args = arguments,
				fn = function() {
					var bridge = window.AlipayJSBridge;
					bridge.call.apply(bridge, args);
				};
			window.AlipayJSBridge ? fn() : document.addEventListener("AlipayJSBridgeReady", function() {
				fn();
			}, !1);
		},
		getQueryString: function(url) {
			if (url) {
				url = url.substr(url.indexOf("?") + 1);
			}
			var result = {},
				queryString = url || location.search.substring(1),
				re = /([^&=]+)=([^&]*)/g,
				m;

			while (m = re.exec(queryString)) {
				result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}
			return result;
		},
		getFormDataAsObj: function($form) {
			var obj = {},
				arr = $form.serializeArray();
			for (var i = 0; i < arr.length; i++) {
				obj[arr[i].name] = arr[i].value;
			}
			return obj;
		},
		validate: function(data, _rule) {
			_rule = _rule || {};
			var _me = this,
				valid = true;
			for (var i in data) {
				var value = data[i],
					$item = $('[name=' + i + ']'),
					require = $item.data('require'),
					nullMsg = $item.data('null'),
					errorMsg = $item.data('error'),
					ruleName = $item.data('rule') || '',
					rule = _rule[ruleName];

				if (require) {
					if (!value) {
						valid = false;
						_me.setMsg(nullMsg);
						break;
					} else if (ruleName && !rule.test(value)) {
						if (rule.test(value)) {
							continue;
						}
						valid = false;
						_me.setMsg(errorMsg);
						break;
					}
				} else {
					if (value && ruleName && !rule.test(value)) {
						if (rule.test(value)) {
							continue;
						}
						valid = false;
						_me.setMsg(errorMsg);
						break;
					}
				}
			}
			return valid ? data : false;
		},
		alert: function(options) {
			options = options || {};
			this.confirm(options, 'alert');
		},
		confirm: function(options, type) {
			options = options || {};
			type = type || 'confirm';
			if (document.getElementById('winConfirm')) {
				return;
			}
			var me = this,
				noBtn = options.noBtn ? options.noBtn : '取消',
				yesBtn = options.yesBtn ? options.yesBtn : '确定',
				$btn = $('<div class="_btn">'),
				$no = $('<a href="javascript:void(0);" class="noBtn" id="btnNo">' + noBtn + '</a>'),
				$yes = $('<a href="javascript:void(0);" class="noBtn" id="btnYes">' + yesBtn + '</a>'),
				$body = $('body'),
				$confirmBox = $('<div class="confrimBox" id="winConfirm">');
			"alert" == type ? $btn.append($yes) : $btn.append($no, $yes);
			$confirmBox.append(
				$('<div class="contBox">').append(
					$('<div class="_tit">').html(options.title || '提示'), $btn
				)
			)
			$body.append($confirmBox);
			
			$('#btnNo').click(function() {
				$confirmBox.remove();
				if (options.noFn) {
					options.noFn();
				}
			});

			$('#btnYes').click(function() {
				if (options.yesFn) {
					options.yesFn();
				}
				$confirmBox.remove();
			});
		}
	}
	if (typeof module != 'undefined' && module.exports) {
		module.exports = QccrCom;
	} else if (typeof define == 'function' && define.amd) {
		define(function() {
			return QccrCom;
		});
	} else {
		window.QccrCom = QccrCom;
	}

}(window, document));
