import router from "express";
const route = router.Router();
import controllers from "../controllers";

route.post("/logout", controllers.logout);

export default route;
