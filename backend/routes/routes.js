import {Router} from "express";
import {insertUser, getUser, deleteUser, getUserById, updateUser} from "../controllers/users.js"
import {getAllMatches, matchesById,createMatch, deleteMatch,} from '../controllers/matches.js'
const router = Router();

// users enpoints
router.get('/api/users', getUser)
router.get('/api/user/:id', getUserById)
router.post('/api/insert', insertUser)
router.put('/api/update/:id', updateUser)
router.delete('/api/delete/:id', deleteUser)

// profiles endpoints
// router.get('/api/profiles', getProfile)
// router.get('/api/profile/:id', getProfileById)
// router.post('/api/insert', insertProfile)
// router.put('/api/update/:id', updateProfile)
// router.delete('/api/delete/:id', deleteProfile)

// matches endpoints
router.get('/api/getAllMatches',getAllMatches)
router.get('/api/matches/:userId', matchesById)
router.post('/api/createMatch', createMatch)
router.delete('/api/deleteMatch/:id', deleteMatch)


export default router;