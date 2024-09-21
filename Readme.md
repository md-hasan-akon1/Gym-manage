# Gym Class Scheduling and Membership Management System
Project Overview
The Gym Class Scheduling and Membership Management System is designed to efficiently manage gym operations with three user roles: Admin, Trainer, and Trainee. Admins manage trainers, class schedules, and class assignments. Trainers conduct classes and view their schedules, while trainees book and manage their class schedules. The system enforces business rules such as limits on class sizes (maximum 10 trainees per class) and schedules (maximum 5 classes per day), and uses JWT for secure authentication.

Live Hosting Link
[Click here to view the live project]()

Relational Diagram

[You can view the relational diagram here.](https://lucid.app/lucidchart/0f08e469-cc8a-4a0d-b74f-12d3caad7173/edit?viewport_loc=-85%2C-70%2C2109%2C918%2C0_0&invitationId=inv_d59b481e-1d2a-405b-9973-3097cdbc2773)

Technology Stack
Programming Language: TypeScript
Web Framework: Express.js
Database: MongoDB
ORM/ODM: Mongoose
Authentication: JWT (JSON Web Tokens)
## API Endpoints
* Authentication
* login
GET /api/v1/users/login
Body:{
    "email":"hasan@gmail.com",
    "password":"1111"
}

* Create User POST /api/v1/users/create-user
* Body:   {
    "name": "Alice Smith",
    "email": "hasan10@gmail.com",
    "password": "1111"
  }
* get own profile GET /api/v1/users
* update own profile PATCH /api/v1/users/update
* body: {"name": "Alice2"}
* get all trainer by admin GET /api/v1/admin
* create schedule POST /api/v1/schedule
* body:{
    "startDate": "2025-02-26",
    "endDate": "2025-02-27",
    "startTime": "08:00:00",
    "endTime": "12:00:00",
    "trainerId": "603d2f8c6a0e5e001f4d5b20",
    "traineeCount": 0
}
* Booking Post /api/v1/booking?scheduleId=id
* cancel Booking DELETE /api/v1/booking/cancel/:id
* change Role by admin Patch /api/v1/admin
* body:{
    "userId":"66ed03898e7acf4ef60fee7a",
    "role":"Trainer"
}

*  update by admin-  Patch /api/v1/admin/updateInfo/:id
* delete Trainer by admin DELETE /api/v1/admin/delete/:id
* add trainer By admin POST /api/v1/admin/add-trainer
* trainer assign by Admin POST /api/v1/admin/trainer-assign
* body{
    "trainerId":"66ed03898e7acf4ef60fee7a",
    "scheduleId":"66ed52250b537b0c69163c4f"
  }

## Error Handling Validation Errors:

{
  "success": false,
  "message": "Validation error occurred.",
  "errorDetails": {
    "field": "email",
    "message": "Invalid email format."
  }
}
## Unauthorized Access:

{
  "success": false,
  "message": "Unauthorized access.",
  "errorDetails": "You must be an admin to perform this action."
}
## Class Booking Limit Exceeded:

{
  "success": false,
  "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
}
## Success Response

{
  "success": true,
  "statusCode": 201,
  "message": "Class booked successfully",
  "Data": [response data here]
}
## Admin Credentials
Email: hasan@gmail.com
Password: 1111
# Instructions to Run Locally
Clone the Repository:


git clone https://github.com/yourusername/gym-management-system.git
cd gym-management-system
Install Dependencies:


npm install
Set Up Environment Variables: Create a .env file in the root directory with the following content:


* PORT=""
* DATABASE_URL=""
* NODE_ENV="development"
* SECRETE_KEY=""
* EXPIRE_IN=




Start the Server:


npm run dev
Access the API: The server will be running at http://localhost:3000.