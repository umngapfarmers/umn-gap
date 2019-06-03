# GAP FARMERS

UMN GAP: Farm to Tables is a streamlined and centralized way for small produce farmers to keep records helping them to comply with GAP audits. The application is designed to help prevent the spread of foodborne illness by allowing farmers to trace their harvests to potential sources of contamination like water, fertilizer, harvest implements, storage containers, and processing facilities. 

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
- [Postman] (https://www.getpostman.com/)


### Installing


1. Download this project.
2. `npm init -y`
3. `npm install (see above list of technologies built with)`
4. Have Postico database running via Postgres


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
Walter Benson
Chris Borgen
Lili Bourgeois
Kashif Siddiqui
