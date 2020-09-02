function get(e) {
    return document.getElementById(e);
}
function backH() {

    for (var i = 1; i <= 6 ; i++) {

        if((get('img'+i).style.display ) == ("none"))
        {
            get('img'+i).style.display = "block";


            switch(i){
                case 1 : get('one').className = 'one'; break;
                case 2 : get('two').className = 'two';break;
                case 3 :get('three').className = 'three';break;
                case 4 : get('four').className = 'four';break;
                case 5 : get('five').className = 'five';break;
                case 6 : get('six').className = 'six';break;

            }

        }else{

            switch(i){
                case 1 : get('one').className = 'one'; break;
                case 2 : get('two').className = 'two';break;
                case 3 : get('three').className = 'three';break;
                case 4 : get('four').className = 'four';break;
                case 5 : get('five').className = 'five';break;
                case 6 : get('six').className = 'six';break;

            }

        }
        // get('des1').className = 'remove';
    }
}

get('back1').onclick = function () {
    backH();
    get('uploadF1').style.display='none';
    get('uploadF1').className='hidDiv';
}

get('back2').onclick = function () {
    backH();
    get('uploadF2').style.display='none';
    get('uploadF2').className='hidDiv';
}

get('back3').onclick = function () {
    backH();
    get('uploadF3').style.display='none';
    get('uploadF3').className='hidDiv';
}


get('one').onclick = function() {

        // get('one').removeChild(get('img1'));
        get('des1').className = 'remove';
        get('img1').style.display = "none" ;
        get('one').className = 'selected';
        get('uploadF1').style.display='block';
        get('uploadF1').style.backgroundColor = "#9dc1fa";
        get('uploadF1').className='hidDiv up_in';
        // get('one').className = 'one_out';
        get('two').className = 'two_out';
        get('three').className = 'three_out';
        get('four').className = 'four_out';
        get('five').className = 'five_out';
        get('six').className = 'six_out';


}
get('two').onclick = function() {

    // get('two').className = 'two_out';
    get('des2').className = 'remove';

    // get('two').removeChild(get('img2'));
    get('img2').style.display = "none" ;
    get('uploadF2').style.display='block';
    get('uploadF2').style.backgroundColor= "#f7d79c";
    get('uploadF2').className='hidDiv up_in';
    get('one').className = 'one_out';
    get('two').className = 'selected';
    get('three').className = 'three_out';
    get('four').className = 'four_out';
    get('five').className = 'five_out';
    get('six').className = 'six_out';
}
get('three').onclick = function() {

    // get('three').className = 'three_out';
    get('des3').className = 'remove';
    // get('three').removeChild(get('img3'));
    get('img3').style.display = "none" ;
    get('uploadF3').style.display='block';
    get('uploadF3').style.backgroundColor= "#cf97e3";

    get('uploadF3').className='hidDiv up_in';
    get('one').className = 'one_out';
    get('two').className = 'two_out';
    get('three').className = 'selected';
    get('four').className = 'four_out';
    get('five').className = 'five_out';
    get('six').className = 'six_out';
}
get('four').onclick = function() {

    // get('four').className = 'four_out';
    get('des4').className = 'remove';
    // get('four').removeChild(get('img4'));
    get('img4').style.display = "none" ;
    get('uploadF').style.display='block';
    get('uploadF').style.backgroundColor= "#c3e1b5";
    get('uploadF').className='hidDiv up_in';
    get('one').className = 'one_out';
    get('two').className = 'two_out';
    get('three').className = 'three_out';
    get('four').className = 'selected';
    get('five').className = 'five_out';
    get('six').className = 'six_out';
}
get('five').onclick = function() {

    // get('five').className = 'five_out';
    get('des5').className = 'remove';
    // get('five').removeChild(get('img5'));
    get('img5').style.display = "none" ;
    get('uploadF').style.display='block';
    get('uploadF').style.backgroundColor= "#ecaea5";
    get('uploadF').className='hidDiv up_in';
    get('one').className = 'one_out';
    get('two').className = 'two_out';
    get('three').className = 'three_out';
    get('four').className = 'four_out';
    get('five').className = 'selected';
    get('six').className = 'six_out';
}
get('six').onclick = function() {

    // get('six').className = 'six_out';
    get('des6').className = 'remove';
    // get('six').removeChild(get('img6'));
    get('img6').style.display = "none" ;
    get('uploadF').style.display='block';
    get('uploadF').style.backgroundColor= "#ade6ef";
    get('uploadF').className='hidDiv up_in';
    get('one').className = 'one_out';
    get('two').className = 'two_out';
    get('three').className = 'three_out';
    get('four').className = 'four_out';
    get('five').className = 'five_out';
    get('six').className = 'selected';
}

//图片上传
var xhr;
var fname = {};

