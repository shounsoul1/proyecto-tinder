import conexion from '../config/database.js'
import initModels from '../models/init-models.js'
let models = initModels(conexion);


// get
export const getUser = async (req,res)=>{
    try{
        const users = await models.users.findAll();
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({error: 'Error al obtener usuarios'+error})
    }
};

export const getUserById = async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await models.users.findByPk(id);
        if(!user){
            return res.status(404).json({error: `User de ID ${id} no encontrado`})
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({error: 'Error al obtener el user'+error})
    }
};

//post
export const insertUser = async (req,res)=>{
    try{
        const {firstname, email, password, birthday} = req.body;
        if (!firstname || !email || !password|| !birthday){
            return res.status(400).json({error: 'Todos los campos son obligatorios'})
        }
        const Users = models.users;
        const Usuario = await Users.create({
            firstname,
            email,
            password,
            birthday,
        })
        res.status(200).json(Usuario)
    }catch(error){
        console.error('Error al traer info: ', error)
        res.status(500).json({error: 'Internal server error'})
    }
};
// put
export const updateUser = async (req,res)=>{
    try{
        const Users = models.users
        const id = req.params.id
        const user = await Users.findByPk(id);
        if (!user){
            return res.status(404).json({error: `Usuario de ID ${id} no encontrado`})
        }
        const {firstname,email,password,birthday} = req.body;
        const updateUser = await user.update({firstname,email,password,birthday});
        if(updateUser){
            console.log(`Usuario con ID ${id} actualizado con exito`);
            res.status(200).json({message: `Usuario con ID ${id} actualizado con exito`});
        }else{
            console.log(`Error al actualizar usuario con ID ${id}`);
            res.status(500).json({error: 'Error al actualizar usuario'})
        }
    }catch(error){
        console.error(500)('Error al actualizar usuario'+error)
        res.status(500).json({error: "Error interno al actualizar usuario"})
    }
}
//delete
export const deleteUser = async (req, res) => {
    try {
        const Users = models.users;
        const id = req.params.id;
        const usuario = await Users.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: `Usuario de ID ${id} no encontrado` });
        }
        const resultado = await usuario.destroy();
        if (resultado) {
            console.log(`Usuario con ID ${id} eliminado con éxito`);
            res.status(200).json({ message: `Usuario de ID ${id} eliminado con éxito` });
        } else {
            console.log(`Error al eliminar usuario con ID ${id}`);
            res.status(500).json({ error: "Error al eliminar usuario" });
        }
    } catch (error) {
        console.error('Error al eliminar usuario: ', error);
        res.status(500).json({ error: 'Internal server error :s' });
    }
};

export default {
    getUser,
    getUserById,
    insertUser,
    deleteUser,
    updateUser
};