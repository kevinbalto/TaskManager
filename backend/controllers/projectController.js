import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().where("createdBy").equals(req.user);
        res.json(projects);
    } catch (error) {
        console.log(error);
    }
};

const newProject = async (req, res) => {
    const project = new Project(req.body);
    project.createdBy = req.user._id;

    try {
        const projectStored = await project.save();
        res.json(projectStored);
    } catch (error) {
        console.log(error);
    }
};

const getProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
        const error = new Error( "Not found!");
        return res.status(404).json({ msg: error.message });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error( "Forbidden action!");
        return res.status(401).json({ msg: error.message });
    }

    const tasks = await Task.find().where("project").equals(project._id);

    res.json({
        project,
        tasks,
    });
};

const editProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
        const error = new Error( "Not found!");
        return res.status(404).json({ msg: error.message });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error( "Forbidden action!");
        return res.status(401).json({ msg: error.message });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deliverDate = req.body.deliverDate || project.deliverDate;
    project.client = req.body.client || project.client;

    try {
        const storedProject = await project.save();
        res.json(storedProject);
    } catch (error) {
        console.log(error);
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
        const error = new Error( "Not found!");
        return res.status(404).json({ msg: error.message });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error( "Forbidden action!");
        return res.status(401).json({ msg: error.message });
    }

    try {
        await project.deleteOne();
        res.json({ msg: "Project deleted" });
    } catch (error) {
        console.log(error);
    }
};

const addCollaborator = async (req, res) => {

};

const deleteCollaborator = async (req, res) => {

};

const getTasks = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
        const error = new Error( "Not found!");
        return res.status(404).json({ msg: error.message });
    }

   const tasks = await Task.find().where("project").equals(id);
   res.json(tasks);
};

export {
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    getTasks,
};