//上传文件方法
function UploadFile(divName) {
    var num = divName.slice(-1)
    var fileObj = document.getElementById("file"+num).files[0]; // js 获取文件对象
    var url = "http://34.92.52.134:5000" + "/api/v1/upload"; // 接收上传文件的后台地址

    var form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象

    xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
    xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
    console.log(divName);
    xhr.divName = divName;
    xhr.upload.num = num;
    xhr.num = num;
    xhr.onload = function () {
        //服务断接收完文件返回的结果
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            

            var progressBar = document.getElementById("progressBar"+num);
            var percentageDiv = document.getElementById("percentage"+num);
            var fileUploader = document.getElementById("file"+num);
            var preview = document.getElementById("preview"+num);
            var download = document.getElementById("download"+num);
            var downBox = document.getElementById("downBox"+num);
            if (data.success) {
                alert("上传成功！");
                console.log(data);
                progressBar.style.display = "none";
                fileUploader.style.display = "inline";
                percentageDiv.innerHTML = '完成';
                fname[this.divName] = data.filename;
                console.log(fname);
            } else {
                alert("上传失败！");
                progressBar.style.display = "none";
                fileUploader.style.display = "inline";
                percentageDiv.innerHTML = '失败';
            }
            preview.style.display = "none";
            downBox.style.display = "none";
        }
    }; //请求完成
    xhr.onerror = uploadFailed; //请求失败

    xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
    xhr.upload.onloadstart = function () {//上传开始执行方法
        ot = new Date().getTime();   //设置上传开始时间
        oloaded = 0;//设置上传开始时，以上传的文件大小为0
    };

    xhr.send(form); //开始上传，发送form数据
}

// //上传成功响应
// function uploadComplete(evt) {
// 	//服务断接收完文件返回的结果

// 	var data = JSON.parse(evt.target.responseText);
// 	var progressBar = document.getElementById("progressBar2");
// 	var percentageDiv = document.getElementById("percentage2");
// 	var fileUploader = document.getElementById("file2");
// 	var preview = document.getElementById("preview2");
// 	var download = document.getElementById("download2");
// 	var downBox = document.getElementById("downBox2");
// 	if (data.success) {
// 		alert("上传成功！");
// 		console.log(data);
// 		progressBar.style.display = "none";
// 		fileUploader.style.display = "inline";
// 		percentageDiv.innerHTML = '完成';
// 		fname = data.filename;
// 	} else {
// 		alert("上传失败！");
// 		progressBar.style.display = "none";
// 		fileUploader.style.display = "inline";
// 		percentageDiv.innerHTML = '失败';
// 	}
// 	preview.style.display = "none";
// 	downBox.style.display = "none";

// }

//上传失败
function uploadFailed(evt) {
    alert("上传失败！");
    progressBar.style.display = "none";
    fileUploader.style.display = "inline";
    percentageDiv.innerHTML = '失败';
}

//取消上传
function cancelUploadFile() {
    xhr.abort();
}

//添加水印
function addWaterMark(divName) {
    var text = document.getElementById("text").value;
    if (text.replace(/(^s*)|(s*$)/g, "").length == 0) {
        alert("请输入水印文字！")
    } else if (fname[divName]) {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/add/watermark";
        xmlhttp.open("POST", theUrl, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(JSON.stringify({
            "video_name": fname[divName],
            "text": text
        }));
        xmlhttp.divName = divName;
        xmlhttp.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                var res = JSON.parse(this.responseText);
                var down = document.getElementById("download2"); // 获取元素
                var downBox = document.getElementById("downBox2");
                down.innerHTML = "处理中"; // 将元素内文本内容改成：处理中
                downBox.style.display = "block"; //显示这个元素（本来是none不显示）
                console.log(res) // debug用的
                previewIMG(this.divName); // 生成preview
                checkResult(res); // 检查任务有没有完成
            }
        }
        xmlhttp.send(JSON.stringify({
            "video_name": fname[divName],
            "text": text
        }));
    } else {
        alert('请先上传文件!');
    }
}

function checkResult(data) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/add/watermark/" + data.Request_id;
    var download = document.getElementById("download2");
    var downBox = document.getElementById("downBox2");
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            console.log(res)
            if (res.Status == "PROCESS_SUCCESS") {
                var downAPI = "http://34.92.52.134:5000/api/v1/download/";
                download.href = downAPI + res.Result.video_name;
                download.innerHTML = "下载视频";
                downBox.style.display = "block";
            } else if (res.Status == "PROCESS_FAILED") {
                download.innerHTML = "处理失败: " + res.ErrorMessage;
                downBox.style.display = "block";
            } else {
                setTimeout(checkResult, 20000, data);
            }
        }
    }
    xmlhttp.send(null);
}


function previewIMG(divName) {
    var text = document.getElementById("text").value;
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/add/watermark/preview/" + fname[divName] + "|" + text;
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            console.log(res)
            if (res.success) {
                var preview = document.getElementById("preview2");
                preview.src = res.watermark
                preview.style.display = "block";
            }
        }
    }
    xmlhttp.send(null);
}


//上传进度实现方法，上传过程中会频繁调用该方法
function progressFunction(evt) {
    var progressBar = document.getElementById("progressBar"+this.num);
    var percentageDiv = document.getElementById("percentage"+this.num);
    var fileUploader = document.getElementById("file"+this.num);
    // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
    progressBar.style.display = "inline";
    fileUploader.style.display = "none";
    if (evt.lengthComputable) {//
        progressBar.max = evt.total;
        progressBar.value = evt.loaded;
        percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
    }
    // var time = document.getElementById("time");
    // var nt = new Date().getTime();//获取当前时间
    // var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
    // ot = new Date().getTime(); //重新赋值时间，用于下次计算
    // var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
    // oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
    // //上传速度计算
    // var speed = perload / pertime;//单位b/s
    // var bspeed = speed;
    // var units = 'b/s';//单位名称
    // if (speed / 1024 > 1) {
    //     speed = speed / 1024;
    //     units = 'k/s';
    // }
    // if (speed / 1024 > 1) {
    //     speed = speed / 1024;
    //     units = 'M/s';
    // }
    // speed = speed.toFixed(1);
    // //剩余时间
    // var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
    // time.innerHTML = '，S：' + speed + units + '，ETA：' + resttime + 's';
    // if (bspeed == 0) time.innerHTML = '上传已取消';
}

