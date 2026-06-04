# **CS628 Full-Stack Development: PE05 \- Recipe Finder**

This document provides a comprehensive summary, requirements checklist, architecture blueprint, execution guide, and functional explanation of code components for your **PE05 \- Recipe Finder** full-stack web application assignment.

## **1\. Assignment Summary & Checklist**

The goal of PE05 is to build a full-stack, CRUD-capable Single Page Application (SPA) named **"Recipe Finder"** using the MERN style (React, Express, Node, MongoDB). The app will feature structural client-side routing, nested layouts for displaying detailed views, and a dedicated backend connected to a cloud-based MongoDB Atlas database.

### **Requirements Checklist**

#### **Repository & Admin Setup**

* \[ \] Maintain the repository under the naming convention cs628-pe-your\_first\_name (private repo).  
* \[ \] Invite the course instructor and Teaching Assistant (TA) as collaborators under the **Settings \-\> Collaborators** menu.  
* \[ \] Create a dedicated subfolder named PE05-Recipe Finder at the root of the repository.  
* \[ \] Create a README.md containing a ![][image1]\-word analysis report formatted under the Level-1 headings: \# Input, \# Process, and \# Output.  
* \[ \] Capture and upload execution screenshots showing CRUD capabilities to the repository to demonstrate completion.

#### **Frontend Requirements (React & React Router)**

* \[ \] **React Router Setup:** Initialize and manage navigation using React Router (react-router-dom).  
* \[ \] **Recipe List Route:** Create a route (e.g., /recipes or /) that renders all available recipes. Each recipe element should be a clickable link.  
* \[ \] **Recipe Details (Nested Route):** Nest the detail view under the recipe list layout (e.g., /recipes/:id).  
  * *Must utilize* the useParams hook to fetch the corresponding recipe's identifier.  
  * *Must maintain* a consistent layout with the Parent Recipe List (nested route mechanics).  
* \[ \] **Add Recipe Route:** A dedicated form route (e.g., /add) containing inputs for recipe name, ingredients list, cooking instructions, and other culinary details.  
* \[ \] **Update & Delete Functions:** Implement interactive edit forms and deletion hooks to alter state directly on MongoDB Atlas through backend APIs.  
* \[ \] **Styling & UI:** Apply responsive CSS or Tailwind to make the layout clear, professional, and accessible.

#### **Backend Requirements (Node.js, Express, MongoDB Atlas)**

* \[ \] Set up a Node.js/Express server (e.g., server.js or index.js).  
* \[ \] Configure a cloud instance on **MongoDB Atlas** and secure connection parameters.  
* \[ \] Connect the backend to the database using the official MongoDB Node.js Driver (mongodb) or mongoose.  
* \[ \] Establish REST API endpoints to support Full CRUD:  
  * GET /api/recipes \- Read all recipes  
  * GET /api/recipes/:id \- Read single recipe details  
  * POST /api/recipes \- Create a new recipe  
  * PUT /api/recipes/:id \- Update an existing recipe   
  * DELETE /api/recipes/:id \- Delete a recipe

## **2\. Web Application Architecture**

The application is structured as a decoupled client-server architecture. Here is how the information flows across different layers:

               \+--------------------------------------+  
               |          Client Layer (React)        |  
               | \- Component State                    |  
               | \- Client Routing (React Router)      |  
               | \- Axios / Fetch API requests         |  
               \+------------------+-------------------+  
                                  |  
                                  | HTTP Requests (RESTful API)  
                                  v  
               \+--------------------------------------+  
               |      Backend Layer (Express/Node)    |  
               | \- API Route Controllers              |  
               | \- Connection Drivers                 |  
               | \- JSON Parser Middlewares            |  
               \+------------------+-------------------+  
                                  |  
                                  | MongoDB Protocols (TCP/IP)  
                                  v  
               \+--------------------------------------+  
               |        Database Layer (Cloud)        |  
               | \- MongoDB Atlas Cluster              |  
               | \- Recipe Collection Documents        |  
               \+--------------------------------------+

### **Components Interaction Flow:**

1. **Routing Strategy:** React Router intercepts changes to the URL path on the browser.  
2. **Layout Integrity:** When visiting /recipes/:id, the route uses standard nested routing features (\<Outlet /\>). This ensures that the master recipe sidebar or navigation continues to render side-by-side with the active recipe detail view.  
3. **Async Fetch:** On components mount or route updates, the client triggers async AJAX requests to the Express server.  
4. **Data Bridge:** Express queries the MongoDB database, converts raw BSON data to JSON format, and returns the document payload to React for state modification.

