const express = require('express')
const router = express.Router()
const {
    getdiary,
    getdiarys,
    createDiary,
    deletediary,
    updatediary
} = require('../controllers/diarycotroll')
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/getdiary', getdiary)

router.get('/getdiarysByid/:user_id', getdiarys)

router.post('/', createDiary)


router.delete('/:id', deletediary)



router.patch('/:id', updatediary)









module.exports = router