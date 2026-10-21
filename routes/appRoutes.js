import { Router } from 'express'
import * as teachers from '../controllers/AppController.js'

const router = Router()

router.get('/', teachers.ListTeachers)
router.get('/departamento', teachers.listDepartamento)
router.get('/turmas', teachers.ListTeachers)
router.get('/:id', teachers.getTeachersById)
router.post('/', teachers.createTeacher)
router.post('/turmas/:id', teachers.addClass)
router.put('/:id', teachers.updateTeacher)
router.delete('/:id', teachers.deleteTeacher)


export default router