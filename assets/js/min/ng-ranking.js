var app=angular.module("sakanatouch-ranking",[]);app.config(["$httpProvider",function(a){a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;application/json;charset=utf-8"}]),app.controller("RankingCtrl",["$http","hoge","loadData","yourRank_loadData",function(a,t,n,e){function i(a,t){null==t&&(t=""),a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+a+"=([^&#]*)"),e=n.exec(window.location.href);return null==e?t:e[1]}var o=this;o.up=!1;var r=new Date;r.setTime(r.getTime()-6048e5);var u=r.getFullYear()+"/"+Number(r.getMonth()+1)+"/"+r.getDate(),s=new Date(r);s.setDate(r.getDate()+6);var c=s.getFullYear()+"/"+Number(s.getMonth()+1)+"/"+s.getDate();o.startDay=u,o.endDay=c,o.change=function(){o.up=!o.up},o.limitData=[{label:"10件",value:10},{label:"20件",value:20},{label:"30件",value:30}],o.limit=10,o.limitNum=function(a){return o.limit=a,a},o.say=function(){t.say()},o.rankingCatchList=n.rankingCatchList;var l="http://sakana-touch.herokuapp.com/rankings/count?date="+u+"&token="+i("token");n.getCount_A(l),o.yourRank=e;var h="http://sakana-touch.herokuapp.com/users?date="+u+"&token="+i("token");e.getData(h),o.ranking_view_classname="catch_view",o.viewChange=function(a){o.ranking_view_classname=a}}]),app.service("hoge",[function(){this.say=function(){console.log("a")}}]),app.service("loadData",["$http",function(a){var t=this;this.rankingCatchList=[],this.rankingFishkindList=[],this.getCount_A=function(n){a.get(n).success(function(a){angular.forEach(a.ranking,function(a){-1!=n.indexOf("count")?t.rankingCatchList.push(a):t.rankingFishkindList.push(a)})})}}]),app.service("yourRank_loadData",["$http",function(a){var t=this;this.userData={},this.getData=function(n){a.get(n).success(function(a){t.userData=a})}}]);