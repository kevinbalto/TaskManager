import Project from "../models/Project.js";
import Task from "../models/Task.js";

const addTask = async (req, res) => {
    const { project } = req.body;
    const projectExist = await Project.findById(project);

    if (!projectExist) {
        const error = new Error("Project not found!");
        return res.status(404).json({ msg: error.message });
    }

    if (projectExist.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error("Forbidden action!");
        return res.status(404).json({ msg: error.message });
    }

    try {
        const taskStored = await Task.create(req.body);
        res.json(taskStored);
    } catch (error) {
        console.log(error);
    }
};

const getTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("project");

    if (!task) {
        const error = new Error("Task not found!");
        return res.status(404).json({ msg: error.message });
    }

    if (task.project.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error("Forbidden action!");
        return res.status(403).json({ msg: error.message });
    }

    res.json(task);
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("project");

    if (!task) {
        const error = new Error("Task not found!");
        return res.status(404).json({ msg: error.message });
    }

    if (task.project.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error("Forbidden action!");
        return res.status(403).json({ msg: error.message });
    }

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.deliverDate = req.body.deliverDate || task.deliverDate;

    try {
        const taskStored = await task.save(req.body);
        res.json(taskStored);  
    } catch (error) {
        console.log(error);
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("project");

    if (!task) {
        const error = new Error("Task not found!");
        return res.status(404).json({ msg: error.message });
    }

    if (task.project.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error("Forbidden action!");
        return res.status(403).json({ msg: error.message });
    }

    try {
        await task.deleteOne();
        res.json({ msg: "Task deleted" });
    } catch (error) {
        console.log(error);
    }
};

const updateStatus = async (req, res) => {
    
};

export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    updateStatus
}