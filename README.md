# GAP FARMERS

GAP FARMERS is a streamlined and centralized way for small produce farmers to keep records helping them to comply with GAP audits. The application is designed to help prevent the spread of foodborne illness by allowing farmers to trace their harvests to potential sources of contamination like water, fertilizer, harvest implements, storage containers, and processing facilities. 

Farmers are able to enter their farm information, add workers and manage worker roles. Each farm has the ability to enter records about their harvest, usage of manure, water sources, employee training, equipment and facilities relating to GAP. Farmers can quickly access previous years information and view records in a clear way. Past years information will be importable to the current year.

## Built With

- HTML
- CSS
- JavaScript
- Axios
- Bcrypt
- Cookie-session
- Dotenv
- Express
- Nodemon
- Passport
- Passport-local
- Pg
- React/Redux/Saga
- Material-UI
- Moment.js


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Postico](https://eggerapps.at/postico/)
- [Postman](https://www.getpostman.com/)
- [IDE - Virtual Studio Code Recommended](https://code.visualstudio.com/)
- [Heroku - Create Account](https://www.heroku.com/)



### Installing


1. Download this project via zip
2. Create a repository on github for this project
3. Open downloaded zip of project in your IDE
4. Follow the instructions outlined on Github for ... or create a new repository on the command line (these immediately follow the creation of a new repository)
5. Create database in Postico with database name of 'umn_gap'
6. Insert sql-text from GAP.sql file located in project root into database sql-query in Postico
7. Execute sql queries to create tables
8. In terminal, start postgres server (this will start umn_gap database)
9. In terminal, create development server by typing `npm run client` and `npm run server` (this will run application locally)

### Deploying
1. Install Heroku CLI by typing `brew install heroku` in Terminal
2. Authenticate by typing `heroku login` in Terminal
3. In terminal, navigate to your project folder and type `heroku create`
4. In terminal, type `git remote -v` to ensure it added successfully
5. In terminal, type `git push heroku master`
6. In terminal, type `heroku addons:create heroku-postgresql:hobby-dev` to set up Postgresql on your Heroku project
7. In terminal, type `heroku pg:push umn_gap DATABASE_URL` to copy your database contents up to Heroku. 
8. If changes are made within the IDE and you want them reflected on Heroku following the following prompts:
  - `git add .`
  - `it commit -m "MESSAGE"`
  - `git push heroku master`

## Screen Shot

<img src="/public/images/screenshot.png/">


### Completed Features

- [x] Authentication with multiple roles
- [x] Routes based on authentication
- [x] Register Farm
- [x] Create New Harvest Year
- [x] Add Crops, Fields, Label Codes, Manure, Compost, Water Sources to Harvest Year
- [x] Create Logs (Harvest Traceability, Water Treatment, Water Inspection, Compost Turning, Employee Training)
- [x] View Records (Harvest Traceability, Water Treatment, Water Inspection, Compost Turning, Compost Pile, Manure Record, Employee Training)
- [x] Manage User Roles (abilit to add user, edit user or inactivate user)
- [x] Manage Harvest Years (ability to edit farm information)
- [x] Importable Previous Years (ability to copy previous harvest years information into new harvest year)
- [x] Export farm records as PDF

### Next Steps

- [ ] Add equipment to harvest year
- [ ] Add facilities to harvest year
- [ ] Edit equipment information for current harvest year
- [ ] Edit facilities information for current harvest year
- [ ] Create log for equipment sanitization
- [ ] Create log for facilities sanitization
- [ ] Create record for equipment sanitization
- [ ] Create record for facilities sanitization
- [ ] Export farm records to CSV 



## Authors
- [Walter Benson](https://github.com/wabens)
- [Chris Borgen](https://github.com/borgen_12)
- [Lili Bourgeois](https://github.com/lbourgeois90)
- [Kashif Siddiqui](https://github.com/kashsid)
