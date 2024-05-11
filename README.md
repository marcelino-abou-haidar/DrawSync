# DrawSync

## Overview

The main goal of this project is to create a real-time application that enables users to draw together on an HTML5 canvas.

### High Level Functionality

- Users have the ability to create separate private rooms for collaboration.
![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/22554453-180e-4354-9316-b1cb393171dc)
![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/62fb5d77-c641-4476-b251-d2465ff96849)
![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/7ba47fff-0f2b-416c-8b61-269112e33f4b)

- A user can join a room by entering their name and the room ID shared by the creator.
![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/4f96b77e-edc7-45ff-a4b7-428a60f0127b)
![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/36f6e9ba-10bc-4aa9-827a-5e6a54b9ac01)

- Users have the ability to draw on a canvas.
  ![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/85d738d6-0d66-4efb-b260-dfd594da1a3b)

- Users can select different colors for drawing on the canvas.
  
  ![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/25138690-dcda-4b58-b4d4-f68764866bda)

- Users can change brush size.

  ![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/ebaa4ebf-ee4a-45d1-822d-33abf214b914)

- Users can clear the canvas.

- Users can copy room ID to be shared.

- Users will have the ability to identify the user currently drawing by viewing a pencil icon next to their username.
![image](https://github.com/marcelino-abou-haidar/anexya-drawsync/assets/54931609/bdc57a73-a3b2-4f31-829c-8fdd98c4e1db)
  

### Tech Stack

#### Frontend (frameworks, packages, and libraries)

- React, TypeScript

- Tailwind CSS: A utility-first CSS framework for quickly building custom designs.

- Autoprefixer: A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules. (needed for Tailwind CSS)

- PostCSS : A tool for transforming CSS with JavaScript plugins. (also needed for Tailwind CSS)

- Clsx: A utility for constructing className strings conditionally.

- Prettier: Code formatter to maintain consistent code style.

- Prettier-plugin-tailwindcss: A prettier plugin to sort Tailwind CSS classes in a consistent order.

- React-dom: A package for rendering React components in the DOM and handling routing.

- React-error-boundary: A React component to catch JavaScript errors in child components.

- React-hot-toast: A customizable toast notification library for React applications.

- React-icons: A library containing popular icons as React components.

- React-tooltip: A React tooltip library to display tooltip messages.

- React-use-websocket: A React hook for managing WebSocket connections.

- ESLint: A JavaScript linter for identifying and reporting on patterns in code.

- Eslint-plugin-simple-import-sort: A plugin for ESLint to enforce a simple import sorting algorithm.

#### Backend

- Node.js

- Nodemon: A utility that monitors for changes in our Node.js application and automatically restarts the server.

- uuid: A library for generating universally unique identifiers.

- ws: A WebScoket client and server implementation for Node.js
  
  

#### Folder Structure

- Client: A folder for our frontend React application
  
  - src: The source folder of our application
    
    - assets: A folder that is used for any media related files (imgs, audio, fonts, etc.)
    
    - components: A folder for our reusable React components.
    
    - routes: A folder that contains our routing logic.
    
    - utils: A utility folder for our constants and helper functions.

- Server: A folder for our backend Node.js applicaton
  
  - utils: A utility folder for our constants and helper functions.
    
    

## Project Setup

1. **Navigate to Server Folder:** `cd server`

2. **Install Packages:** `yarn`

3. **Start the Server:** `yarn start`
   This will execute the start script defined in `package.json`, which runs the command:
   `nodemon index.js` This command monitors changes in the application and restarts the server accordingly.

4. **Navigate to Client Folder:** `cd client`

5. **Install Packages:** `yarn`

6. **Start the Development Server:** `yarn dev`
   This command will start the Vite development server.
   
   

## Other features

- Responsive dynamic fonts sizes and spacing values utilizng Utopia's CSS clamps generator.

- Responsive clean UI design.

- A custom cursor is implemented to help users visualize the size and color of the brush they are painting with.
  
  

## How to use

1. **Run the Backend Server:**
   
   * Navigate to the server folder and run `yarn start` to start the server.

2. **Run the Frontend App:**
   
   * Navigate to the client folder and start the frontend app with `yarn dev`.

3. **Create a Room:**
   
   * Visit the frontend app in your browser (link is in the terminal).
   * Follow on-screen instructions to create a room.

4. **Join a Room:**
   
   * Open a different browser tab or window.
   
   * Visit the frontend app.
   
   * Navigate to the join room page.
   
   * Provide a user name.
   
   * Enter the Room ID obtained from the host.
   
   * Join the room

5. **Start Drawing:**
   
   * Once joined, start drawing on the canvas to see real-time changes!