let boxes = {};
let box = {};

function setDimensions(ele) {
    const outRect = document.getElementById("workspace1");
    const outRectR = outRect.getBoundingClientRect();
    const inRect = ele.getBoundingClientRect();
    const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);
    const outStyle = outRect.currentStyle || window.getComputedStyle(outRect);
    let H, W, X, Y;
    H = inRect.height/outRectR.height;
    W = inRect.width/outRectR.width;
    X = (ele.offsetLeft-Intify(outStyle.marginLeft))/outRectR.width;
    Y = (ele.offsetTop-Intify(outStyle.marginTop))/outRectR.height;
    boxes[ele.id] = {"H": H, "W": W, "X": X, "Y": Y};
    console.log(boxes);
}

function setDimensions2(ele) {
    const outRect = document.getElementById("workspace3");
    const outRectR = outRect.getBoundingClientRect();
    const inRect = ele.getBoundingClientRect();
    const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);
    const outStyle = outRect.currentStyle || window.getComputedStyle(outRect);
    let H, W, X, Y;
    H = inRect.height/outRectR.height;
    W = inRect.width/outRectR.width;
    X = (ele.offsetLeft-Intify(outStyle.marginLeft))/outRectR.width;
    Y = (ele.offsetTop-Intify(outStyle.marginTop))/outRectR.height;
    box = {"BH": H, "BW": W, "BX": X, "BY": Y};
    console.log(box);
}

function eraseLogo(divName) {
    if (fname[divName]) {
        let data = [];
        for (const [key, value] of Object.entries(boxes)) {
            data.push(value);
        };
        // console.log(data);
        // console.log(Number.isNaN(data[0].H));
        if (!Number.isNaN(data[0].H)) {
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/logo";
            xmlhttp.open("POST", theUrl, true);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            console.log(JSON.stringify({"video_name": fname[divName], "boxess": data}));
            xmlhttp.onload = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    var down = document.getElementById("download1"); // 获取元素
                    var downBox = document.getElementById("downBox1");
                    if (res.count > 1) {
                        var text = `由于视频过长，已分成 ${res.count} 小份,`;
                        for (var i = 0; i < res.count; i++) {
                            text += ` 视频${i+1}: 处理中`;
                        }
                        down.innerHTML = text;
                        downBox.style.display = "block";
                    } else {
                    down.innerHTML = "处理中"; // 将元素内文本内容改成：处理中
                    downBox.style.display = "block"; //显示这个元素（本来是none不显示）
                    console.log(res) // debug用的
                }
                    // previewIMG2(); // 生成preview
                    eraseLogoStatus(res, fname[divName]); // 检查任务有没有完成
                
                }
            }
            xmlhttp.send(JSON.stringify({"video_name": fname[divName], "boxess": data}));
        } else {
            alert("请先移动台标覆盖方块");
        }
    } else {
        alert("请先上传文件！")
    }
}

function eraseLogoStatus(res, videoName) {
    var jobId = res.Request_id
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/logo/"+jobId;
    var download = document.getElementById("download1");
    var downBox = document.getElementById("downBox1");
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res2 = JSON.parse(this.responseText);
            console.log(res2);
            if (res2.Status == "PROCESS_SUCCESS") {
                eraseLogoUpdateInfo(res2, videoName, res.count);
            } else if (res2.Status == "PROCESS_FAILED") {
                download.innerHTML = "处理失败: " + res2.ErrorMessage;
                downBox.style.display = "block";
            } else {
                setTimeout(eraseLogoStatus, 5000, res, videoName);
            }
        }
    }
    xmlhttp.send(null);
}

function eraseLogoUpdateInfo(res, videoName, count) {
    var download = document.getElementById("download1");
    var downBox = document.getElementById("downBox1");
    var requestIds = res.Result.request_ids;
    var text = `由于视频过长，已分成 ${count} 小份,`;
    var i = 1;
    var pass = [];
    var filenames = [];
    var result = "";
    for (let id of requestIds) {
        result = checkResult2(id, videoName);
        if (result.Status == "PROCESS_SUCCESS") {
            text += ` 视频${i}: 处理完成`;
            pass.push(true);
            filenames.push(id);
        } else if (result.Status == "PROCESS_FAILED") {
            text += ` 视频${i}: 处理失败，${result.Result.ErrorMessage}`;
            pass.push(false);
        } else {
            text += ` 视频${i}: 处理中`;
        }
    }
    download.innerHTML = text;
    downBox.style.display = "block";
    const isTrue = (data) => data;
    if (!pass.every(isTrue)) {
        text += " 由于部分视频分段处理失败，无法合成视频，请刷新页面后重试";
        download.innerHTML = text;
        downBox.style.display = "block";
    } else if (pass.length < requestIds.length) {
        setTimeout(eraseLogoUpdateInfo, 5000, res, videoName, count);
    } else {
        if (pass.length == 1) {
            download.innerHTML = "下载视频";
            download.href = result.Result.VideoUrl;
            downBox.style.display = "block";
        } else {
            eraseLogoProcessVideo(videoName, requestIds);
        }
    }
}

