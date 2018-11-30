const mysql = require('mysql');
const Sequelize=require('sequelize')
const log=require('../log/log')

//简单的 MySQL 连接
function con() {
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yexuan0628',
        database: 'tcu_forest_management'
    });
    return db;
}

module.exports = {
    //sequelize ORM对象关系映射
    connection:function(req,res){
        var sequelize = new Sequelize(
            'tcu_forest_management', // 数据库名
            'root',   // 用户名
            'yexuan0628',   // 用户密码
            {
                'dialect': 'mysql',  // 数据库使用mysql
                'host': 'localhost', // 数据库服务器ip
                'port': 3306,        // 数据库服务器端口
                'define': {
                    // 字段以下划线（_）来分割（默认是驼峰命名风格）
                    'underscored': true
                },
                logging:log.info
            }
        )
        return sequelize;
    },
    //sql 操作
    dbupAsync: function (sql) {
        const p = new Promise((resolve, reject) => {
            var db = con();
            db.query(sql, (err, data) => {
                if (err) {
                    resolve(`{ "success": "false" }`);
                    db.end();
                }
                else {
                    resolve(data);
                    db.end();
                }
            });
        });
        return p;
    },
    //file 操作
    fileupAsync: function (req,res,pathlib,fs) {
        const p = new Promise((resolve, reject) => {
            console.log(req.files);
            //获取原始文件扩展名
            var newName = req.files[0].path + pathlib.parse(req.files[0].originalname).ext;
            console.log(pathlib.parse(req.files[0].originalname).ext);      //输出文件后缀
            console.log("--->", newName);
            fs.rename(req.files[0].path, newName, function (err) {
                if (err) {
                    console.log("上传失败");
                    //res.send(JSON.parse(`{ "file upload success ?": "flase" }`))
                    resolve(`{ "file upload success ?": "flase" }`);
                } else {
                    console.log("上传成功");
                    // res.send(JSON.parse(`{ "file upload success ?": "true" ,"filename":"${newName}"}`))
                    resolve(`{ "file upload success ?": "true" ,"filename":"${newName}"}`);
                }
            });
        });
        return p;
    }
} 