const express = require('express');
const User = require('../models/user');
const authentification = require('../middleswares/authentification')
const router = new express.Router();

// processus des requétes : login - pour s'authtifier et accéder aux autres requétes
                // users/me - pour accéder aux informations de l'utilisateur connécté
                // logout - efface les token et termine la connection

router.post('/users/login', async (req, res) => {
            //authentification avec token
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.send({user, authToken}); //({user, authToken})
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/users/me', authentification, async (req, res, next) =>{
    res.send(req.user);
});


router.patch('/users/me', authentification, async (req, res, next) =>{
    const updatedInfo = Object.keys(req.body);
    try {
        updatedInfo.forEach(update => req.user[update] = req.body[update]);
                // mets à jour la clef et la valeur pour chaque élément
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error)
     }
});

router.delete('/users/me', authentification, async (req, res, next) =>{
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
     }
});



//logout supprime le token de la base de données
router.post('/users/logout', authentification, async (req, res) => {
    try {
        req.user.authTokens = req.user.authTokens.filter((authToken) => {
                //on récupére une liste de tous les token 
                //on reprend cette liste (array) et on filtre le token en cours d'utilisation
            return authToken.authToken !== req.authToken; 
                //renvoi tous les token qui ne sont pas celui que nous utilisons
        });
        await req.user.save();
                //on sauvegarde l'utilisateur 
        res.send();
                //on renvoi un send pour pas qu'il n'y ait de probléme
 
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/users/logout/all', authentification, async (req, res) => {
    try {
        req.user.authTokens = [];
        await req.user.save();
        res.send();
 
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/users', async (req, res, next) =>{
    const user = new User(req.body);
    try {
        const saveUser = await user.save();
        res.status(201).send(saveUser);
    } catch (error) {
        res.status(400).send(error)
                // le try catch est là pour renvoyer l'erreur dans 
                // la res sans pour autant faire planter la connexion au serveur
    }
});

// router.get('/users', authentification, async (req, res, next) =>{
//                 // on place le middleware entre la requéte get et le code 
//     try {
//     const users = await User.find({});
//             //récupére moi tout ce que tu trouves
//             res.send(users);
//         } catch (error) {
//             res.status(500).send(error)
//         }
//     });





module.exports = router;