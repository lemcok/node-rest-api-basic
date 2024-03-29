import User from '../users/users.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
import Role from '../roles/roles.model';

export const signUp = async (req, res) => {
    const { password, roles } = req.body;

    const newUser = new User({
        ...req.body,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();
    
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24horas
    })

    res.status(200).json({token});
}

export const signIn = async (req, res) => {
    const userFound = await await User.findOne({email: req.body.email}).populate("roles");

    if (!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: "Invalid Password"})

    const token = jwt.sign({id: userFound.id}, config.SECRET, {
        expiresIn: 86400
    })

    // console.log(userFound)

    res.json({token})
}
