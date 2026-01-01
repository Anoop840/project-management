import Organization from "../models/Organization.js";

export const createOrganization = async (req, res) => {
  const org = await Organization.create({
    name: req.body.name,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "Admin" }],
  });

  res.status(201).json(org);
};

export const getMyOrganizations = async (req, res) => {
  const orgs = await Organization.find({
    "members.user": req.user._id,
  });

  res.json(orgs);
};

export const deleteOrganization = async (req, res) => {
  await req.org.deleteOne();
  res.json({ message: "Organization deleted" });
};
