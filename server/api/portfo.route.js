import express from "express";
import ProjectCtrl from "./projects.controller.js"
import AllergyCtrl from "./allergy.controller.js" 

const router = express.Router()

router.route("/").get(ProjectCtrl.apiGetProjects)

router
    .route("/projects")
    .post(ProjectCtrl.apiPostProject)
    .put(ProjectCtrl.apiUpdateProject)
    .delete(ProjectCtrl.apiDeleteProject)


router.route("/allergy")
    .get(AllergyCtrl.apiGetAllergyInfo)
    .post(AllergyCtrl.apiPostAllergyInfo)
    .put(AllergyCtrl.apiUpdateAllergyInfo)
    .delete(AllergyCtrl.apiDeleteAllergyInfo)



export default router;