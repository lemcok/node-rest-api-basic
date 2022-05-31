import Role from '../models/Role';
import User from '../models/User';

export const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount();
        const countUsers = await User.estimatedDocumentCount();

        if (count>0 && countUsers > 0) return;

        const values = await Promise.all([
            new Role({name: 'admin'}).save(),
            new Role({name: 'seller'}).save(),
            new Role({name: 'user'}).save()
        ])
        console.log(values);

        const foundRole = await Role.find({name: "admin"})
        const valuesUser = await Promise.all([
            new User({
                "name": "admin",
                "email": "admin@example.com",
                "password": await User.encryptPassword("admin"),
                "image": "null",
                "roles": [foundRole[0]._id]
            }).save()
        ])
        console.log( valuesUser )
    } catch (error) {
        console.log(error)
    }
}
