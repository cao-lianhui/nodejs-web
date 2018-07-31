//var exec = require("child_process").exec;
var querystring = require("querystring"),
      fs = require("fs"),
      formidable = require("formidable");

function start(response){
    console.log("Request handler 'start' was called.");
   
    //延迟10秒返回信息，进行阻塞操作
    /*function sleep(milliSeconds){
        var startTime = new Date().getTime();
        while(new Date().getTime()< startTime + milliSeconds);
    }
    sleep(10000);*/

    /*exec("find /",{timeout:10000, maxBuffer:20000*1024},function(error, stdout, stderr){
          response.writeHead(200,{"Content-Type":"text/plain"});
          response.write(stdout);
          response.end();
    });*/

    var body = '<html>' + 
         '<head>' + 
         '<meta http-equiv="Content-Type" content="text/html; ' +
         'charset=UTF-8" />' +
         '</head>'+
         '<body>' +
         '<form action="/upload" enctype="multipart/form-data" '+' method="post">' +
         '<input type="file" name="upload" multiple="multiple" style="margin:100px auto 0;border:1px solid #ccc;border-radius:4px;display:block;" />'+
         '<input type="submit" value="Upload file"  style="width:200px;height:30px;border-radius:4px;border:1px solid #ccc;margin:40px auto;background-color:#109059;display:block;"/>' +
         '</form>' +
         '</body>' +
         '</html>';
         
         response.writeHead(200,{"Content-Type":"text/html"});
         response.write(body);
         response.end();
}
function upload(response, request){
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    form.uploadDir = 'tmp';
    console.log("about to parse");
    form.parse(request,function(error, fields, files){
         if(error){throw error;}
         console.log("parsing done");
         fs.renameSync(files.upload.path, "/tmp/test.png");
         response.writeHead(200,{"Content-Type":"text/html"});
         response.write("received image:<br/>");
         response.write("<img src='/show' />");
         response.end();
    });
    /*response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("You've sent the text: "+ querystring.parse(postData).text);
    //response.write("You've sent the text: "+ postData);
    response.end();*/
}
function show(response, postData){
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function(error, file){
        if(error){
             response.writeHead(500,{"Content-Type":"text/plain"});
             response.write(error + "\n");
             response.end();
        }else{
             response.writeHead(200,{"Content-Type":"image/png"});
             response.write(file,"binary");
             response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;