import conexion from '../config/database.js'
import initModels from '../models/init-models.js'

let models = initModels(conexion);

async function obtenerPerfilUsuario(req, res) {
    const id = req.params.id; 
    try {
        const user = await models.users.findOne({ where: { id_user: id } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const profile = await user.getProfile();
        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado para este usuario' });
        }
        return res.json({ profile });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        return res.status(500).json({ message: 'Error al obtener perfil' });
    }
}

export { obtenerPerfilUsuario };
