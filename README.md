
# College Finder Application


This is a web application that helps users find colleges based on their location, courses offered, and number of students. It allows users to search for colleges, view their details, and compare them with other similar colleges.


## Getting Started
To run the College Finder Application, follow these steps:

- Clone this repository to your local machine
- Navigate to the backend directory and run the following command to start the -   backend server:


## Installation

Clone the repository and navigate to the project directory.
```bash
git clone https://github.com/your-username/project-name.git
cd project-name
```
Install the dependencies for the frontend and backend.
```bash
cd client
npm install
cd ../backend
npm install
```
Create a `.env ` file in the backend directory and set the following environment variables:
```bash
MONGODB_URI=<your-mongodb-uri>
PORT=<port-number>
```
Start the backend server.
```bash
cd backend
node app.js
```
Open a new terminal and start the frontend development server.
```bash
cd client
npm run start
```
Open your browser and navigate to http://localhost:3000 to view the app.


## API Reference

#### Get all colleges

```http
  GET /api/colleges
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nothing` | `string` | **Required**. Nothing      |

#### Get collgge by id or name

```http
   GET /api/colleges/${idorName}
```

| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- | 
| `idorName`      | `string` | **Required**. Id or Name of College |

#### GET Similar College by ID
```http
   GET /api/colleges/similar/:id
```

| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- | 
| `id`      | `string` | **Required**. Id or Name of College |



## Features

The College Finder Application has the following features:

- Search for colleges by name or ID
- View details of a college, including its name, year founded, city, state, country, number of students, and courses offered
- View a list of similar colleges based on the common courses offered and number of students
- View a list of all colleges in a state or all colleges that offer a particular course
- View charts and dashboards showing the distribution of colleges by state and courses offered
- View a list of students in a particular college and their skills
- View details of a particular student, including their name, batch year, and skills
## Technologies Used
The College Finder Application uses the following technologies:

-React: A JavaScript library for building user interfaces
- `Node.js`: A JavaScript runtime environment for building server-side applications
- `MongoDB`: A document-based NoSQL database for storing and retrieving data
- `Express`: A web framework for building APIs in Node.js
- `Tailwind CSS`: A utility-first CSS framework for building responsive UIs

## Contributing
If you want to contribute to the College Finder Application, follow these steps:

- `Fork` this repository
- `Create` a new branch for your changes
- Make your changes and `commit` them
- `Push` your changes to your fork
- Create a `pull` request to merge your changes into the main repository
## License
The College Finder Application is licensed under the `MIT` License. See the `LICENSE` file for more information.
