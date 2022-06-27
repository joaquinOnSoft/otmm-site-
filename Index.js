import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import SessionsRoute from './api/SessionsRoute.js';

class Index {
	static app = express();

	static router = express.Router();

	static main(){
		dotenv.config();
		Index.setUpServer();
	}
	
	static async setUpServer(){
		Index.app.use(cors());
		Index.app.use(express.json());		
		Index.app.use('/api/v1/sessions', SessionsRoute.configRoutes(Index.router));
		Index.app.use('*', (req, res) => {
			res.status(404).json({error: 'not found'});
		})

		const port = process.env.PORT || 8000;

		try{
			Index.app.listen(port, () => {
				console.log(`Server us running on port ${port}`);
			});
		} catch (e){
			console.error(e);
			process.exit(-1);
		}
	}
}

Index.main();