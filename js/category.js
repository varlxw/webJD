/*
* @Author: Administrator
* @Date:   2017-01-16 09:22:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-16 14:45:55
*/

'use strict';



scrollY('#touch1');
scrollY('#touch2');
function scrollY(id){
	
	var cateAside = document.querySelector(id);

	var touchScroll = cateAside.querySelector('.touch-scroll');
	
	var dHeight = touchScroll.offsetHeight - cateAside.offsetHeight;
	
	var maxY = 50;
	touchScroll.addEventListener('touchstart', startHandler);
	touchScroll.addEventListener('touchmove', moveHandler);
	touchScroll.addEventListener('touchend', endHandler);

	var startY = 0; 
	var centerY = 0; 
	var tempY = 0; 
	function startHandler (e){
		if(!checkd()){
			return false;
		}
		
		startY = e.touches[0].pageY;
		
		touchScroll.style.transition = 'none';
	};
	function moveHandler (e){
		if(!checkd()){
			return false;
		}
		
		var dy = e.touches[0].pageY - startY;

		tempY = centerY + dy;
		
		if(tempY < maxY && tempY > -(dHeight + maxY)){
			touchScroll.style.transform = 'translateY('+ tempY +'px)';
		}else if(tempY >= maxY){
			
			tempY = maxY;
		}else if(tempY <= -(dHeight + maxY)){
			
			tempY = -(dHeight + maxY);
		}
	};
	function endHandler (e){
		if(!checkd()){
			return false;
		}
		
		centerY = tempY;
		
		if(centerY > 0){
			
			centerY = 0;
			touchScroll.style.transition = 'transform .5s';
			touchScroll.style.transform = 'translateY('+ centerY +'px)';

		}else if(centerY < -dHeight){
			centerY = -dHeight;
			touchScroll.style.transition = 'transform .5s';
			touchScroll.style.transform = 'translateY('+ centerY +'px)';
		}
	};
	
	function checkd (){
		return	dHeight > 0 ? true : false;
	}
}
