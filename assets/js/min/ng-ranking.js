var app=angular.module("sakanatouch-ranking",[]);app.config(["$httpProvider",function(t){t.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;application/json;charset=utf-8"}]),app.controller("RankingCtrl",["$http","hoge","loadData","yourRank_loadData",function(t,n,a,e){function i(t,n){null==n&&(n=""),t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a=new RegExp("[\\?&]"+t+"=([^&#]*)"),e=a.exec(window.location.href);return null==e?n:e[1]}var o=this;o.up=!1;var r=new Date;r.setTime(r.getTime()-6048e5);var c=r.getFullYear()+"/"+Number(r.getMonth()+1)+"/"+r.getDate(),u=new Date(r);u.setDate(r.getDate()+6);var s=u.getFullYear()+"/"+Number(u.getMonth()+1)+"/"+u.getDate();o.startDay=c,o.endDay=s,o.change=function(){o.up=!o.up},o.limitData=[{label:"10件",value:10},{label:"20件",value:20},{label:"30件",value:30}],o.limit=10,o.limitNum=function(t){return o.limit=t,t},o.say=function(){n.say()},o.rankingCatchList=a.rankingCatchList;var l="http://sakana-touch.herokuapp.com/rankings/count?date="+c+"&token="+i("token");a.getCount_A(l),o.yourRank=e;var p="http://sakana-touch.herokuapp.com/users?date="+c+"&token="+i("token");e.getData(p),o.ranking_view_classname="catch_view",o.viewChange=function(t){o.ranking_view_classname=t},o.userDataChange=function(){var t="http://sakana-touch.herokuapp.com/users.json?token="+i("token")+"&profile="+o.yourRank.userData.profile+"&nickname="+o.yourRank.userData.nickname;e.postData(t)}}]),app.service("hoge",[function(){this.say=function(){console.log("a")}}]),app.service("loadData",["$http",function(t){var n=this;this.rankingCatchList=[],this.rankingFishkindList=[],this.getCount_A=function(a){t.get(a).success(function(t){angular.forEach(t.ranking,function(t){-1!=a.indexOf("count")?n.rankingCatchList.push(t):n.rankingFishkindList.push(t)})})}}]),app.service("yourRank_loadData",["$http",function(t){var n=this;this.userData={},this.getData=function(a){t.get(a).success(function(t){n.userData=t})},this.postData=function(n){t.post(n).success(function(t){})}}]),app.directive("userNickName",[function(){return{restrict:"AE",templateUrl:"user_nick_name_tmp",replace:!0,link:function(t,n,a,e,i){var o=n.find("h2"),r=n.find("dt"),c=n.find("input");r.on("touchstart",function(){t.$apply(function(){t.nickNameCtr.isEdit=!0})}),o.on("touchstart",function(){t.$apply(function(){t.nickNameCtr.isEdit=!0})}),c.on("blur",function(){t.$apply(function(){t.nickNameCtr.isEdit=!1})}),c.on("change",function(){var n=t.ctrs.yourRank.userData.nickname,a=7;n.length>a&&t.$apply(function(){var n=t.ctrs.yourRank.userData.nickname.substring(0,a);t.ctrs.yourRank.userData.nickname=n})})},controller:[function(){this.isEdit=!1}],controllerAs:"nickNameCtr"}}]),app.directive("userProfile",[function(){return{restrict:"AE",templateUrl:"user_profile_tmp",replace:!0,link:function(t,n,a,e,i){var o=n.find("dt"),r=n.find("p"),c=n.find("textarea");o.on("touchstart",function(){t.$apply(function(){console.log("aaaaaaaaa"),t.profileCtr.isEdit=!0})}),r.on("touchstart",function(){t.$apply(function(){t.profileCtr.isEdit=!0})}),c.on("blur",function(){console.log("aaaaaaaaa"),t.$apply(function(){t.profileCtr.isEdit=!1})})},controller:[function(){this.isEdit=!1}],controllerAs:"profileCtr"}}]);