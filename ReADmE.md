//24 DECOUVERTE POSTMAN ET API
            //REST API = Representational State Transfer - Application Programming Interface
            //API = outil pour vous aider à programmer (module npm/fs)
            //REST = web app pour manipuler et accéder à des ressources en utilisant des opérations prédéfinies
            //-ressources = utilisateurs/todo
            //-opérations = créer un todo / supprimer un todo / supprimer un utilisateur....


                      create/post
                    créer un todo        id ok creation du todo
            app ----------------------> DB  
                <---------------------
                     201 - JSON 


//25 EXPRESS ET NOUVELLE ARCHITECTURE  (AVEC POST)
            //npm i express

            //nouveau dossier src
            // dans src - dossiers 
            + services 
            + models 
            + middlewares (font la connexion entre 2 choses) 
            + configs (infos concernant la configuration comme liens de connexion, liens d'utilisateurs, liens de mot de passe) 
            + controllers (vont s'occuper de tous ce qui est db) 
            + utils (en général avec un fichier utils.js qui contiendra toutes les fonction que l'ont va exporter ensuite)
            + routes (ou l'on stocke les routes de l'appli)

            + test ( à la racine. Pour effectuer différents tests )
            + dans services -mongoose.js (contenant la connexion à la bd mongodb


            // NOUVELLE ARCHITECURE EXPRESS/MONGO DB/ MVC
            -node_modules
            -src
                -controllers
                -middlewares
                -models
                -routes
                -services
                -utils
            -test
            .env
            app.js
            package-lock.json
            package.json
            readme.md



//26 LIRE UNE DB VIA POSTMAN  (AVEC GET)
//27 MODIFIER ET SUPPRIMER UN ELEMENT DUNE DB VIA POSTMAN  (AVEC PATCH ET DELETE)

//28 SEPARATION DES ROUTES
        //tout simplement mettre tous les end points dans le fichier routes

        //!!! MIDDLEWARE fonctions qui vont étre éxecuté avant et aprés nos differentes fonctions

//31 JASON WEB TOKEN 
        // PERMET DE TRANSFERER DES DONNEES ENTRE 2 PARTIES
        // CONSTITUE EN 3 PARTIES 
        -le header - type de token / algorythme / données pour comparer les token crypté comme une signature (comme bcrypt quoi) 


//32 VERIFICATION DU TOKEN
        // sans le token  REQUEST > ROUTE
        // avec le token  REQUEST > VERIFY AUTH (middleware) > ROUTE

