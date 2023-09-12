import conexion from '../config/database.js'
import initModels from '../models/init-models.js'
import {Op} from 'sequelize'
let models = initModels(conexion);

export const getAllMatches = async (req, res) => {
    try {
        const matches = await models.match.findAll();

        res.status(200).json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener todos los matches' });
    }
};

export const matchesById = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(`UserId recibido: ${userId}`);

        // Verificar si el usuario existe
        const user = await models.users.findByPk(userId);
        
        if (!user) {
            console.log(`Usuario ${userId} no encontrado`);
            return res.status(404).json({ error: `Usuario ${userId} no encontrado` });
        }

        // Obtener las coincidencias del usuario
        const matches = await models.match.findAll({
            where: {
                [Op.or]: [
                    { useraid: userId },
                    { userbid: userId }
                ]
            }
        });

        // Devolver las coincidencias
        res.status(200).json(matches);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener coincidencias' });
    }
};


export const createMatch = async (req, res) => {
    try {
        const { useraid, userbid } = req.body;
        const match = await models.match.create({ useraid, userbid });
        res.status(201).json(match);
    }catch (error) {
    res.status(500).json({ error: 'Error al crear match' });
    }
};

export const deleteMatch = async (req,res)=>{
    try {
        const { id } = req.params;
        const match = await models.match.findByPk(id);
    
        if (!match) {
        return res.status(404).json({ error: `Match ${id} no encontrado` });
        }
    
        await match.destroy();
        res.status(200).json({ message: `Match ${id} eliminado con éxito` });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar match' });
    }
};


export default {
    getAllMatches,
    matchesById,
    createMatch,
    deleteMatch
}