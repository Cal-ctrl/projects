import express from "express";
import ProjectCtrl from "./projects.controller.js"
import AllergyCtrl from "./allergy.controller.js" 


const router = express.Router()

router.route("/").get(ProjectCtrl.apiGetProjects)

router
    .route("/projects")
    .post(ProjectCtrl.apiPostProject) // Auth Needed
    .put(ProjectCtrl.apiUpdateProject) // Auth Needed
    .delete(ProjectCtrl.apiDeleteProject) //Auth Needed


router.route("/allergy")
    .get(AllergyCtrl.apiGetAllergyInfo)
    .post(AllergyCtrl.apiPostAllergyInfo) //Auth needed
    .put(AllergyCtrl.apiUpdateAllergyInfo) // Auth Needed
    .delete(AllergyCtrl.apiDeleteAllergyInfo) // Auth Needed



export default router;