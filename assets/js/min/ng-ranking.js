var app=angular.module("sakanatouch-ranking",["ngTouch"]);app.config(["$httpProvider",function(n){n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;application/json;charset=utf-8"}]),app.controller("RankingCtrl",["$http","hoge","loadData","yourRank_loadData",function(n,t,a,e){function i(n,t){null==t&&(t=""),n=n.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a=new RegExp("[\\?&]"+n+"=([^&#]*)"),e=a.exec(window.location.href);return null==e?t:e[1]}var o=this;o.up=!1;var r=new Date;r.setTime(r.getTime()-6048e5);var c=r.getFullYear()+"/"+Number(r.getMonth()+1)+"/"+r.getDate(),u=new Date(r);u.setDate(r.getDate()+6);var s=u.getFullYear()+"/"+Number(u.getMonth()+1)+"/"+u.getDate();o.startDay=c,o.endDay=s,o.change=function(){o.up=!o.up},o.limitData=[{label:"10件",value:10},{label:"20件",value:20},{label:"30件",value:30}],o.limit=10,o.limitNum=function(n){return o.limit=n,n},o.say=function(){t.say()},o.rankingCatchList=a.rankingCatchList;var l="http://sakana-touch.herokuapp.com/rankings/count?date="+c+"&token="+i("token");a.getCount_A(l),o.yourRank=e;var p="http://sakana-touch.herokuapp.com/users?date="+c+"&token="+i("token");e.getData(p),o.ranking_view_classname="catch_view",o.viewChange=function(n){o.ranking_view_classname=n},o.userDataChange=function(){var n="http://sakana-touch.herokuapp.com/users.json?token="+i("token")+"&profile="+o.yourRank.userData.profile+"&nickname="+o.yourRank.userData.nickname;e.postData(n)}}]),app.service("hoge",[function(){this.say=function(){console.log("a")}}]),app.service("loadData",["$http",function(n){var t=this;this.rankingCatchList=[],this.rankingFishkindList=[],this.getCount_A=function(a){n.get(a).success(function(n){angular.forEach(n.ranking,function(n){-1!=a.indexOf("count")?t.rankingCatchList.push(n):t.rankingFishkindList.push(n)})})}}]),app.service("yourRank_loadData",["$http",function(n){var t=this;this.userData={},this.getData=function(a){n.get(a).success(function(n){t.userData=n})},this.postData=function(t){n.post(t).success(function(){})}}]),app.directive("sakanaActive",[function(){return{restrict:"A",link:function(n,t){t.on("touchstart",function(){t.addClass("active")}),t.on("touchend",function(){t.removeClass("active")})}}}]),app.directive("userNickName",[function(){return{restrict:"AE",templateUrl:"user_nick_name_tmp",replace:!0,link:function(n,t){var a=t.find("h2"),e=t.find("dt"),i=t.find("input");e.on("touchend",function(){n.$apply(function(){n.nickNameCtr.isEdit=!0}),i[0].focus()}),a.on("touchend",function(){n.$apply(function(){n.nickNameCtr.isEdit=!0}),i[0].focus()}),i.on("blur",function(){n.$apply(function(){n.nickNameCtr.isEdit=!1})}),i.on("keydown",function(){var t=n.ctrs.yourRank.userData.nickname,a=t.length,e=8;a>e&&n.$apply(function(){var t=n.ctrs.yourRank.userData.nickname.substring(0,e);n.ctrs.yourRank.userData.nickname=t})}),i.on("change",function(){var t=n.ctrs.yourRank.userData.nickname,a=t.length,e=8;a>e&&n.$apply(function(){var t=n.ctrs.yourRank.userData.nickname.substring(0,e);n.ctrs.yourRank.userData.nickname=t})})},controller:[function(){this.isEdit=!1}],controllerAs:"nickNameCtr"}}]),app.directive("userProfile",[function(){return{restrict:"AE",templateUrl:"user_profile_tmp",replace:!0,link:function(n,t){var a=t.find("dt"),e=t.find("p"),i=t.find("textarea");a.on("touchend",function(){n.$apply(function(){n.profileCtr.isEdit=!0}),i[0].focus()}),e.on("touchend",function(){n.$apply(function(){n.profileCtr.isEdit=!0}),i[0].focus()}),i.on("blur",function(){n.$apply(function(){n.profileCtr.isEdit=!1})})},controller:[function(){this.isEdit=!1}],controllerAs:"profileCtr"}}]);