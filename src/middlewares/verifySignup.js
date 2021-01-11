import { ROLES } from "../models/Role"
import User from "../models/User"


export const checkDuplicateEmail = async (req, res, next) => {
    const email = await User.findOne({email: req.body.email});

    if(email) return res.status(400).json({message: 'The email already exists'})
    
    next();

}


export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.bodyroles[i])) {
                return res.status(400).json({
                    message: `Role ${ req.body.roles[i]} does not exists`
                })
            }            
        }
    }

    next();
}
