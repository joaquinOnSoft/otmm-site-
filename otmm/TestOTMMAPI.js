import OTMMAPI from './OTMMAPI.js';
import Sessions from './Sessions.js';
import Assets from './Assets.js';
import Collections from './Collections.js'

//Sessions.createSession(user, pass).then( session => {
Sessions.createSession().then( session => {
    console.log(session);

    
	Assets.retrieveAllRecentAssets(session).then(recentAssets => {
		console.log( JSON.stringify(recentAssets) );
	});	
	/*
		
	Collections.getListOfCollectionsForCurrentUser(session).then(collections => {
		console.log( JSON.stringify(collections) );
	});	
	*/
});