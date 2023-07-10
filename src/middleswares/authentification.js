const jwt = require('jsonwebtoken');
const User = require('../models/user')
            //on récupére le modéle User

//VERIFY TOKEN
//request (app.get dans routes) > VERIFY > route éxécutée, code 
        //on va donc configurer le VERIFY et appeler le next pour passer à la suite (ROUTE)
const authentification = async(req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, 'foo') 
                //verify(élément à verifier, phrase secréte/clef )
        const user = await User.findOne({ _id: decodedToken._id, 'authTokens.authToken' : authToken });
                    //récupére l'id crée par mongo  et  cherche le authToken dans l'array authTokens dans models pour le comparer
        
        if(!user) throw new Error();

        req.authToken = authToken;
               //on stocke dans req.authToken le token chopé dans authentification pour pouvoir le distribuer dans les routes 
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Merci de vous authentifier !');        
    }
}

module.exports = authentification;