const { Router } = require('express');
const router = Router();
const personController = require('../controllers/person.controller');
router.get('/', personController.getPersons);
router.post('/', personController.createPerson);
router.get('/:id', personController.getPerson);
router.delete('/:id', personController.deletePerson);
router.put('/:id', personController.updatePerson);
module.exports = router;
