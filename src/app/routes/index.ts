import { Router  } from "express";
import { UserRoutes } from "../module/users/user.routs";
import { ScheduleRoutes } from "../module/schedule/schedule.route";
import { TraineeRoutes } from "../module/trainee/trainee.route";
import { AdminRouter } from "../module/trainer/admin.route";
const router = Router();
const moduleRoutes=[
    {   path: '/users',
        route: UserRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/booking',
        route: TraineeRoutes
    },
    {
        path: '/admin',
        route: AdminRouter
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;