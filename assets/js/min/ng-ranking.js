var app=angular.module("sakanatouch-ranking",[]);app.config(["$httpProvider",function(a){a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;application/json;charset=utf-8"}]),app.controller("RankingCtrl",["$http","hoge","loadData","yourRank_loadData",function(a,t,n,e){function o(a,t){null==t&&(t=""),a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+a+"=([^&#]*)"),e=n.exec(window.location.href);return null==e?t:e[1]}function i(){var a="http://sakana-touch.herokuapp.com/users.json?token="+o("token");e.getData(a)}var r=this;r.up=!1;var u=new Date;u.setTime(u.getTime()-6048e5);var s=u.getFullYear()+"/"+Number(u.getMonth()+1)+"/"+u.getDate(),c=new Date(u);c.setDate(u.getDate()+6);var h=c.getFullYear()+"/"+Number(c.getMonth()+1)+"/"+c.getDate();r.startDay=s,r.endDay=h,r.change=function(){r.up=!r.up},r.limitData=[{label:"10件",value:10},{label:"20件",value:20},{label:"30件",value:30}],r.limit=10,r.limitNum=function(a){return r.limit=a,a},r.say=function(){t.say()},r.rankingCatchList=n.rankingCatchList;var p="http://sakana-touch.herokuapp.com/rankings/count?date="+s+"&token="+o("token");n.getCount_A(p),r.yourRank=e;var l="http://sakana-touch.herokuapp.com/users?date="+s+"&token="+o("token");e.getData(l),r.ranking_view_classname="catch_view",r.viewChange=function(a){r.ranking_view_classname=a},i(),r.nameChange=function(){var a="http://sakana-touch.herokuapp.com/users.json?token="+o("token")+"&nickname="+r.yourRank.userData.nickname;e.getData(a)},r.profileChange=function(){var a="http://sakana-touch.herokuapp.com/users.json?token="+o("token")+"&profile="+r.yourRank.userData.profile;e.getData(a)}}]),app.service("hoge",[function(){this.say=function(){console.log("a")}}]),app.service("loadData",["$http",function(a){var t=this;this.rankingCatchList=[],this.rankingFishkindList=[],this.getCount_A=function(n){a.get(n).success(function(a){angular.forEach(a.ranking,function(a){-1!=n.indexOf("count")?t.rankingCatchList.push(a):t.rankingFishkindList.push(a)})})}}]),app.service("yourRank_loadData",["$http",function(a){var t=this;this.userData={},this.getData=function(n){a.get(n).success(function(a){t.userData=a})}}]);