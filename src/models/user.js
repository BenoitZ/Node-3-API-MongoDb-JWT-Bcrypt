const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
            //on crée un schema de collection 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error('Email non valide');
                    //!!!! sur la page npm validator, de trés nombreuses options avec validaor
        }
    },
    password: {
        type: String,
        required: true, 
        // validate(v){
        //     if(!validator.isLength(v, {min:4, max: 20}))
        //             {throw new Error('Le mot de passe doit étre entre 4 et 20 caractére')};
        // }
    }, 
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
});

//Pour faire en sorte que le token et le mdp ne soit 
//pas renvoyé au moment des requétes. Intercepter des éléments de la requéte grace à la methode toJSON
userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.password;
    delete user.authTokens;

    return user;
}

//JWT GENERATE 
userSchema.methods.generateAuthTokenAndSaveUser = async function(){
    const authToken = jwt.sign({ _id: this._id.toString()}, 'foo');
                //fonction token sign in (élément à crypter, signature, options (ici délai d'éxpiration))
    this.authTokens.push({ authToken });
    await this.save();
    return authToken
}

//BCRYPT COMPARE FOR LOGIN
userSchema.statics.findUser = async(email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('Erreur, pas possible de se connecter')
    const isPasswordValid = await bcrypt .compare(password, user.password);
    if (!isPasswordValid) throw new Error('Erreur, pas possible de se connecter');
    return user;
}
userSchema.pre('save', async function(){
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
})

const User = mongoose.model('User', userSchema);

module.exports = User;