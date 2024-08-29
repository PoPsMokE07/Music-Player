<!-- ABOUT THE PROJECT -->

# Music Player Web App

## About the Project
A small music player web app using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to sign up, sign in, select songs from a library, create playlists, play songs, and resume songs from where they left off.

### Built With
This section lists the major frameworks/libraries used to bootstrap the project:

- <a href="https://nodejs.org/en" target="_blank">
    <img src="https://cdn4.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" alt="Node.js" width="50"/>
  </a>
- <a href="https://expressjs.com/" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEjCQNyD3_JGsmTZ1Ng0a3WefsXra98wzCw&s" alt="Express.js" width="50"/>
  </a>
- <a href="https://react.dev/" target="_blank">
    <img src="https://miro.medium.com/v2/resize:fit:1400/1*x0d41ns8PTQZz4a3VbMrBg.png" alt="React.js" width="50"/>
  </a>
- <a href="https://www.mongodb.com/" target="_blank">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZYtHv2OLXmthRPbkmENZRXuqBVDwlsrZ1A&s" alt="MongoDB" width="50"/>
  </a>

### Architecture
[![Fullstack Assignment][architecture-screenshot]](https://music-player-inky-five.vercel.app/))


<!-- GETTING STARTED -->
## Getting Started
This is an example of how you can set up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

_Below is an example of how you can get started on installing and setting up the app._

1. Clone the repo
```sh
git clone https://github.com/PoPsMokE07/Music-Player.git
cd Music-Player
```
### Server-Client Application

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_token
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the client:
   ```bash
   npm start
   ```

### Usage

#### 1. Start the Server

- Ensure your server is running. You can do this by navigating to your server directory in the terminal and running the appropriate command, such as npm start or node server.js, depending on how your server is set up.
The server will typically be hosted on http://localhost:<your_desired_port> (e.g., http://localhost:3000).

#### 2. Open the Application in Your Browser

- Open your preferred web browser (e.g., Chrome, Firefox, Safari).
- In the address bar, enter `http://localhost:<your_desired_port>` (replace `<your_desired_port>` with the actual port number where your server is running, such as 3000, 8080, etc.).
- Press Enter to load the application.

#### 3. Interacting with the Application

- Once the application loads, you can interact with it through the user interface.
- Navigate through different sections, perform actions like form submissions, or retrieve data as per the app's features.

#### 4. Development and Testing

- If you're in development mode, any changes you make to the client or server code will typically be reflected automatically (if you're using tools like nodemon for the server or a hot-reloading setup for the client).
- Test the application's functionality to ensure everything is working as expected.

#### 5. Stopping the Server

- When you're finished, stop the server by returning to the terminal where it's running and pressing `Ctrl + C`.
- This will terminate the server process.

## API Endpoints

Base URL: `http://localhost:your_desired_port/api`

### Note ⚠️
API credentials have been revoked. If you want to run the same on your local machine, use your own credentials.



<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://miro.medium.com/v2/resize:fit:1400/1*x0d41ns8PTQZz4a3VbMrBg.png
[React-url]: https://react.dev/

[Express.js]: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEjCQNyD3_JGsmTZ1Ng0a3WefsXra98wzCw&s
[Express.js-url]:https://expressjs.com/

[Node.js]: https://cdn4.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png
[Node.js-url]: https://nodejs.org/en

[MongoDB]: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZYtHv2OLXmthRPbkmENZRXuqBVDwlsrZ1A&s
[MongoDB-url]:https://www.mongodb.com/

[architecture-screenshot]: https://cdn.discordapp.com/attachments/957305839356612628/1278809986629238888/image.png?ex=66d2281b&is=66d0d69b&hm=33a8bb995df89a49403e48ad31488cb1b8a47c44584113b6b578b11a791dcf3a&


