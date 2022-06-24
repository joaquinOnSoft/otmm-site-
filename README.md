# OTMM Site

Web site to expose assets stored in an instance of OpenText Media Management (OTMM)

## Prerequistes
You need to install `node.js` and `npm` to run this project

## Local Environment set up

Follow these steps:

1) Clone this repo
```
git clone https://github.com/joaquinOnSoft/otmm-site-.git
```

2) Change dir to `otmm-site-` and install all the required dependencies
```
cd otmm-site-
npm install
```

3) Modify your `.env` file to set the URL, user and password of you OTMM environemnt
```
OTMM_API_URL=<OTMM-API-URL>
OTMM_USER=<USER>
OTMM_PASSWORD=<PASSWORD>
PORT=5000
```

4) (OPTIONAL) Execute all test
```
npm test
```

or

```
jest
```

6) Launch your server
```
node Index.js
```

## Useful links related with this project

 - [Test runner](https://nodejs.org/api/test.html)
 - [Node.js Unit Testing: Get Started Quickly With Examples](https://www.testim.io/blog/node-js-unit-testing-get-started-quickly-with-examples/)
 - [Upgrading npm dependencies](https://www.carlrippon.com/upgrading-npm-dependencies/)
 - [Does Jest support ES6 import/export?](https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export)