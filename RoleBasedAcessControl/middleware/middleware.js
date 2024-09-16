const Role = require("../models/role");
const Permissions = require("../models/permission");

exports.checkPermission = (permission) => {
    return (req,res,next) => {
        const userRole = req.user?req.user.role : 'anonymous';
        console.log(userRole);
        
        const userPermissions = new Permissions().getPermissionsByRoleName(userRole);

        if(userPermissions.includes(permission)) {
        return next() 
        } else {
            return res.status(403).json({ error: 'Access denied' });    

        }
    }
}