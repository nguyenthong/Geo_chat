#Getting started with the project
##Install Dependencies

 1. Install Nodejs [download](https://nodejs.org/download/)
 2. Checking if nodejs and Npm is install correctly by typing in your terminal:
 `node -v` and `npm -v` It should return the version of your nodejs version and NPM( package manager for nodejs).
 3. Install Ionic CLI `npm install -g ionic`.
 4. Install Bower for manage javascript dependencies 
 `npm install -g Bower`.
 
 5. Install Project dependencies`bower install` , please choose angular 1.3.13 version, usually it is number second option.
 6. Install NPM dependencies `npm install`.

## Running Ionic server
### In the browser
Type in your terminal  `ionic serve`
 and go to localhost:8100 on your browser or ionic automatically launch your default browser.
### Build Android app
Please install android SDK before build the app, the application support android 4.4.4 up version API 19
 1. `Ionic add platform android`
 2. `ionc build android`
 3. `ionic run android`
If you use Genymotion run the virtual device first, ionic will run it in your virtual device.


----------
The project use Gitflow for managing the branches and features.  Each component of the application is in it separate folder following the Angular folder best practices.
[Gitflow references](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
[Angular folder structure](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)
	