## **3\. Step-by-Step Setup & Execution Guide**

Follow these steps to set up, link, and launch both application components.

### **Step 1: Database Setup (MongoDB Atlas)**

1. Sign in to your **MongoDB Atlas** account.  
2. Deploy a free shared cluster (M0 sandbox).  
3. Under **Database Access**, create a user with read/write privileges.  
4. Under **Network Access**, whitelist your current IP address (or 0.0.0.0/0 if developing in transient environments like GitHub Codespaces).  
5. Copy your connection connection string: mongodb+srv://\<username\>:\<password\>@cluster.mongodb.net/recipesDb?retryWrites=true\&w=majority

### **Step 2: Backend Development (Express)**

1. Create a backend directory inside PE05-Recipe Finder/.  
2. Initialize and install dependencies:  
   npm init \-y  
   npm install express mongodb cors dotenv

3. Set up a .env file to securely store environmental variables:  
   PORT=5000  
   MONGODB\_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/recipesDb

4. Build the express server file structure to handle standard Express configuration, MongoDB connectivity, and REST endpoints.

### **Step 3: Frontend Development (React)**

1. In the PE05-Recipe Finder/ folder, run:  
   npx create-react-app client  
   cd client  
   npm install react-router-dom axios

2. Set up the client-side router and view layout folders.

### **Step 4: Running the App Localy**

1. **Start the backend server:**  
   \# inside /backend  
   node server.js   \# or nodemon server.js if installed

2. **Start the React developer environment:**  
   \# inside /client  
   npm start

## **4\. Code Component Breakdown & Functions**

To write scalable, maintainable code, organize files cleanly. Here is a breakdown of the core files required for both projects and what each component is responsible for.

### **4.1 Backend Components**

* **server.js (Express Server Entry Point)**  
  * *Function:* Initializes the Express app instance, registers CORS middleware (to prevent Origin mismatches), parses incoming JSON payloads (express.json()), handles basic port setups, and imports/binds the database client to the API paths.  
* **db.js (Database Connection Setup)**  
  * *Function:* Uses MongoClient (or Mongoose) to connect to MongoDB Atlas. Exports a function like getDb() to allow route handlers to execute queries on the database.  
* **routes/recipeRoutes.js (REST Routes Definition)**  
  * *Function:* Specifies endpoints such as .get('/'), .post('/'), .put('/:id'), and .delete('/:id'). Maps URLs to operational functions matching CRUD logic.

### **4.2 Frontend Components (React App)**

* **index.js (Entry Module)**  
  * *Function:* Mounts React to the DOM. Wraps the \<App /\> component in React Router's \<BrowserRouter\> provider so navigation states are available system-wide.  
* **App.js (Central Routing & Layout Configuration)**  
  * *Function:* Acts as the layout core of the site. Declares Navigation components and defines matching route patterns:  
    \<Routes\>  
      \<Route path="/" element={\<Home /\>} /\>  
      \<Route path="/recipes" element={\<RecipeLayout /\>}\>  
         \<Route index element={\<RecipePlaceholder /\>} /\>  
         \<Route path=":id" element={\<RecipeDetail /\>} /\>  
      \</Route\>  
      \<Route path="/add" element={\<AddRecipe /\>} /\>  
      \<Route path="/edit/:id" element={\<EditRecipe /\>} /\>  
    \</Routes\>

* **RecipeLayout.jsx (Nested Layout Module)**  
  * *Function:* Renders the master list of recipes alongside a nested \<Outlet /\> sub-view. By placing both parts here, the sidebar is persistent, while changing recipe IDs only re-renders the right-hand details viewport.  
* **RecipeList.jsx (Summary List)**  
  * *Function:* Contacts GET /api/recipes to grab basic recipes metadata (Names, authors). Returns a list of components wrapped inside React Router \<Link\> components pointing to /recipes/:id.  
* **RecipeDetail.jsx (Single View Component)**  
  * *Function:* 1\. Utilizes useParams() to dynamically retrieve the state ID string from the navigation bar.  
    2\. Dispatches an async request (GET /api/recipes/:id) to retrieve instructions, duration, and ingredients.  
    3\. Features actionable "Edit" and "Delete" buttons to manipulate database contents.  
