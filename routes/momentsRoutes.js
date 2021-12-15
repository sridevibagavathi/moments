import router from "express";
const route = router.Router();
import controllers from "../controllers";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

route.post("/add", upload.single("image"), controllers.addMoment);
route.get("/get", controllers.getMoment);
route.patch("/update/:id", upload.single("image"), controllers.updateMoment);
route.delete("/delete/:id", controllers.deleteMoment);
// route.post('/add', upload.array('images', 3), controllers.addMoment) // add multiple image

export default route;