function eraseLogoProcessVideo(fname, requestIds) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/logo/combine";
    xmlhttp.open("POST", theUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify({"video_name": fname, "filenames": requestIds}));
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            eraseLogoProcessVideoCheckStatus(data.Request_id);
        }
    }
    xmlhttp.send(JSON.stringify({"video_name": fname, "filenames": requestIds}));
}

function eraseLogoProcessVideoCheckStatus(id) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/logo/combine/"+id;
    var download = document.getElementById("download1");
    var downBox = document.getElementById("downBox1");
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            console.log(res);
            if (res.Status == "PROCESS_SUCCESS") {
                download.innerHTML = "下载视频"
                download.href = "http://34.92.52.134:5000/api/v1/download/"+res.Result.video_name
            } else if (res.Status == "PROCESS_FAILED") {
                console.log(res.Result);
                download.innerHTML = "处理失败: " + res.Result.ErrorMessage;
                downBox.style.display = "block";
            } else {
                setTimeout(eraseLogoProcessVideoCheckStatus, 10000, id);
            }
        }
    }
    xmlhttp.send(null);
}

function checkResult2(res, videoName) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/job/status";
    var download = document.getElementById("download1");
    var downBox = document.getElementById("downBox1");
    xmlhttp.open("POST", theUrl, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify({"Request_id": res, "video_name": videoName}));
    
    xmlhttp.send(JSON.stringify({"Request_id": res, "video_name": videoName}));

    while (xmlhttp.readyState !== 4) {}

    if (xmlhttp.status == 200) {
        var data = JSON.parse(xmlhttp.responseText);
        console.log(data);
        return data
    }
}



function eraseSubtitle(divName) {
    if (fname[divName]) {
        // console.log(data);
        // console.log(Number.isNaN(data[0].H));
        if (!Number.isNaN(box.BH)) {
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/subtitle";
            xmlhttp.open("POST", theUrl, true);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            console.log(JSON.stringify({"video_name": fname[divName], "box": box}));
            xmlhttp.onload = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    var down = document.getElementById("download3"); // 获取元素
                    var downBox = document.getElementById("downBox3");
                    if (res.count > 1) {
                        var text = `由于视频过长，已分成 ${res.count} 小份,`;
                        for (var i = 0; i < res.count; i++) {
                            text += ` 视频${i+1}: 处理中`;
                        }
                        down.innerHTML = text;
                        downBox.style.display = "block";
                    } else {
                    down.innerHTML = "处理中"; // 将元素内文本内容改成：处理中
                    downBox.style.display = "block"; //显示这个元素（本来是none不显示）
                    console.log(res) // debug用的
                }
                    // previewIMG2(); // 生成preview
                    eraseSubtitleStatus(res, fname[divName]); // 检查任务有没有完成
                
                }
            }
            xmlhttp.send(JSON.stringify({"video_name": fname[divName], "box": box}));
        } else {
            alert("请先移动台标覆盖方块");
        }
    } else {
        alert("请先上传文件！")
    }
}

function eraseSubtitleStatus(res, videoName) {
    var jobId = res.Request_id
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/subtitle/"+jobId;
    var download = document.getElementById("download3");
    var downBox = document.getElementById("downBox3");
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res2 = JSON.parse(this.responseText);
            console.log(res2);
            if (res2.Status == "PROCESS_SUCCESS") {
                eraseSubtitleUpdateInfo(res2, videoName, res.count);
            } else if (res2.Status == "PROCESS_FAILED") {
                download.innerHTML = "处理失败: " + res2.ErrorMessage;
                downBox.style.display = "block";
            } else {
                setTimeout(eraseSubtitleStatus, 5000, res, videoName);
            }
        }
    }
    xmlhttp.send(null);
}

function eraseSubtitleUpdateInfo(res, videoName, count) {
    var download = document.getElementById("download3");
    var downBox = document.getElementById("downBox3");
    var requestIds = res.Result.request_ids;
    var text = `由于视频过长，已分成 ${count} 小份,`;
    var i = 1;
    var pass = [];
    var filenames = [];
    var result = "";
    for (let id of requestIds) {
        result = checkResult3(id, videoName);
        if (result.Status == "PROCESS_SUCCESS") {
            text += ` 视频${i}: 处理完成`;
            pass.push(true);
            filenames.push(id);
        } else if (result.Status == "PROCESS_FAILED") {
            text += ` 视频${i}: 处理失败，${result.Result.ErrorMessage}`;
            pass.push(false);
        } else {
            text += ` 视频${i}: 处理中`;
        }
    }
    download.innerHTML = text;
    downBox.style.display = "block";
    const isTrue = (data) => data;
    if (!pass.every(isTrue)) {
        text += " 由于部分视频分段处理失败，无法合成视频，请刷新页面后重试";
        download.innerHTML = text;
        downBox.style.display = "block";
    } else if (pass.length < requestIds.length) {
        setTimeout(eraseSubtitleUpdateInfo, 5000, res, videoName, count);
    } else {
        if (pass.length == 1) {
            download.innerHTML = "下载视频";
            download.href = result.Result.VideoUrl;
            downBox.style.display = "block";
        } else {
            eraseSubtitleProcessVideo(videoName, requestIds);
        }
    }
}

