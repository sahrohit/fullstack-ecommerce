import { Router } from "express";
import { MyContext } from "../types";
import { Tenant } from "../entities/Tenant";

const router: Router = Router();

router.get("/getAll", async (_req: MyContext["req"], res: MyContext["res"]) => {
	res.json(await Tenant.find());
});

export default router;
