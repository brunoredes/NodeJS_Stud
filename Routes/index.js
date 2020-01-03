const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    console.log(res.locals.authData)
    return res.send({ message: 'Usuário não autenticado. Favor se identificar' })
})

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok com o metodo POST da /' })
})

module.exports = router
