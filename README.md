# Movie App
A responsive web application built with React and Vite that allows users to browse, search, and manage a list of their favorite movies and TV shows. This application interfaces with The Movie Database (TMDb) API to fetch and display content.

## Features

- **Browse Content:** View lists of popular movies and TV shows.
- **Search Functionality:** Search for specific movies or TV shows by title.
- **Genre Filtering:** Filter the movie and TV show lists by genre.
- **Favorites Management:** Add or remove any movie or TV show to a personal "Favorites" list.
- **Persistent Favorites:** Your favorites list is saved in the browser's local storage, so it persists across sessions.
- **Responsive Design:** The user interface is optimized for both desktop and mobile devices.

## Technology Stack

- **Frontend:** React, Vite
- **Routing:** React Router (`react-router-dom`)
- **Styling:** CSS, Tailwind CSS
- **State Management:** React Context API
- **API:** [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
- **Deployment:** GitHub Pages with GitHub Actions

## Project Structure

The project follows a standard React application structure:

```
/src
├── assets/         # Static assets like images and icons
├── components/     # Reusable React components (MovieCard, NavBar)
├── contexts/       # React Context for global state (MovieContext)
├── css/            # CSS stylesheets for components and pages
├── pages/          # Page components for different routes (Home, Tv_Shows, Favorites)
└── services/       # API service for fetching data from TMDb
```

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ayushmishra504/movies.git
    cd movies
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

In the project directory, you can run the following scripts:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally for preview.

## Deployment

This repository is configured with a GitHub Actions workflow (`.github/workflows/static.yml`) to automatically build and deploy the application to GitHub Pages whenever changes are pushed to the `main` branch.
