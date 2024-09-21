"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routs_1 = require("../module/users/user.routs");
const schedule_route_1 = require("../module/schedule/schedule.route");
const trainee_route_1 = require("../module/trainee/trainee.route");
const admin_route_1 = require("../module/trainer/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/users',
        route: user_routs_1.UserRoutes
    },
    {
        path: '/schedule',
        route: schedule_route_1.ScheduleRoutes
    },
    {
        path: '/booking',
        route: trainee_route_1.TraineeRoutes
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRouter
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
