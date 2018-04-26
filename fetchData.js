/**
* ajax
* @author: fgy
* @time: 2018/4/25
*/
//参数格式
// {
//  url:"", //请求地址
//  type:'GET',   //请求方式
//  data:{name:'zhangsan',age :'23',email:'2372734044@qq.com'}, //请求参数
//  dataType:"json",     // 返回值类型的设定
//  async:false,   //是否异步
//  ContentType:'application/x-www-form-urlencoded',//post参数
//  success:function (response,xml) {
//      console.log(response);   //   此处执行请求成功后的代码
//  },
//  fail:function (status) {
//      console.log('状态码为'+status);   // 此处为执行成功后的代码
//  }
//
//}
/**
 * 对象参数的处理
 * @param data
 * @returns {string}
 */
function getParams(type,data) {
	if(type=='GET'){
		var arr = [];
	    for (var param in data){
	        arr.push(encodeURIComponent(param) + '=' +encodeURIComponent(data[param]));
	    }
	    //不留缓存
	//  arr.push(('randomNumber=' + Math.random()).replace('.'));   
	    return arr.join('&');
	}else{
		return JSON.stringify(data);
	}
    
}

//jq扩展方法
$.extend({
    fetchData:function(options){        
	    options = options || {};
	     /*
	     * 默认请求本机
	     */
    	options.url = options.url ||'http://127.0.0.1:8080';
	    /**
	     * 默认为GET请求
	     * */
	    options.type = (options.type || "GET").toUpperCase();
	    /**
	     * 返回值类型默认为json
	     * */
	    options.dataType = options.dataType || 'json';
	    /**
	     * 默认为异步请求
	     * */
	    options.ContentType = options.ContentType || 'application/x-www-form-urlencoded';
	    /****
	     * 默认表单形式提交
	     * **/
	    options.async = options.async || true;
	    /**
	     * 对需要传入的参数的处理
	     * */
	    var params = getParams(options.type,options.data);
	    var xhr;
	    /**
	     * 创建一个 ajax请求
	     * W3C标准和IE标准
	     */
	    if (window.XMLHttpRequest){
	        /**
	         * W3C标准
	         * */
	        xhr = new XMLHttpRequest();
	    }else{
	        /**
	         * IE标准
	         * @type {ActiveXObject}
	         */
	        xhr = new ActiveXObject('Microsoft.XMLHTTP')
	    }
	    if (options.type == 'GET'){
	        xhr.open("GET",options.url + '?' + params ,options.async);
	        xhr.send(null)
	    }else if (options.type == 'POST'){
	        /**
	         *打开请求
	         * */
	        xhr.open('POST',options.url,options.async);
	        /**
	         * POST请求设置请求头
	         * */
	        xhr.setRequestHeader('Content-Type',options.ContentType);
	        /**
	         * 发送请求参数
	         */
	        xhr.send(params);
	    }
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4){
	            var status = xhr.status;
	            if (status >= 200 && status < 300 ){
	                options.success && options.success(JSON.parse(xhr.responseText),xhr.responseXML);
	            }else{
	                options.fail && options.fail(status);
	            }
	        }
	    };

    }
})