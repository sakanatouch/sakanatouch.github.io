var app = angular.module('sakanatouch-ranking', [])

app.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
}]);

app.controller('RankingCtrl', ["$http", "hoge", "loadData", "yourRank_loadData", function ($http, hoge, loadData, yourRank_loadData) {
	var self = this;
	self.up = false;
	var dd = new Date();
	dd.setTime(dd.getTime()-1000*60*60*24*7);
	var today = dd.getFullYear() + "/" + Number(dd.getMonth()+1) + "/" + dd.getDate();
	var owl = new Date(dd)
	owl.setDate(dd.getDate()+6)
	var oneWeekLater = owl.getFullYear() + "/" + Number(owl.getMonth()+1) + "/" + owl.getDate();
	self.startDay = today;
	self.endDay = oneWeekLater;
	//console.log(self.startDay, self.endDay)
	self.change = function(){
		self.up = !self.up;
	};
	self.limitData = [{"label": "10件", "value": 10},{"label": "20件", "value": 20},{"label": "30件", "value": 30}]
	self.limit = 10;
	self.limitNum = function (_limit) {
		self.limit = _limit;
		return _limit
	}
	self.say = function(){
		hoge.say();
	}
	function getQuerystring(key, default_) {
	   if (default_==null) default_="";
	   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	   var qs = regex.exec(window.location.href);
	   if(qs == null)
	    return default_;
	   else
	    return qs[1];
	}
	//全体のランクを取得
	self.rankingCatchList = loadData.rankingCatchList;
	var lankAPIurl = "http://sakana-touch.herokuapp.com/rankings/count?date="+today+"&token=" + getQuerystring("token");
	loadData.getCount_A(lankAPIurl);

	//自身のランクを取得
	self.yourRank = yourRank_loadData;
	var url = "http://sakana-touch.herokuapp.com/users?date="+today+"&token=" + getQuerystring("token");
	yourRank_loadData.getData(url);
	self.ranking_view_classname = "catch_view";
	self.viewChange = function (cname) {
		self.ranking_view_classname = cname;
	}

	// ニックネームがonchangeされた
	self.nameChange = function () {
		var url = "http://sakana-touch.herokuapp.com/users?token=" + getQuerystring("token") + "&nickname=" + this.value;
		yourRank_loadData.getData(url);
	}

}]);

app.service("hoge",[function(){
	this.say = function(){console.log("a");}
}]);

app.service("loadData",["$http",function($http){
	var self = this;
	this.rankingCatchList = [];
	this.rankingFishkindList = [];
	this.getCount_A = function (url) {
		$http.get(url)
		.success(function (res) {
			angular.forEach(res.ranking,function(data){
				if (url.indexOf("count") != -1) {
					self.rankingCatchList.push(data)
				} else {
					self.rankingFishkindList.push(data)
				} 
				
			})
			
		})
	}
}]);

app.service("yourRank_loadData",["$http",function($http){
	var self = this;
	this.userData = {}
	this.getData = function (url) {
		$http.get(url)
		.success(function (res) {
			self.userData = res
		})
	}
}]);