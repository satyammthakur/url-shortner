# URL Shortener

A simple and efficient URL shortener service built with Node.js, Express.js, and MongoDB. This application allows users to convert long URLs into short, manageable links while tracking the number of visits to each shortened URL.

## Features

- Convert long URLs to short URLs
- Track number of clicks for each shortened URL
- View list of all shortened URLs with their statistics
- Responsive web interface
- Persistent storage using MongoDB

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database
- **EJS** - Templating engine
- **CSS** - Styling

## Prerequisites

Before running this project, make sure you have installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/satyammthakur/url-shortner
cd url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
MONGODB_URI=mongodb://localhost:27017/url-shortener
PORT=8001
```

4. Start MongoDB service (if not already running):
```bash
mongod
```

5. Run the application:
```bash
npm start
```

The application will be available at `http://localhost:8001`

## Project Structure

```
url-shortener/
├── models/          # Database models
├── routes/          # Route handlers
├── views/           # EJS templates
│   └── home.ejs    # Main page template
├── public/          # Static files
│   └── styles/     # CSS files
├── server.js       # Entry point
└── package.json
```

## API Endpoints

- `POST /url` - Create a new short URL
- `GET /url/:shortId` - Redirect to original URL
- `GET /` - Home page with URL submission form and list of URLs

## Database Schema

```javascript
{
  shortId: String,
  redirectURL: String,
  visitHistory: [{ timestamp: Date }]
}
```

## Usage

1. Navigate to the home page
2. Enter a long URL in the input field
3. Click "Generate" to create a short URL
4. The new short URL will be displayed and added to the table
5. Click tracking is automatic when short URLs are used

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

<!-- ## License

[MIT](https://choosealicense.com/licenses/mit/) -->

## Contact

satyam thakur - satyammthakur@gmail.com
Project Link: https://github.com/satyammthakur/url-shortner