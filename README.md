# Cosh Scraper Frontend

## Authors:

- Liam Omen
- Rafik Anamse
- Matteo Boulanger
- Aaron Abbey

## Description

This project is the frontend for the COSH! store registration platform, providing a modern web interface for adding a store to the COSH! platform. The frontend is built with Next.js and Tailwind CSS, offering a seamless user experience for store owners. It connects to the backend to display, register, and manage store data, brands, opening hours, and sustainability information.

### Key Features

- User-friendly interface for registering sustainable fashion stores
- Store registration via web scraping and AI-powered data extraction
- Real-time feedback and progress updates during store registration
- Detailed store pages with editable information (brands, opening hours, location, types, return policy)
- Responsive design with modern UI components
- Integration with backend REST API and WebSocket for live updates
- Docker containerization for easy deployment

The frontend empowers retailers to quickly register their stores, while helping consumers discover ethical fashion options and learn about sustainability practices.

## Setup

### Development

- Install dependencies with `npm install`
- Start the development server with `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) in your browser to view the app
- The frontend expects the backend API to be available at the URL set in your environment variables

### CI/CD & Deployment

- On every push to the `main` branch, a GitHub Actions workflow automatically builds and publishes a Docker image of the frontend to Docker Hub.
- For local production builds, you can use the Dockerfile to build and run the app as a container if needed.

### Environment Variables

This project uses environment variables for configuration. Create a `.env` file based on `.env.example`:

```
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:3002
NEXT_PUBLIC_API_URL=http://localhost:3001
```

These variables configure the backend API and WebSocket endpoints for the frontend. Adjust them as needed for your environment or deployment platform.

---

For more details on the COSH! platform, see the backend and infra documentation.
