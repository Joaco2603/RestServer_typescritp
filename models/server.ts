//Imports
import express,{Application, json} from 'express';
import cors from 'cors'
import userRoutes from '../routes/user';
import db from '../db/conecction';



class Server{

    //Initialize the contructor variables
    private app:Application;
    private port:string;
    //Defining the path of routes
    private apiPaths = {
        user:'/api/user'
    }

    constructor()
    {
        //Initialize function express
        this.app = express();
        //Defining the port
        this.port = process.env.PORT || '8080';

        //Conecction to data base
        this.dbConnection();

        //Defining the middlewares
        this.middleware();

        //Defining the routes
        this.routes();
    }

    async dbConnection()
    {
        try {
            await db.authenticate();
            console.log('Database online')
        } catch (err:unknown) {
            throw new Error(String(err));
        }
    }

    //Middlewares
    middleware()
    {
        //Cors
        this.app.use( cors() );
        //Read body
        this.app.use(express.json());
        //File public
        this.app.use(express.static('public'));
    }

    //Routes
    routes()
    {
        this.app.use(this.apiPaths.user,userRoutes)
    }

    //Listen the port with express function
    listen()
    {
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }
}

//Export Server
export default Server;