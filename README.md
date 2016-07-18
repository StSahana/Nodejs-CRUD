# 数据库设计以及后端实现



##  数据库设计


> User

|    字段名     |    类型    |             意义             |
| :--------: | :------: | :------------------------: |
|    _id     | ObjectId |        Mongodb自动生成         |
|    uid     |  String  |           员工号，索引           |
|    did     |  Number  |            部门号             |
|    name    |  String  |             姓名             |
|  password  |  String  |             密码             |
|    sex     |  String  |             性别             |
| telnumber  |  String  |            手机号码            |
| worknumber |  String  |            工作电话            |
|   email    |  String  |             邮箱             |
|    role    |  String  | 职位，大于0为员工，小于0为管理员，值越大，职位越高 |
|    meta    |   JSON   |       包含创建和更新时间两个字段        |

>Department

|     字段名     |    类型    |       意义       |
| :---------: | :------: | :------------: |
|     _id     | ObjectId | Mongodb自动生成，主键 |
|     did     |  Number  |      部门号       |
|    name     |  String  |      部门名       |
| description |  String  |      部门描述      |

## 状态码设计

| 200  | success                          |
| ---- | -------------------------------- |
| 500  | Internal Server Error            |
| 400  | Bad Request                      |
| 401  | password doesn't match           |
| 402  | user does not exit               |
| 403  | user or department already exits |



## 路由设计

### 顶层路由

- 首页：/
- 用户路由：/users
- 部门路由：/departments
- 联系人路由：/contacts

----------

### 用户路由

#### 1.展示用户列表

- **URL：** */users*
- **动作：** GET
- **参数：** null
- **返回值：**

| StatusCode |         info          | format |
| ---------- | :-------------------: | -----: |
| 200        |        success        |   json |
| 500        | Internal Server Error |   json |

**success example:**

```
	 {
  "status": {
    "statusCode": 200,
    "information": "success"
  },
  "data": [
    {
      "uid": "10086",
      "did": 1,
      "name": "Admin",
      "password": "...",
      "sex": "男",
      "telnumber": "",
      "email": "",
      "meta": {
        "updateAt": "2016-07-12T02:37:41.135Z",
        "createAt": "2016-07-12T02:37:41.135Z"
      },
      "role": 0
    },
    ...
```

#### 2.展示个人信息

- **URL：** 

  - */users/{uid}?type=0*

  + */users/uid?uid=_*

- **动作：** GET

  - **路径：**
     /uid

  - **参数：**

    @type

- **返回值：**

| StatusCode |         info          | format |
| ---------- | :-------------------: | -----: |
| 200        |        success        |   json |
| 500        | Internal Server Error |   json |

**example:**

```
    {
  "status": {
    "statusCode": 200,
    "information": "success"
  },
  "data": [
    {
      "uid": "xxx",
      "did": 1,
      "name": "wcf",
      "password": "$2a$10$cMUDpTDJ1lKj.T0SyVDtFOcK0SlvK.Ql4RArQisRKe6nPMirTzdPO",
      "sex": "男",
      "telnumber": "",
      "email": "",
      "__v": 0,
      "meta": {
        "updateAt": "2016-07-11T07:09:45.275Z",
        "createAt": "2016-07-11T01:40:20.304Z"
      },
      "role": 0,
      "worknumber": ""
    }
  ]
}
```

#### 3.查询某一部门的人员名单

- **URL：**

  - */users/{did}?type=1*
  - */users/did?did=_*

- **动作：** GET

  - **路径：**
     /did

  - **参数：**

    @type

- **返回值：**

| StatusCode |    info     | format |
| ---------- | :---------: | -----: |
| 200        |   success   |   json |
| 400        | Bad request |   json |

- **Example:**

```json
  {
  "status": {
    "statusCode": 200,
    "information": "success"
  },
  "data": [
    {
      "uid": "10086",
      "did": 1,
      "name": "Admin",
      "password": "xxxx",
      "sex": "男",
      "telnumber": "",
      "email": "",
      "meta": {
        "updateAt": "2016-07-12T02:37:41.135Z",
        "createAt": "2016-07-12T02:37:41.135Z"
      },
      "role": 0
    },
    xxxxxxxxxx
```

#### 4.删除用户

- **URL：** */users/delete/{uid}*
- **动作：** delete
  - **路径：**
     /uid
- **返回值：**

| StateCode | info                  | format |
| --------- | :-------------------- | :----- |
| 200       | success               | json   |
| 500       | Internal Server Error | json   |

* **Example:**

  ```json
  {
      "status": {
      "statusCode": 200,
      "information": "success"
    	}
   }
  ```


#### 5.用户登录

- **URL：** */users/login*

- **动作：** POST

  - **参数：**
    @uid

    @password

- **返回值：**

| StatusCode |          info          | format |
| ---------- | :--------------------: | -----: |
| 200        |        success         |   json |
| 402        |   user does not exit   |   json |
| 500        | Internal Server Error  |   json |
| 401        | password doesn't match |   json |

- **Example:**

  ```json
  {
     "status": {
      "statusCode": 200,
      "information": "success"
    	}
   }
  ```

#### 6.用户登出

- **URL：** */users/logout*
- **动作：** GET
- **返回值：**

| StatusCode |         info          | format |
| ---------- | :-------------------: | -----: |
| 200        |        success        |   json |
| 500        | Internal Server Error |   json |

+ **Example:**

```json
{
    "status": {
    "statusCode": 200,
    "information": "success"
  }
 }
```

#### 7.新建用户

