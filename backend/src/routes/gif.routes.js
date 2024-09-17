import { Router } from 'express';
import {
    convertTogif,
    deletegif,
    getgifById,
    getMygifs,
} from "../controllers/gif.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(
    upload.single("videoFile"),
    convertTogif)

router
    .route("/:gifId")
    .get(getgifById)
    .delete(deletegif)

router.route("/mygifs/:userId").get(getMygifs)

export default router