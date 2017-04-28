/*
* @Author: Administrator
* @Date:   2017-01-17 08:46:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-17 09:23:24
*/

'use strict';


var checkboxWrap = document.querySelectorAll('.checkbox-wrap');

for(var i = 0; i < checkboxWrap.length; i++){
	checkboxWrap[i].addEventListener('click', function(){
		// 点击谁就让谁切换checked类
		this.classList.toggle('checked');
	})
}


var checkAll = document.querySelector('#checkAll');

var cartB = document.querySelector('.cart-m-b');

var checkList = cartB.querySelectorAll('.checkbox-wrap');

var inputAll = cartB.querySelectorAll('input[type="checkbox"]');
checkAll.addEventListener('click',function(){
	
	if(checkAll.classList.contains('checked')){
		for(var i = 0; i < checkList.length; i++){
			checkList[i].classList.add('checked');
			
			inputAll[i].checked = true;
		}
	}else{
		for(var i = 0; i < checkList.length; i++){
			checkList[i].classList.remove('checked');
			
			inputAll[i].checked = false;
		}
	}
})


var del = document.querySelectorAll('.pro-tb-r');
var delT = null;
var popModel = document.querySelector('.pop-model');
for(var i = 0; i < del.length; i++){
	
	del[i].addEventListener('click',function(){
		
		delT = this.children[0];
		
		delT.style.transform = 'rotate(-20deg) translate(-2px,-2px)'
		
		popModel.style.display = 'block';
	})
};


var cancel = document.querySelector('.cancel');
cancel.addEventListener('click',function(){
	
	popModel.style.display = 'none';
	
	delT.style.transform = 'none';
})


var jia = document.querySelectorAll('.jia');
var jian = document.querySelectorAll('jian');
var proNum = document.querySelectorAll('.num');

for(var i = 0; i < jia.length; i++){
	
	jia[i].addEventListener('click',function(){
		
		var val = this.parentNode.children[1].children[0].value;
		val++;
		this.parentNode.children[1].children[0].value = val;
	})
}
