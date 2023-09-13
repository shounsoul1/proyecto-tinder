import conexion from '../config/database.js'
import initModels from '../models/init-models.js'
let models = initModels(conexion);


// get
export const getProfile = async (req,res)=>{
    try{
        const profiles = await models.profiles.findAll();
        res.status(200).json(profiles)
    }catch(error){
        res.status(500).json({error: 'Error al obtener perfiles'+error})
    }
};

export const getProfileById = async (req,res)=>{
    try{
        const id = req.params.id;
        const profile = await models.profiles.findByPk(id);
        if(!profile){
            return res.status(404).json({error: `User de ID ${id} no encontrado`})
        }
        res.status(200).json(profile)
    }catch(error){
        res.status(500).json({error: 'Error al obtener el user'+error})
    }
};

//post
export const insertProfile = async (req,res)=>{
    try{
        const {genero, ubicacion, descripcion, intereses, url_photo, user_id} = req.body;
        if (!genero || !ubicacion || !descripcion|| !intereses || !url_photo || !user_id){
            return res.status(400).json({error: 'Todos los campos son obligatorios'})
        }
        const Profiles = models.profiles;
        const Perfil = await Profiles.create({
            genero,
            ubicacion,
            descripcion,
            intereses,
            url_photo,
            user_id
        })
        res.status(200).json(Perfil)
    }catch(error){
        console.error('Error al traer info: ', error)
        res.status(500).json({error: 'Internal server error'})
    }
};
// put
export const updateProfile = async (req,res)=>{
    try{
        const Profiles = models.profiles
        const id = req.params.id
        const profile = await Profiles.findByPk(id);
        if (!profile){
            return res.status(404).json({error: `Perfil de ID ${id} no encontrado`})
        }
        const {genero,ubicacion,descripcion,intereses,url_photo,user_id} = req.body;
        const updateProfile = await profile.update({genero,ubicacion,descripcion,intereses,url_photo,user_id});
        if(updateProfile){
            console.log(`Perfil con ID ${id} actualizado con exito`);
            res.status(200).json({message: `Perfil con ID ${id} actualizado con exito`});
        }else{
            console.log(`Error al actualizar perfil con ID ${id}`);
            res.status(500).json({error: `Error al actualizar con ID ${id} perfil`})
        }
    }catch(error){
        console.error(500)('Error al actualizar perfil'+error)
        res.status(500).json({error: "Error interno al actualizar perfil"})
    }
}
//delete
export const deleteProfile = async (req, res) => {
    try {
        const Profiles = models.profiles;
        const id = req.params.id;
        const perfil = await Profiles.findByPk(id);
        if (!perfil) {
            return res.status(404).json({ error: `Perfil de ID ${id} no encontrado` });
        }
        const resultado = await perfil.destroy();
        if (resultado) {
            console.log(`Perfil con ID ${id} eliminado con éxito`);
            res.status(200).json({ message: `Perfil de ID ${id} eliminado con éxito` });
        } else {
            console.log(`Error al eliminar perfil con ID ${id}`);
            res.status(500).json({ error: "Error al eliminar perfil" });
        }
    } catch (error) {
        console.error('Error al eliminar perfil: ', error);
        res.status(500).json({ error: 'Internal server error :c' });
    }
};

export default {
    getProfile,
    getProfileById,
    insertProfile,
    deleteProfile,
    updateProfile
};