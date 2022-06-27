import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AssetsRoute from './api/AssetsRoute.js';
//import SessionsRoute from './api/CollectionsRoute.js';
//import SessionsRoute from './api/SearchRoute.js';
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
		Index.app.use('/api/v1/assets', AssetsRoute.configRoutes(Index.router));
		//Index.app.use('/api/v1/collections', CollectionsRoute.configRoutes(Index.router));
		//Index.app.use('/api/v1/search', SearchRoute.configRoutes(Index.router));
		Index.app.use('/api/v1/sessions', SessionsRoute.configRoutes(Index.router));
		Index.app.use('*', (req, res) => {
			res.status(404).json({error: 'not found'});
		})

		const port = process.env.PORT || 8000;

		try{
			Index.app.listen(port, () => {
				console.log(`Server is running on port ${port}`);
			});
		} catch (e){
			console.error(e);
			process.exit(-1);
		}
	}
}

Index.main();