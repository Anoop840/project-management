import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const project = await Project.create({
    name: req.body.name,
    description: req.body.description,
    organization: req.org._id,
    createdBy: req.user._id,
    members: req.org.members.map((m) => m.user),
  });

  res.status(201).json(project);
};
