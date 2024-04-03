const controller=require('../controller/attendance')
attendanceRouter=require('express').Router();


attendanceRouter.post("/addAttendance",controller.addAttendance);

exports.attendanceRouter = attendanceRouter
