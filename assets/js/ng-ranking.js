var app = angular.module('sakanatouch-ranking', [])

app.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
}]);

app.controller('RankingCtrl', ["$http", "hoge", "loadData", "yourRank_loadData", function ($http, hoge, loadData, yourRank_loadData) {
	var self = this;
	self.up = false;
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
	// http://sakana-touch.herokuapp.com/users?token=3c781217-a618-450a-948d-5ae8fc302aca&date=2015/06/20
	self.rankingCatchList = loadData.rankingCatchList;
	loadData.getCount_A("count.json");

	//自身のランクを取得
	
	this.yourRank = yourRank_loadData;
	/*self.yourRank = yourRank_loadData.userData.rank
	self.yourValue = yourRank_loadData.userData.value
	self.yourFishes = yourRank_loadData.userData.fishes*/
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
	var dd = new Date();
	dd.setTime(dd.getTime()-1000*60*60*24*7); 
	var today = dd.getFullYear() + "/" + dd.getMonth() + "/" + dd.getDate();
	var url = "http://sakana-touch.herokuapp.com/users?date="+today+"&token=" + getQuerystring("token");
	//console.log(url)
	yourRank_loadData.getData(url); // "user_lank.json"
	
	/*self.rankingFishkindList = loadData.rankingFishkindList;
	loadData.getCount_A("kind.json");*/
	
	self.ranking_view_classname = "catch_view";
	self.viewChange = function (cname) {
		self.ranking_view_classname = cname;
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
			//console.log(res.ranking);
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





