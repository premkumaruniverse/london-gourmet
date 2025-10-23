# London Gourmet Ltd. E-commerce and Event Marketing Website

## Project Overview

London Gourmet Ltd. is a dynamic e-commerce and event marketing website designed to showcase premium culinary products and services. This application features a public-facing site and an admin content management system (CMS) for managing dynamic content.

## Technology Stack

- **Frontend**: React (Functional Components and Hooks)
- **Styling**: Tailwind CSS (loaded via CDN)
- **Database/Backend**: Google Firebase Firestore and Firebase Auth
- **State Management**: React useState and useEffect

## Features

### Public Website

- **Home Page**: Displays a dynamic banner, Google review embed, and product category tiles.
- **About Us & Team**: Introduces the company and showcases team members.
- **Products**: Lists all unique product categories with links to individual product pages.
- **Recipes & Blog**: Placeholder for future blog posts and recipes.
- **Catering Services**: Information about catering services with a request consultation option.
- **Gourmet Club**: Information about the club with RSVP options.

### Admin CMS

- **Site Settings**: Edit global site configuration (banner URL, contact info).
- **Product Management**: CRUD functionality for managing products.
- **Team Management**: CRUD functionality for managing team members.
- **Page Content Editor**: Edit rich text content for key pages.
- **Real-time Updates**: Uses Firestore onSnapshot listeners for real-time data updates.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd london-gourmet-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up Firebase configuration in `src/firebaseConfig.js`.
5. Start the development server:
   ```
   npm start
   ```

## Usage

- Access the public site at `http://localhost:3000`.
- Access the admin CMS by toggling the route (authentication required).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.