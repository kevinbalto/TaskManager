import express from "express";
import { getProjects, newProject, getProject, editProject, deleteProject, addCollaborator, deleteCollaborator, getTasks } from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
    .route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, newProject);

router
    .route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .delete(checkAuth, deleteProject);

router.get('/task/:id', checkAuth, getTasks);
router.post('/add-collab/:id', checkAuth, addCollaborator);
router.delete('/delete-collab/:id', checkAuth, deleteCollaborator);

export default router;