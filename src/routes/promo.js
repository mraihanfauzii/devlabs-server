const express = require('express');
const ProjectsController = require('../controllers/projects/ProjectsController');
const ProjectsRepository = require('../repositories/projects/ProjectsRepository');
const UsersRepository = require('../repositories/users/UsersRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const projectsRepository = new ProjectsRepository();
const usersRepository = new UsersRepository();
const projectsController = new ProjectsController(projectsRepository, usersRepository);

router.get('/:id', authMiddleware, (req, res) => promoController.getPromo(req, res));


module.exports = router;
