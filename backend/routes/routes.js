import {Router} from "express";
import {getUser, getUserById, insertUser, updateUser, deleteUser} from "../controllers/users.js"
import {getAllMatches, matchesById,createMatch, deleteMatch,} from '../controllers/matches.js'
import {getProfile, getProfileById, insertProfile, updateProfile, deleteProfile } from "../controllers/profiles.js";
import {obtenerPerfilUsuario} from "../controllers/relaciones.js"
const router = Router();

// users enpoints
router.get('/api/users', getUser)
router.get('/api/user/:id', getUserById)
router.post('/api/insertUser', insertUser)
router.put('/api/updateUser/:id', updateUser)
router.delete('/api/deleteUser/:id', deleteUser)

// profiles endpoints
router.get('/api/profiles', getProfile)
router.get('/api/profile/:id', getProfileById)
router.post('/api/insertProfile', insertProfile)
router.put('/api/updateProfile/:id', updateProfile)
router.delete('/api/deleteProfile/:id', deleteProfile)

// matches endpoints
router.get('/api/getAllMatches',getAllMatches)
router.get('/api/matches/:userId', matchesById)
router.post('/api/createMatch', createMatch)
router.delete('/api/deleteMatch/:id', deleteMatch)
//relaciones
router.get('/api/obtenerPerfilUsuario/:id', obtenerPerfilUsuario)

export default router;