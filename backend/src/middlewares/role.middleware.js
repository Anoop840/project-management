import Organization from "../models/Organization.js";

export const authorizeOrgRoles = (allowedRoles) => {
  return async (req, res, next) => {
    const orgId = req.params.orgId || req.body.organizationId;

    if (!orgId) {
      return res.status(400).json({ message: "Organization ID required" });
    }

    const org = await Organization.findById(orgId);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const member = org.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );

    if (!member || !allowedRoles.includes(member.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.org = org;
    req.userRole = member.role;
    next();
  };
};
