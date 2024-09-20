import { Router  } from "express";
import { UserRoutes } from "../module/users/user.routs";
import { ScheduleRoutes } from "../module/schedule/schedule.route";
import { TraineeRoutes } from "../module/trainee/trainee.route";
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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;