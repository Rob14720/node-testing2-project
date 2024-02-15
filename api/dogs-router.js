const express = require('express')
const router = express.Router()

const Dog = require('./dogs-model.js')

router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    const delDog = await Dog.deleteDog(id)
    res.status(200).json(delDog)
})

module.exports = router