function eraseSubtitleProcessVideo(fname, requestIds) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/subtitle/combine";
    xmlhttp.open("POST", theUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify({"video_name": fname, "filenames": requestIds}));
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            eraseSubtitleProcessVideoCheckStatus(data.Request_id);
        }
    }
    xmlhttp.send(JSON.stringify({"video_name": fname, "filenames": requestIds}));
}

function eraseSubtitleProcessVideoCheckStatus(id) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/erase/subtitle/combine/"+id;
    var download = document.getElementById("download3");
    var downBox = document.getElementById("downBox3");
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            console.log(res);
            if (res.Status == "PROCESS_SUCCESS") {
                download.innerHTML = "下载视频"
                download.href = "http://34.92.52.134:5000/api/v1/download/"+res.Result.video_name
            } else if (res.Status == "PROCESS_FAILED") {
                console.log(res.Result);
                download.innerHTML = "处理失败: " + res.Result.ErrorMessage;
                downBox.style.display = "block";
            } else {
                setTimeout(eraseSubtitleProcessVideoCheckStatus, 10000, id);
            }
        }
    }
    xmlhttp.send(null);
}

function checkResult3(res, videoName) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://34.92.52.134:5000/api/video/admin/v1.0/job/status";
    var download = document.getElementById("download3");
    var downBox = document.getElementById("downBox3");
    xmlhttp.open("POST", theUrl, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify({"Request_id": res, "video_name": videoName}));
    
    xmlhttp.send(JSON.stringify({"Request_id": res, "video_name": videoName}));

    while (xmlhttp.readyState !== 4) {}

    if (xmlhttp.status == 200) {
        var data = JSON.parse(xmlhttp.responseText);
        console.log(data);
        return data
    }
}



function getPxNumber(str) {
    return parseFloat(str, 10);
}
function Intify(element) {
    return parseInt(element)
}
function* addBoxNextId(){
    let current_id=0;
    while(true) {
        current_id++;
        yield "addBox"+current_id.toString();
    }
}

let g = addBoxNextId();

function* boxNextId(){
    let current_id=1;
    while(true) {
        current_id++;
        yield "box"+current_id.toString();
    }
}

let gB = boxNextId();