* **AddRecipe.jsx & EditRecipe.jsx (Interactive Form Hooks)**  
  * *Function:* Tracks text areas and text boxes using React states. Sends a structured JSON payload to POST /api/recipes (Create) or PUT /api/recipes/:id (Update) and redirects users back to the master list layout once successfully saved.

## **5\. README.md Report Framework**

The project requires a **150-word Input-Process-Output (IPO) report** inside your repository's primary README.md. Use this template framework to write your report:

\# Recipe Finder Application \- Technical Analysis

\#\#\# Input  
The application accepts structured text inputs from the user through React-based web forms, such as recipe names, dynamic arrays of ingredients, cook durations, and structural step-by-step instructions. Additionally, route-specific data acts as functional parameters, capturing MongoDB database ID hashes directly from client-side URL subpaths using dynamic React Router route configuration params.

\#\#\# Process  
Once submitted, client components dispatch HTTP requests containing JSON bodies to the backend Node/Express server API endpoints. The server middleware parses this request payload and implements database communication logic via the MongoDB Node.js driver. The server queries, creates, updates, or deletes documents in a remote MongoDB Atlas cluster. On retrieval, raw database payloads are parsed back to Client State components for presentation.

\#\#\# Output  
The application outputs interactive lists and nested detail screens rendered on responsive DOM views. React dynamically updates components to show newly submitted recipes, success validation banners, and real-time deletion animations. The cloud database updates its document states immediately, securing synchronized data persistence across page reloads.

### **Tips for Success**

* **Handle CORS errors early:** Make sure your backend imports cors and implements it with app.use(cors()) before declaring any routes.  
* **Handling MongoDB ObjectIDs:** Remember to convert string IDs into BSON Object IDs inside Express using:  
  const { ObjectId } \= require('mongodb');  
  // Use: new ObjectId(req.params.id)

* **Form State Management:** For dynamic fields (like ingredients where users can add more input lines), use a state array of strings \['ingredient 1', 'ingredient 2'\] and map them to standard inputs.

eof  


[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAZCAYAAACRiGY9AAACtElEQVR4Xu2WP2gUQRTG91gtREFRz8P7N/cHlHTKVYpYSCwsRNRSEI2dpY3YCWJlI2giBOSwE4uAKNqKgiAnCGIQlBQGVFBELBSNxPh77sxlMpndzV2OoLIffOzu996bnW92ZnaCIEOG/xq5SqVS5Bq6gVKptKlQKKy1tXK5vAZutDWNkPyyUmq3G/CCxK1wxNUHgWq1eo22p+QdnthZ9FmuT7iO6+tMrVY7aefxvAP9NXwEr5PXdgdjEVqt1moKT1BwSUbPjfcKeSEvvikdhHPwTYIpiRvOoB0nlDM59Xpd0bdXxC4YnfuODBa3q0xeLEgeIXma66ivEz0gJ4NDZzZoQ0mm7sExeMo3oLRxntgnOGQ0XfcD7rJzYyFfjeRj8J0ejWUhzZTQ1W1Q13HrqTnI81xabSwsg21ZqG48DUsxxRTbTnxMOiuDauegf4MP8vn8OquuhfbV1XuC/fXgqBtPQpop9PdwQnf0GbzfaDTWmxwVrbU4U1MMSMHovSKkgX3wqXTADSYhyRTaGThuvg6d3cPzT9bR5WB+U0gy5W03FTSwn8JJXnRbpokbT0OSKReSo3O7G8OgTYUYOUTRRD9mDHoxVSwWN5M3qY0cEE0td02JCfic5Fuw7sb7QZwps4PBj6yhbTrXfKlfxIe1JiYX1Fu1F43mQyjTDLbVgMwY6A75TA2jvZWffjC/foZUNPVemg2A+6ta6/6nVLQWu8a94GzWVNEfe+Cg3Q9COeoE1klBpg36XXhUSznpA5y1NKnfCT9Tf05yROP+IdodOSeavBUBL76hFh6B/lB0k6OiL/NCRebkXPcdng4s8zrvCPwCr6jo19Lp55+5YpDtnKm2V9aJ75hkIDHMHBZTgefEvwh6+j2m4ek0ykbi1v+tCJvN5hYV7T6JlDy3OEOGDBn+OfwGgWf4hT4gKdYAAAAASUVORK5CYII=>