- **URL***：/users*
- **动作：** POST
  - **参数：**
    @uid

    @did

    @name

    @password

    @sex

    @telnumber 

    @worknumber

    @email
- **返回值：**

| StatusCode |          info          | format |
| ---------- | :--------------------: | -----: |
| 200        |        success         |   json |
| 403        | the user already exits |   json |
| 500        | Internal Server Error  |   json |

+ **Example:**

  ```json
  {
      "status": {
      "statusCode": 200,
      "information": "success"
    }
   }
  ```

  ​

#### 8.更新用户

- **URL：** */users/update/{uid}*
- **动作：** POST
  - **路径：**
     @uid

  - **参数：**

    @did

    @name

    @password

    @sex

    @telnumber 

    @worknumber

    @email
- **返回值：**

| StatusCode |         info          | format |
| ---------- | :-------------------: | -----: |
| 200        |        success        |   json |
| 500        | Internal Server Error |   json |

+ **Example:**

  ```json
  {
      "status": {
      "statusCode": 200,
      "information": "success"
    }
   }
  ```

  #### 9.根据姓名模糊查询

  - **URL：** 

    - */users/{uid}?type=2*


    - */users/name?name=_*

-   **动作：** GET

    - **路径：**
       /name

    - **参数：**

      @type

-   **返回值：**

    | StatusCode |    info     | format |
    | ---------- | :---------: | -----: |
    | 200        |   success   |   json |
    | 400        | Bad Request |   json |

      **example:**

      ```
          {
        "status": {
          "statusCode": 200,
          "information": "success"
        },
        "data": [
          {
            "uid": "xxx",
            "did": 1,
            "name": "wcf",
            "password": "$2a$10$cMUDpTDJ1lKj.T0SyVDtFOcK0SlvK.Ql4RArQisRKe6nPMirTzdPO",
            "sex": "男",
            "telnumber": "",
            "email": "",
            "__v": 0,
            "meta": {
              "updateAt": "2016-07-11T07:09:45.275Z",
              "createAt": "2016-07-11T01:40:20.304Z"
            },
            "role": 0,
            "worknumber": ""
          }
        ]
      }
      ```

      #### 





### 部门路由

#### 1.部门列表
- **URL：** */departments*
- **动作：** GET
- **返回值：**

| StatusCode |         info          | format |
| ---------- | :-------------------: | -----: |
| 200        |        success        |   json |
| 500        | Internal Server Error |   json |

+ **example**

  ```json
  {
    "status": {
      "statusCode": 200,
      "information": "success"
    },
    "data": [
      {
        "_id": "577e8393a6ca646f70f0abbc",
        "did": 1,
        "dname": "行政部",
        "description": "我最大"
      },
      {
        "_id": "5782f227c5ecd44803108a39",
        "did": 0,
        "dname": "test",
        "__v": 0
      }
    ]
  }
  ```

  ​

  ​

#### 2.有did查询部门信息

- **URL：** */departments/did?did=_*

- **动作：** GET

- **参数：**

  @did


- **返回值：**

| StatusCode |    info     | format |
| ---------- | :---------: | -----: |
| 200        |   success   |   json |
| 500        | Bad request |   json |

+ **Example:**

  ```json
  {
    "status": {
      "statusCode": 200,
      "information": "success"
    },
    "data": [
      {
        "_id": "577e8393a6ca646f70f0abbc",
        "did": 1,
        "dname": "行政部",
        "description": "我最大"
      }
    ]
  }
  ```

  ​

#### 3.由dname查询部门信息

- **URL：** */departments/dname?dname=_*

- **动作：** GET

- **参数：**

  @dname


- **返回值：**

| StatusCode |         info          | format |
| ---------- | :-------------------: | -----: |
| 200        |        success        |   json |
| 500        | Internal Server Error |   json |

- **Example:**

  ```json
  {
    "status": {
      "statusCode": 200,
      "information": "success"
    },
    "data": [
      {
        "_id": "577e8393a6ca646f70f0abbc",
        "did": 1,
        "dname": "行政部",
        "description": "我最大"
      }
    ]
  }
  ```

  ​

#### 

#### 4.新建部

- **URL：** */departments*

- **动作：** POST

- **参数：**

  - 字段

    @did

    @dname

    @description


- **返回值：**

| StatusCode |             info             | format |
| ---------- | :--------------------------: | -----: |
| 200        |           success            |   json |
| 403        | the department already exits |   json |

+ **Example:**

  ```json
  {
      "status": {
      "statusCode": 200,
      "information": "success"
    }
   }
  ```

  ​

### 联系人路由

#### 1.联系人列表

- **URL：** */contacts*
- **动作：** GET
- **返回值：**

| StatusCode |    info     | format |
| ---------- | :---------: | -----: |
| 200        |   success   |   json |
| 400        | Bad request |   json |

+ **example**

  ```json
  {
    "status": {
      "statusCode": 200,
      "information": "success"
    },
    "data": {
      "A": [
        {
          "uid": "11955",
          "name": "阿水",
          "telnumber": "151765344321"
        },
        {
          "uid": "12955",
          "name": "Admin",
          "telnumber": "151765344321"
        }
      ],
      "B": [
        null,
        null,
        {
          "uid": "xx",
          "name": "博博",
          "telnumber": ""
        }
      ],
      "C": [
        {
          "uid": "11956",
          "name": "charis",
          "telnumber": "151765344321"
        },
        null,
        {
          "uid": "10023",
          "name": "叉",
          "telnumber": ""
        }
      ],
      *********************略****************
  ```
