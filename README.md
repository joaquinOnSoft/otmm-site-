# OTMM Site

Web site to expose assets stored in an instance of OpenText Media Management (OTMM)

> **NOTE**: This is a work in progress. It's not completed. Be patient :-)

## Prerequistes
You need to install `node.js` and `npm` to run this project

## Local Environment set up

Follow these steps:

1. Clone this repo
```
git clone https://github.com/joaquinOnSoft/otmm-site-.git
```

2. Change dir to `otmm-site-` and install all the required dependencies
```
cd otmm-site-
npm install
```

3. Modify your `.env` file to set the URL, user and password of you OTMM environemnt
```
OTMM_API_URL=<OTMM-API-URL>
OTMM_USER=<USER>
OTMM_PASSWORD=<PASSWORD>
PORT=5000
```

4. (OPTIONAL) Execute all test
```
npm test
```

or

```
jest
```

5. Launch your server
```
node Index.js
```
## .env file
`.env` is a properties file which contains the following keys:

 - **OTMM_API_URL** URL of the **API end point** our OpenText Media Management server, e.g. `http://<OTMM_SERVER_URL>/otmmapi`
 - **OTMM_USER**: OTMM user
 - **OTMM_PASSWORD**: OTMM password
 - **PORT**:  OTMM site port.	 Dafault value 5000
 - **SERVER_URL_TEST**: Address used in test to validate the site API. Default value: [http://localhost:5000](http://localhost:5000)

## Useful links related with this project

### Test
 - [Test runner](https://nodejs.org/api/test.html)
 - [Node.js Unit Testing: Get Started Quickly With Examples](https://www.testim.io/blog/node-js-unit-testing-get-started-quickly-with-examples/)
 - [Setup and Teardown](https://jestjs.io/docs/setup-teardown)
 - [Does Jest support ES6 import/export?](https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export)
 - [Testing NodeJs/Express API with Jest and Supertest](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)
 - [Writing API Tests with Jest.](https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest)
 
### Axios
 - [How to correctly use axios params with arrays](https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays)

### Node.js
 - [Upgrading npm dependencies](https://www.carlrippon.com/upgrading-npm-dependencies/)
 