import Project from "../models/Project.js";
import { getPagination } from "../utils/pagination.js";

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

export const getProjects = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const [projects, total] = await Promise.all([
    Project.find({ members: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Project.countDocuments({ members: req.user._id }),
  ]);

  res.json({
    data: projects,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
};