function handleMouseDown(ele, eles, onMove, bindUpAndDown) {
    return function({ target, clientX: x, clientY: y }) {
        let x0 = x;
        let y0 = y;
        function handleMove(e, ...rest) {
            const { clientX, clientY } = e;
            e.preventDefault();
            let detaX = clientX - x0;
            let detaY = clientY - y0;
            const outRect = document.getElementById("workspace1");
            const inRect = ele;
            const [tl, tr, bl, br] = eles;
            const isLeft = [tl, bl].includes(target);
            const isTop = [tl, tr].includes(target);
            const isCorner = eles.includes(target);
            const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);

            const outStyle = outRect.currentStyle || window.getComputedStyle(outRect);
            
            if (inRect.offsetLeft-Intify(outStyle.marginLeft)+detaX < 0) {
                if (!isCorner) {
                    detaX = detaX > 0 ? detaX : -(inRect.offsetLeft-Intify(outStyle.marginLeft));
                } else {
                    detaX = isLeft ? 0 : detaX;
                }
                
            } else if (inRect.offsetLeft+inRect.offsetWidth-bodyMargin-Intify(outStyle.marginRight)+detaX > outRect.offsetWidth) {
                if (!isCorner) {
                    detaX = detaX > 0 ? outRect.offsetWidth-(inRect.offsetLeft+inRect.offsetWidth-bodyMargin-Intify(outStyle.marginRight)) : detaX;
                } else {
                    detaX = !isLeft ? 0 : detaX;
                }
            }
            if (inRect.offsetTop-Intify(outStyle.marginTop)+detaY < 0) {
                if (!isCorner) {
                    detaY = detaY > 0 ? detaY: -(inRect.offsetTop-Intify(outStyle.marginTop));
                } else {
                    detaY = isTop ? 0 : detaY;
                }
            } else if (inRect.offsetTop+inRect.offsetHeight-bodyMargin-Intify(outStyle.marginBottom)+detaY > outRect.offsetHeight) {
                if (!isCorner) {
                    detaY = detaY > 0 ? outRect.offsetHeight-(inRect.offsetTop+inRect.offsetHeight-bodyMargin-Intify(outStyle.marginBottom)) : detaY;
                } else {
                    detaY = !isTop ? 0 : detaY;
                }
            }

            // console.log(outRect.getBoundingClientRect());
            // console.log(inRect.getBoundingClientRect());
            // console.log(inRect.offsetTop);
            // console.log("------------------------------------")

            x0 = clientX;
            y0 = clientY;
            onMove(target, detaX, detaY, ...rest);
            setDimensions(ele);
        }
        bindUpAndDown(target, handleMove);
    };
}
function renderCorner({ width, height }) {

const eles = Array.from({ length: 5 }).map(() =>
        document.createElement("div")
    );

eles.forEach(x => x.classList.add("controller-corner"));
const [tl, tr, bl, br, add] = eles;
Object.assign(tl.style, {
    top: `-5px`,
    left: `-5px`,
    cursor: "nw-resize"
});
Object.assign(tr.style, {
    top: `-5px`,
    cursor: "ne-resize",
    right: `-5px`
});
Object.assign(bl.style, {
    bottom: `-5px`,
    cursor: "sw-resize",
    left: `-5px`
});
Object.assign(br.style, {
    bottom: `-5px`,
    cursor: "se-resize",
    right: `-5px`
});
Object.assign(add.style, {
    bottom: `50%`,
    cursor: "pointer",
    right: `-10px`,
    borderRadius: `10px`,
    width: `20px`,
    height: `20px`
});
add.id = g.next().value;
add.onclick = Function("addAnother(gB.next().value);");
add.innerHTML = "+";
return { eles };
}
function createControler(man, ele, { x, y, width, height }, { minSize = 10 }) {
let { eles } = renderCorner({ x, y, width, height });
const [tl, tr, bl, br, add] = eles;
const handleControlerMouseDown = handleMouseDown(
    man,
    eles,
    (target, detaX, detaY, isMoveTargetElement) => {
    const isLeft = [tl, bl].includes(target);
    const isTop = [tl, tr].includes(target);
    const directionLeft = !isLeft ? 1 : -1;
    const directionTop = !isTop ? 1 : -1;
    const outRect = document.getElementById("workspace1");
    const outStyle = outRect.currentStyle || window.getComputedStyle(outRect);
    const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);
    let newWidth = getPxNumber(ele._style_.width) + directionLeft * detaX;
    let newHeight =
        getPxNumber(ele._style_.height) + directionTop * detaY;

    if (isMoveTargetElement) {
        const newL = getPxNumber(ele._style_.left);
        const newT = getPxNumber(ele._style_.top);
        ele._style_.left = `${newL + detaX}px`;
        ele._style_.top = `${newT + detaY}px`;
        return;
    }
    newWidth = newWidth < minSize ? minSize : newWidth;
    newHeight = newHeight < minSize ? minSize : newHeight;
    if (ele.offsetLeft-Intify(outStyle.marginLeft) <= 0) {
        newWidth = isLeft ? ele.offsetWidth : newWidth;
    } else if (ele.offsetLeft+newWidth-bodyMargin-Intify(outStyle.marginRight) >= outRect.offsetWidth) {
        newWidth = !isLeft ? ele.offsetWidth : newWidth;
    }
    if (ele.offsetTop-Intify(outStyle.marginTop) <= 0) {
        newHeight = isTop ? ele.offsetHeight : newHeight;
    } else if (ele.offsetTop+newHeight-bodyMargin-Intify(outStyle.marginBottom) >= outRect.offsetHeight) {
        newHeight = !isTop ? ele.offsetHeight : newHeight;
    }

    let left = getPxNumber(ele._style_.left) - directionLeft * detaX;
    let top = getPxNumber(ele._style_.top) - directionTop * detaY;

    left = left < 0 ? 0 : left;
    top = top < 0 ? 0 : top;


    ele._style_.width = `${newWidth}px`;
    ele._style_.height = `${newHeight}px`;
    ele._style_.left = isLeft ? `${left}px` : ele._style_.left;
    ele._style_.top = isTop ? `${top}px` : ele._style_.top;
    },
    (target, handleMove) => {
    const handleMoveTargetElement = e => handleMove(e, true);
    if ([man, ele, ...eles].includes(target)) {
        eles.splice(4, 1);
        if (eles.includes(target)) {
            document.addEventListener("mousemove", handleMove);
        } else {
            document.addEventListener("mousemove", handleMoveTargetElement);
        }
        document.addEventListener("mouseup", ({ target }) => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mousemove", handleMoveTargetElement);
        });
    }
}
);
document.addEventListener("mousedown", handleControlerMouseDown);
eles.forEach(e => {
    ele.appendChild(e);
});
return {
    removeControler() {
    eles.forEach(e => {
        ele.removeChild(e);
    });
    document.removeEventListener("mousedown", handleControlerMouseDown);
    },
    eles: [...eles, ele]
};
}
function injectController(ele, config) {
let { x, y, width, height } = {x:ele.offsetLeft, y:ele.offsetTop, width:ele.offsetWidth, height:ele.offsetHeight};
//const outRect = document.getElementById("out").getBoundingClientRect();
//const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);
const controlWrapper = document.createElement("div");
const _style_ = new Proxy(controlWrapper.style, {
    get(o, key) {
    let originalStyleValue = Reflect.get(o, key);
    if (
        ["width", "height", "left", "top"].includes(key) &&
        !originalStyleValue
    ) {
        originalStyleValue = {
            width:controlWrapper.offsetWidth,
            height:controlWrapper.offsetHeight,
            left:controlWrapper.offsetLeft,
            top:controlWrapper.offsetTop
        }[key];
    }
    return originalStyleValue;
    },
    set(o, key, val) {
    const pxNumber = getPxNumber(val);
    if (["left", "top"].includes(key)) {
        ele.style[key] = `${pxNumber}px`;
    } else if (["width", "height"].includes(key)) {
        ele.style[key] = val;
    }
    Reflect.set(o, key, val);
    return val;
    }
});
Object.assign(controlWrapper.style, {
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    top: `${y}px`,
    left: `${x}px`,
    cursor: "all-scroll"
});
controlWrapper._style_ = _style_;
const { removeControler, eles } = createControler(
    ele,
    controlWrapper,
    {
    width,
    height
    },
    config,
);
insertAfter(controlWrapper, ele);
return {
    removeAllControler() {
    removeControler();
    ele.parentNode.removeChild(controlWrapper);
    },
    eles: [...eles, controlWrapper]
};
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function injectDragger(ele, config = {}) {
let removeDragger;
ele.addEventListener("mousedown", () => {
    if (!removeDragger) {
    console.log(ele.getBoundingClientRect());
    const { removeAllControler, eles } = injectController(ele, config);
    removeDragger = removeAllControler;
    const handleRemove = ({ target }) => {
        console.log(target);
        if (![...eles, ele].includes(target)) {
        removeDragger && removeDragger();
        removeDragger = undefined;
        document.removeEventListener("mousedown", handleRemove);
    }
    };
    document.addEventListener("mousedown", handleRemove);
    }
});
setDimensions(ele);
}

injectDragger(document.querySelector("#box"), { minSize: 30 });
function addAnother(id) {
    let workspace = document.getElementById("workspace1");
    let child = document.createElement("div");
    child.id=id;
    child.innerHTML = "拖动和调整大小来覆盖台标区域"
    Object.assign(child.style, {
        
        position: `absolute`,
        margin: `0px`,
        overflow: `hidden`,
        border: `1px dashed rgb(0, 0, 0)`,
        background: `rgba(110, 185, 255, 0.45)`,
        height: `100px`,
        width: `200px`,
        left: `30px`,
        top: `46px`
    })
    workspace.appendChild(child);
    injectDragger(child, { minSize: 30 })
}





function handleMouseDown2(ele, eles, onMove2, bindUpAndDown2) {
    return function({ target, clientX: x, clientY: y }) {
        let x0 = x;
        let y0 = y;
        function handleMove2(e, ...rest) {
            const { clientX, clientY } = e;
            e.preventDefault();
            let detaX = clientX - x0;
            let detaY = clientY - y0;
            const outRect = document.getElementById("workspace3");
            const inRect = ele;
            const [tl, tr, bl, br] = eles;
            const isLeft = [tl, bl].includes(target);
            const isTop = [tl, tr].includes(target);
            const isCorner = eles.includes(target);
            const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);

            const outStyle = outRect.currentStyle || window.getComputedStyle(outRect);
            
            if (inRect.offsetLeft-Intify(outStyle.marginLeft)+detaX < 0) {
                if (!isCorner) {
                    detaX = detaX > 0 ? detaX : -(inRect.offsetLeft-Intify(outStyle.marginLeft));
                } else {
                    detaX = isLeft ? 0 : detaX;
                }
                
            } else if (inRect.offsetLeft+inRect.offsetWidth-bodyMargin-Intify(outStyle.marginRight)+detaX > outRect.offsetWidth) {
                if (!isCorner) {
                    detaX = detaX > 0 ? outRect.offsetWidth-(inRect.offsetLeft+inRect.offsetWidth-bodyMargin-Intify(outStyle.marginRight)) : detaX;
                } else {
                    detaX = !isLeft ? 0 : detaX;
                }
            }
            if (inRect.offsetTop-Intify(outStyle.marginTop)+detaY < 0) {
                if (!isCorner) {
                    detaY = detaY > 0 ? detaY: -(inRect.offsetTop-Intify(outStyle.marginTop));
                } else {
                    detaY = isTop ? 0 : detaY;
                }
            } else if (inRect.offsetTop+inRect.offsetHeight-bodyMargin-Intify(outStyle.marginBottom)+detaY > outRect.offsetHeight) {
                if (!isCorner) {
                    detaY = detaY > 0 ? outRect.offsetHeight-(inRect.offsetTop+inRect.offsetHeight-bodyMargin-Intify(outStyle.marginBottom)) : detaY;
                } else {
                    detaY = !isTop ? 0 : detaY;
                }
            }

            // console.log(outRect.getBoundingClientRect());
            // console.log(inRect.getBoundingClientRect());
            // console.log(inRect.offsetTop);
            // console.log("------------------------------------")

            x0 = clientX;
            y0 = clientY;
            onMove2(target, detaX, detaY, ...rest);
            setDimensions2(ele);
        }
        bindUpAndDown2(target, handleMove2);
    };
}
function renderCorner2({ width, height }) {

const eles = Array.from({ length: 4 }).map(() =>
        document.createElement("div")
    );

eles.forEach(x => x.classList.add("controller-corner"));
const [tl, tr, bl, br] = eles;
Object.assign(tl.style, {
    top: `-5px`,
    left: `-5px`,
    cursor: "nw-resize"
});
Object.assign(tr.style, {
    top: `-5px`,
    cursor: "ne-resize",
    right: `-5px`
});
Object.assign(bl.style, {
    bottom: `-5px`,
    cursor: "sw-resize",
    left: `-5px`
});
Object.assign(br.style, {
    bottom: `-5px`,
    cursor: "se-resize",
    right: `-5px`
});
return { eles };
}
function createControler2(man, ele, { x, y, width, height }, { minSize = 10 }) {
let { eles } = renderCorner2({ x, y, width, height });
const [tl, tr, bl, br] = eles;
const handleControlerMouseDown = handleMouseDown2(
    man,
    eles,
    (target, detaX, detaY, isMoveTargetElement) => {
    const isLeft = [tl, bl].includes(target);
    const isTop = [tl, tr].includes(target);
    const directionLeft = !isLeft ? 1 : -1;
    const directionTop = !isTop ? 1 : -1;
    const outRect = document.getElementById("workspace3");
    const outStyle = outRect.currentStyle || window.getComputedStyle(outRect);
    const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);
    let newWidth = getPxNumber(ele._style_.width) + directionLeft * detaX;
    let newHeight = getPxNumber(ele._style_.height) + directionTop * detaY;

    if (isMoveTargetElement) {
        const newL = getPxNumber(ele._style_.left);
        const newT = getPxNumber(ele._style_.top);
        ele._style_.left = `${newL + detaX}px`;
        ele._style_.top = `${newT + detaY}px`;
        return;
    }
    newWidth = newWidth < minSize ? minSize : newWidth;
    newHeight = newHeight < minSize ? minSize : newHeight;
    if (ele.offsetLeft-Intify(outStyle.marginLeft) <= 0) {
        newWidth = isLeft ? ele.offsetWidth : newWidth;
    } else if (ele.offsetLeft+newWidth-bodyMargin-Intify(outStyle.marginRight) >= outRect.offsetWidth) {
        newWidth = !isLeft ? ele.offsetWidth : newWidth;
    }
    if (ele.offsetTop-Intify(outStyle.marginTop) <= 0) {
        newHeight = isTop ? ele.offsetHeight : newHeight;
    } else if (ele.offsetTop+newHeight-bodyMargin-Intify(outStyle.marginBottom) >= outRect.offsetHeight) {
        newHeight = !isTop ? ele.offsetHeight : newHeight;
    }

    let left = getPxNumber(ele._style_.left) - directionLeft * detaX;
    let top = getPxNumber(ele._style_.top) - directionTop * detaY;

    left = left < 0 ? 0 : left;
    top = top < 0 ? 0 : top;


    ele._style_.width = `${newWidth}px`;
    ele._style_.height = `${newHeight}px`;
    ele._style_.left = isLeft ? `${left}px` : ele._style_.left;
    ele._style_.top = isTop ? `${top}px` : ele._style_.top;
    },
    (target, handleMove) => {
    const handleMoveTargetElement = e => handleMove(e, true);
    if ([man, ele, ...eles].includes(target)) {
        eles.splice(4, 1);
        if (eles.includes(target)) {
            document.addEventListener("mousemove", handleMove);
        } else {
            document.addEventListener("mousemove", handleMoveTargetElement);
        }
        document.addEventListener("mouseup", ({ target }) => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mousemove", handleMoveTargetElement);
        });
    }
}
);
document.addEventListener("mousedown", handleControlerMouseDown);
eles.forEach(e => {
    ele.appendChild(e);
});
return {
    removeControler2() {
    eles.forEach(e => {
        ele.removeChild(e);
    });
    document.removeEventListener("mousedown", handleControlerMouseDown);
    },
    eles: [...eles, ele]
};
}
function injectController2(ele, config) {
let { x, y, width, height } = {x:ele.offsetLeft, y:ele.offsetTop, width:ele.offsetWidth, height:ele.offsetHeight};
//const outRect = document.getElementById("out").getBoundingClientRect();
//const bodyMargin = getPxNumber(getComputedStyle(document.body).margin);
const controlWrapper = document.createElement("div");
const _style_ = new Proxy(controlWrapper.style, {
    get(o, key) {
    let originalStyleValue = Reflect.get(o, key);
    if (
        ["width", "height", "left", "top"].includes(key) &&
        !originalStyleValue
    ) {
        originalStyleValue = {
            width:controlWrapper.offsetWidth,
            height:controlWrapper.offsetHeight,
            left:controlWrapper.offsetLeft,
            top:controlWrapper.offsetTop
        }[key];
    }
    return originalStyleValue;
    },
    set(o, key, val) {
    const pxNumber = getPxNumber(val);
    if (["left", "top"].includes(key)) {
        ele.style[key] = `${pxNumber}px`;
    } else if (["width", "height"].includes(key)) {
        ele.style[key] = val;
    }
    Reflect.set(o, key, val);
    return val;
    }
});
Object.assign(controlWrapper.style, {
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    top: `${y}px`,
    left: `${x}px`,
    cursor: "all-scroll"
});
controlWrapper._style_ = _style_;
const { removeControler2, eles } = createControler2(
    ele,
    controlWrapper,
    {
    width,
    height
    },
    config
);
insertAfter2(controlWrapper, ele);
return {
    removeAllControler() {
    removeControler2();
    ele.parentNode.removeChild(controlWrapper);
    },
    eles: [...eles, controlWrapper]
};
}

function insertAfter2(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function injectDragger2(ele, config = {}) {
let removeDragger;
ele.addEventListener("mousedown", () => {
    if (!removeDragger) {
    console.log(ele.getBoundingClientRect());
    const { removeAllControler, eles } = injectController2(ele, config);
    removeDragger = removeAllControler;
    const handleRemove = ({ target }) => {
        console.log(target);
        if (![...eles, ele].includes(target)) {
        removeDragger && removeDragger();
        removeDragger = undefined;
        document.removeEventListener("mousedown", handleRemove);
    }
    };
    document.addEventListener("mousedown", handleRemove);
    }
});
setDimensions2(ele);
}


injectDragger2(document.querySelector("#tbox"), { minSize: 30 });
