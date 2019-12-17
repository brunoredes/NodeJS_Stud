const express = require('express')
const router = express.Router()
const Users = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({})
        return res.send(users)
    }
    catch (err) {
        res.send({ error: 'Erro na consulta de usuários!' })
    }
})

router.post('/create', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.send({ error: 'Dados insuficientes' })

    try {
        if (await Users.findOne({ email })) return res.send({ error: 'Usuario ja registrado' })
        const user = await Users.create(req.body)
        user.password = undefined
        return res.send(user)
    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar usuário' })
    }
})

router.post('/auth', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.send({ error: 'Login ou senha inválidos' })
    try {
        const user = await (await Users.findOne({ email })).select('+password')
        if (!user) return res.send({ error: 'Usuário nao registrado' })

        const pass_ok = await bcrypt.compare(password, user.password)
        if (!pass_ok) return res.send({ error: 'Erro ao autenticar o usuário' })

        user.password = undefined

        return res.send(user)
    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar usuário' })
    }
})


module.exports = router
