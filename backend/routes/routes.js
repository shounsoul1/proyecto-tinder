import {Router} from "express";
const router = Router();

import {raiz} from "../controllers/controllers.js"


router.get("/", raiz)

export default router;