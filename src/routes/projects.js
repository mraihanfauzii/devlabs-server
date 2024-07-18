const express = require('express');
const ProjectsController = require('../controllers/projects/ProjectsController');
const ProjectsRepository = require('../repositories/projects/ProjectsRepository');
const UsersRepository = require('../repositories/users/UsersRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const projectsRepository = new ProjectsRepository();
const usersRepository = new UsersRepository();
const projectsController = new ProjectsController(projectsRepository, usersRepository);

router.post('/:id', authMiddleware, (req, res) => projectsController.addProject(req, res));
router.put('/:id/accept-project', authMiddleware, (req, res) => projectsController.accProject(req, res));
router.put('/:id/check-project', authMiddleware, (req, res) => projectsController.checkProject(req, res));
router.put('/:id/finish-project', authMiddleware, (req, res) => projectsController.checkProject(req, res));
router.get('/status/:id', authMiddleware, (req, res) => projectsController.getStatusByProjectId(req, res));
router.post('/status/:id', authMiddleware, (req, res) => projectsController.addStatusByProjectId(req, res));
router.get('/', authMiddleware, (req, res) => projectsController.getProjectsByUserId(req, res));
router.get('/:id', authMiddleware, (req, res) => projectsController.getProjectsById(req, res));
router.delete('/:id', authMiddleware, (req, res) => projectsController.deleteProjectById(req, res));

module.exports = router;
