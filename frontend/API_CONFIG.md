# API Configuration Guide

## Environment Variables Setup

To configure the API base URL, create a `.env` file in the `frontend` directory with the following content:

### For Local Development:
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

### For Production:
```
REACT_APP_API_BASE_URL=https://mentalease.onrender.com
```

## How to Use:

1. **Create a `.env` file** in the `frontend` directory
2. **Add the appropriate URL** based on your environment
3. **Restart your React development server** after changing the .env file

## Current Configuration:

The application will default to `http://localhost:8000` if no environment variable is set.

## Switching Between Environments:

- **Local Development**: Use `http://localhost:8000`
- **Production**: Use `https://mentalease.onrender.com`

Just change the value in your `.env` file and restart the React server.
