const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const User = require('../models/user')

//registration
router.post('/user/registration', (req,res) => {
  User.find({email: req.body.email})
      .exec()
      .then(users => {
        if(users.length >= 1){
          return res.status(409).json({
            message: 'email already taken'
          })
        }
        else{
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
              return res.status(500).json({error: err})
            }
            else{
              const user= new User({ //llamamos al constructor del userSchema
                email: req.body.email,
                password: hash
              })
              user.save()
                  .then(result => res.sendStatus(201))
                  .catch(err => res.status(500).json({error: err}))
            }
          })
        }

      })
})


//user deletion
router.delete('/user/delete/:userId', (req,res) => {
  User.remove({_id: req.params.userId})
      .exec()
      .then(response => {
        res.status(200).json({message: 'User deleted'})
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
      })
})


//loggin in
router.post('/user/login', (req,res) => {
  User.find({email: req.body.email})
      .exec()
      .then(users => {
        if(users.length < 1){
          return res.sendStatus(404).json({message: 'The user doesnt exists'})
        }
        bcrypt.compare(req.body.password, users[0].password, (err, isEqual) => {
          if(err) return res.sendStatus(401)
          if(isEqual){
            //create a token
            
          }
          res.sendStatus(401)
        })
      })
})

module.exports = router