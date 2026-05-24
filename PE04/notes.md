Problem

Your task is to develop a React application called "Cities" that allows users to interact with city information. The application should have the following features:

Cities List: Implement a route that displays a list of cities. Each city in the list should be a clickable link that navigates to the individual city's details page.

Add City: Implement a route that allows users to add a new city along with its information. The user should be able to provide the city's name, country, population and other details.

City Details: Implement a nested route under the "Cities List" route that displays detailed information about a specific city. When a user clicks on a city name from the cities list, they should be redirected to the city's details page, where all the information provided about the city is displayed. Utilize the useParams hook to fetch and display information based on the city's unique identifier. This city information should be displayed within the same page layout as the "Cities List" page. This means that the city details will replace a designated section of the "Cities List" page's content, while other parts of the layout remain consistent. 

Redirection: Implement redirection functionality in any one of the screens. For instance, after successfully adding a city, the user should be redirected back to the cities list.

Requirements:

Use React Router for implementing the different routes in your application.

Use the useParams hook to access the city's id and display the appropriate details on the city's details page.

Implement at least one instance of redirection, showcasing your understanding of navigation.

Apply your own styling to make the application visually appealing and user-friendly.

Organize your components and files in a structured manner for clarity.