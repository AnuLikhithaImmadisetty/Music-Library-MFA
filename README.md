# Music Player🎵 
Music Player is a web application that allows users to search for music and listen to 30-second song previews using the Spotify API. Built with React, Bootstrap, and the Spotify Web API (through NocodeAPI), this music player provides an easy way for users to explore and enjoy their favorite songs. Follow the steps below to set up and run the application locally.
## Sign Up Page
![image](https://github.com/user-attachments/assets/190b510a-a96b-47f9-9a28-3c2ce523f8fa)

## Log In Page
![image](https://github.com/user-attachments/assets/20efd3bc-0950-4a49-be5f-c9c7e16040a9)

## Home Page
![image](https://github.com/user-attachments/assets/4b607c66-67d2-4e77-87f1-d7d6b57829e4)


## Table of Contents 
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
   - [Clone the Repository](#1-clone-the-repository)  
   - [Backend Setup](#2-backend-setup)  
   - [Frontend Setup](#3-frontend-setup)  
- [Running the Application](#running-the-application)  
- [Enjoy Your Local Setup](#enjoy-your-local-setup)

## Prerequisites 
Ensure the following tools are installed on your system:  
* *Node.js*  
* *Git*  
* *MongoDB* (Ensure MongoDB is running locally)

## Getting Started

### 1. Clone the Repository 
To get started, clone the repository to your local machine and navigate into the project directory:  
```bash
git clone https://github.com/AnuLikhithaImmadisetty/Music-Library.git
cd Music Player
```

### 2. Backend Setup
Set up the backend by following these steps:  

#### Navigate to the backend directory:  
```bash
cd Backend
```

#### Install project dependencies:  
```bash
npm install
```

#### Configure environment variables:  
Create a .env file inside the Backend directory and add the following:  
```
PORT = 8000
DB_URI = mongodb://localhost:27017/music_player
LOCAL_URI = http://localhost:5173
```

#### Start the server:  
Run the following command to start the backend server:  
```bash
node app.js
```

If everything is set up correctly, you should see this message in the terminal:  
```
Server is working on PORT: 8000
2024-08-10T17:13:12.307Z
Database connected with localhost
```

### 3. Frontend Setup
Set up the frontend by following these steps:

#### Navigate to the frontend directory:  
```bash
cd frontend
```

#### Install project dependencies:  
```bash
npm install
```

#### Configure base URL:  
Go to the src folder inside the frontend directory, open the App.jsx file, and set the base URL as follows:  
```javascript
const baseUrl = "http://localhost:8000";
```

## Running the Application

#### Start the frontend:  
Run the following command in the frontend directory:  
```bash
npm start
```

#### Access the application:  
Open your browser and navigate to:  
```
http://localhost:3000
```

## Enjoy Your Local Setup
Your project is now running locally! If you encounter any issues, feel free to reach out for support.
