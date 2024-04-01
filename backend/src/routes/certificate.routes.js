import { Router, json } from "express";
import { 
    createCertificate, getCertificate
} from "../controllers/certificate.controller.js";

const router = Router()

router.route("/create-certaficate").post(createCertificate)
router.route("/get-certificate/:certificateNumber").get(getCertificate)



export default router