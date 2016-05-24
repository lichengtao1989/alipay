支付宝原生api接口地址

http://am-team.github.io/h5container




快递详情页面唤起URL示例：

alipays://platformapi/startapp?appId=20000754&url=%2Fapp%2Fsrc%2FexpressDetail.html%3FlogisticsCode%3DYTO%26logisticsNo%3D5688839762%26from%3DCZPT
上面url参数内容需要encodeURI，清晰起见，原始内容如下：
/app/src/expressDetail.html?logisticsCode=YTO&logisticsNo=5688839762&from=CZPT




打开新窗口

QccrCom.callBridge("pushWindow",{
	url: 'http://www.baidu.com/',
});
