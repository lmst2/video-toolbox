# 视频工具箱
video-toolbox

[TOC]

### 任务

功能模块

- [ ] 视频水印
- [ ] 视频字幕擦除
- [ ] 视频台标擦除
- [ ] 。。。


### Quick Start

1. 安装[Git](https://git-scm.com/)

2. 克隆项目到本地:
    * gitlab.lmst.dev: ```git clone git@gitlab.lmst.dev:lighnings-master/video-toolbox.git```
    * gitlab.com: ```git@gitlab.com:lightnings-master/video-toolbox.git```

3. 进入项目，安装依赖：``pip install -r requirements.txt``

4. 运行api server: ``python start_server.py``

### 文档

#### api_server 的使用

* erase video watermark
  * api: ``localhost:port/video/api/admin/v1.0/erase/logo``
  * method: `POST`
  * body: `json`
    * ```json
      {
          "video": "aliyun url",
          "boxess":[
              {
                  "H": 0,
                  "W": 0,
                  "X": 0,
                  "Y": 0
              },
              {
                  "H": 0,
                  "W": 0,
                  "X": 0,
                  "Y": 0
              }
          ]
      }
      ```
  * result: `json`
    * ```json
      {
          "request_id": "id"
      }
      ```

* erase video subtitle
  * api: ``localhost:port/video/api/admin/v1.0/erase/subtitle``
  * method: `POST`
  * body: `json`
    * ```json
      {
          "video": "aliyun url",
          "box": {
              "BH": 0,
              "BW": 0,
              "BX": 0,
              "BY": 0
          }
      }
      ```
  * result: `json`
    * ```json
      {
          "request_id": "id"
      }
      ```
  
* get async job result
  * api: ``localhost:port/video/api/admin/v1.0/job/status``
  * method: `POST`
  * body: `json`
    * ```json
      {
            "Request_id": "id"
      }
      ```
  * result:
    1. 已完成
       ```json
       {
           "Success": true,
           "Result": {
               "VideoUrl": "aliyun url"
           }
       }
       ```
    2. 处理中
       ```json
       {
           "Success": false,
           "Result": {
               "ErrorCode": "",
               "ErrorMessage": "PROCESSING"
           }
       }
       ```
    3. 处理失败
       ```json
       {
           "Success": false,
           "Result": {
               "ErrorCode": "aliyun ErrorCode",
               "ErrorMessage": "aliyun ErrorMessage"
           }
       }
       ```

* video watermark
  * api: ``localhost:port/video/api/admin/v1.0/add/watermark``
  * send request
    * method:  `POST`:
    * body: `json`
      * ```json
        {
            "dir": "文件路径，这个以后会预先设置好，前端上传的文件固定储存在一个位置",
            "video_name": "视频文件名称，准备前端上传完成之后把名称md5化",
            "text": "水印文字"
        }
        ```
    * result: `json`
      * ```json
        {
          "Request_id": "7649016636032794357"
        }
        ```
  * get result
    * method: `GET`
    * body: `json`
      * ```json
        {
          "Request_id": "-1977834914403261654"
        }
        ```
    * result: `json`
      1. 处理失败
         ```json
         {
           "ErrorMessage": "No such request id",
           "Status": "PROCESS_FAILED"
         }
         ```
      2. 处理成功
         ```json
         {
             "Status": "PROCESS_SUCCESS", 
             "Result": {
                 "video_name": "处理完成后的视频名称， 前端可以根据设定好的路径合成url"}
         }
         ```
      3. 处理中
         ```json
         {
             "Status": "PROCESSING",
             "Result": ""
         }
         ```

         



#### 视频水印

![IMG_1228](C:\Users\wujia\Desktop\code\playground\readme.assets\IMG_1228.PNG)

![IMG_1229](C:\Users\wujia\Desktop\code\playground\readme.assets\IMG_1229.PNG)

![IMG_1230](C:\Users\wujia\Desktop\code\playground\readme.assets\IMG_1230.PNG)

![IMG_1231](C:\Users\wujia\Desktop\code\playground\readme.assets\IMG_1231.PNG)

#### 视频台标擦除

![IMG_1232](C:\Users\wujia\Desktop\code\playground\readme.assets\IMG_1232.PNG)

#### 视频字幕擦除

![IMG_1233](C:\Users\wujia\Desktop\code\playground\readme.assets\IMG_1233.PNG)
