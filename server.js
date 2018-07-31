//创建一个http模块
var http = require("http");
//创建一个url模块
var url = require("url");
function start(route,handle){
      function onRequest(request, response){
            var postData = "";
            var pathname = url.parse(request.url).pathname;
            console.log(typeof handle[pathname]);
            console.log("Request for "+pathname+" received.");

            /*//设置接收的编码格式为utf-8
            request.setEncoding("utf8");

            //注册data事件监听器，收集每次接收到的新数据块
            request.addListener("data", function(postDataChunk){
                  postData += postDataChunk;
                  console.log("Received POST data chunk ' " + postDataChunk + " '. ");
            });

            //接收完所有数据后触发end事件
            request.addListener("end",function(){
                  route(handle, pathname, response, postData);
            });*/
 
            route(handle, pathname, response, request);
      }
      http.createServer(onRequest).listen(8888);
      console.log("Server has started");
}
//导出server模块
exports.start = start;