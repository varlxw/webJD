/*
* @Author: Administrator
* @Date:   2017-01-13 11:35:24
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-16 08:22:09
*/
'use strict';

var maxScrollValue = 600;
var jdHeader = document.querySelector('.jd-header');
window.addEventListener('scroll', function(){

	// 拿到被卷曲的头部
	var _scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	// 当被卷曲的头部小于最大值的情况下，动态改变透明度
	if(_scrollTop < maxScrollValue){
		jdHeader.style.backgroundColor = 'rgba(203,18,36,'+ _scrollTop/maxScrollValue +')';
	} else {
		jdHeader.style.backgroundColor = 'rgba(203,18,36,1)';
	}
})


var jdKillScroll = document.querySelector('.jd-kill-scroll');
var jdKillScrollLi = jdKillScroll.querySelectorAll('li');
var jdKillScrollLiWidth = jdKillScrollLi[0].offsetWidth;
jdKillScroll.style.width = jdKillScrollLi.length*jdKillScrollLiWidth + 'px';


// 需求 ：京东快报的无缝滚动


var newsScrollWrap = document.querySelector('.news-scroll-wrap');
var newsScrollWrapUl = newsScrollWrap.querySelector('.jd-news-scroll');
var newsScrollWrapLi = newsScrollWrapUl.querySelectorAll('li');
var newsScrollWrapHeight = newsScrollWrap.offsetHeight;
var newsTimer = null;
var index = 0;
// 复制第一个Li并且追加到UL的最后面，作为临时工
newsScrollWrapUl.appendChild(newsScrollWrapLi[0].cloneNode(true));

newsTimer = setInterval(function(){

	index++;

	newsScrollWrapUl.style.transition = 'top .5s';
		newsScrollWrapUl.style.top = (-index*newsScrollWrapHeight) + 'px';

}, 2000);


newsScrollWrapUl.addEventListener('transitionend',function(){
	
	if(index > newsScrollWrapLi.length - 1){
		index = 0;
		
		newsScrollWrapUl.style.transition = 'none';
	
		newsScrollWrapUl.style.top = '0px';
	}
})





var nowDate = new Date();

var newDate = new Date('Jan 16 2017 11:45:00');

var t = Math.floor((newDate - nowDate)/1000);

var jdTimeInfo = document.querySelector('.jd-time-info');
var jdTimeInfoSpan = jdTimeInfo.querySelectorAll('span');

var secKillTimer = null;

secKillTimer = setInterval(function(){

	t--;
	if(t < 0){

		clearInterval(secKillTimer);
		return false;
	}


	var h = Math.floor(t%86400/3600);
	var m = Math.floor(t%3600/60);
	var s = Math.floor(t%60);


	var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);

	for(var i = 0; i < jdTimeInfoSpan.length; i++){
		jdTimeInfoSpan[i].innerHTML = str.charAt(i);
	}

}, 1000);

function toTwo (n){
  return n = n > 9 ? '' + n : '0' + n;
}


// 轮播图
var jdCarouse = document.querySelector('.jd-carouse');
var carouseWrap = jdCarouse.querySelector('.carouse-wrap');
var carouseWrapLi = carouseWrap.querySelectorAll('li');
var pointWrap = jdCarouse.querySelector('.point-wrap');
var carouseTimer = null;

var windowWidth = document.documentElement.offsetWidth;
var left,center,right;
carouseWrap.style.height = carouseWrapLi[0].offsetHeight + 'px'; 
for(var i = 0; i < carouseWrapLi.length; i++){
	var li = document.createElement('li');
	if(i == 0){
		li.classList.add('active');
	}
	pointWrap.appendChild(li);
}

left = carouseWrapLi.length - 1;
center = 0;
right = 1;
carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
carouseWrapLi[center].style.transform = 'translateX(0px)';
carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
function showNext(){
	// 轮转下标
	left = center;
	center = right;
	right++;


	if(right > carouseWrapLi.length - 1){
		right = 0;
	}
	carouseWrapLi[center].style.transition = 'transform .5s';
	carouseWrapLi[left].style.transition = 'transform .5s';
	carouseWrapLi[right].style.transition = 'none';

	setPoint();


	carouseWrapLi[center].style.transform = 'translateX(0px)';
	carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
	carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
}

function showPrev(){

	right = center;
	center = left;
	left--;

	if(left < 0){
		left = carouseWrapLi.length - 1;
	}
	carouseWrapLi[center].style.transition = 'transform .5s';
	carouseWrapLi[left].style.transition = 'none';
	carouseWrapLi[right].style.transition = 'transform .5s';

	setPoint();

	carouseWrapLi[center].style.transform = 'translateX(0px)';
	carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
	carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
}
var pointWrapLi = pointWrap.querySelectorAll('li');

function setPoint(){
	for(var i = 0; i < pointWrapLi.length; i++){
		pointWrapLi[i].classList.remove('active');
	}
	pointWrapLi[center].classList.add('active');
}
carouseTimer = setInterval(showNext, 1000);


jdCarouse.addEventListener('touchstart',touchstartHandler);
jdCarouse.addEventListener('touchmove',touchmoveHandler);
jdCarouse.addEventListener('touchend',touchendHandler);

var startX = 0;  
var moveX = 0;	
var starTime = null;

function touchstartHandler(event){
	starTime = new Date();
	clearInterval(carouseTimer);
	startX = event.touches[0].pageX;
	// 清除过渡
	carouseWrapLi[center].style.transition = 'none';
	carouseWrapLi[left].style.transition = 'none';
	carouseWrapLi[right].style.transition = 'none';
}
function touchmoveHandler(event){
	moveX = event.touches[0].pageX;
	var dx = moveX - startX;

	carouseWrapLi[center].style.transform = 'translateX('+ dx +'px)';
	carouseWrapLi[left].style.transform = 'translateX('+ (-windowWidth + dx) +'px)';
	carouseWrapLi[right].style.transform = 'translateX('+ (windowWidth + dx) +'px)';

}
function touchendHandler(event){
	var dTime = new Date() - starTime;

	var endX = event.changedTouches[0].pageX - startX;

	if(endX < (-windowWidth/3) || (dTime < 300 && endX < -30)){
		showNext();
	}else if(endX > (windowWidth/3) || (dTime < 300 && endX > 30)){
		showPrev();
	}else{
		carouseWrapLi[center].style.transition = 'transform .5s';
		carouseWrapLi[left].style.transition = 'transform .5s';
		carouseWrapLi[right].style.transition = 'transform .5s';

		carouseWrapLi[center].style.transform = 'translateX(0px)';
		carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
		carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
	}
	carouseTimer = setInterval(showNext, 1000);
}
