# News Site API Readme
Welcome to the News Site API project! This repository contains the source code for an API that provides various endpoints to interact with a news site. This readme will guide you through setting up the project, explain the technology stack, and describe the core features and available endpoints.

To see a demo of the project follow the link __https://nc-news-be-ntk2.onrender.com/api__

# Technology Stack
The News Site API is built using the following technologies:

- Node.js
- PostgreSQL
- Express.js
- pg (PostgreSQL client for Node.js)
- Jest (for testing)
- Supertest (for testing HTTP endpoints)

# Core Features
## The core features of this service include:

1. Authentication: Users can sign in and access personalized features.
2. Articles: CRUD operations for articles, including creating, reading, updating, and deleting articles.
3. Comments: Users can leave comments on articles and edit/delete their own comments.
4. Topics: Access to articles by topic.
5. User Profiles: Retrieve user profiles by username.

## Available Endpoints
The following API endpoints are available:

- GET /api/topics: Retrieve a list of topics.
- GET /api/users/:username: Retrieve a user's profile by username.
- GET /api/articles/:article_id: Retrieve an article by its ID.
- PATCH /api/articles/:article_id: Update an article by its ID.
- POST /api/articles/:article_id/comments: Create a new comment on an article.
- GET /api/articles/:article_id/comments: Retrieve comments for a specific article.
- GET /api/articles: Retrieve a list of all articles.
- PATCH /api/comments/:comment_id: Update a comment by its ID.
- DELETE /api/comments/:comment_id: Delete a comment by its ID.
- GET /api: A root endpoint returning a set of available endpoints and request/response examples for each of it.


# Getting Started
To get started with this project, follow these steps:

### Prerequisites
Before you begin, make sure you have the following installed on your system:

- Node.js
- PostgreSQL
- npm or yarn (package manager)

### Installation
1. Clone this repository to your local machine:
```bash
git clone https://github.com/your-username/news-site-api.git
```
2. Navigate to the project directory:
```bash
cd news-site-api
```
3. Navigate to the project directory:
```bash
npm install
```
4. Create a PostgreSQL database and update the __.env.development__ file with your database configuration. You can copy the __.env.example__ file and rename it to __.env.development__ for development environment settings.
5. Run database table creation script and seed data:
```bash
npm run setup-dbs
npm run seed
```
6. Start the server:
```bash
npm start
```

### Environment Variables
This project uses environment variables for configuration. You can create two separate environment files for testing and development, named .env.test and .env.development respectively, following the same structure as the .env.example file.
