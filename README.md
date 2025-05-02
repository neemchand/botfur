# Virtual Pet Project

A modern web application that lets users create and interact with 3D virtual pets. Built with Next.js, React Three Fiber, and TypeScript.

## Features

- Create personalized 3D pets (cats, dogs, and rabbits)
- Interactive 3D viewer with orbit controls
- Real-time pet stats monitoring (hunger, happiness, energy, cleanliness)
- Pet care actions (feed, play, rest, clean)
- Responsive design with Tailwind CSS
- Backend API for persistent pet data storage

## Tech Stack

- **Frontend**:
  - Next.js 13
  - React Three Fiber & Drei
  - Tailwind CSS
  - TypeScript
  - React Context for state management

- **Backend**:
  - Express.js
  - Node.js
  - File-based JSON storage

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:neemchand/botfur.git
```

2. Install all dependencies (client and server):
```bash
npm run setup
```

3. Start both client and server:
```bash
npm run dev:all
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the Next.js application
- `npm run start` - Start the Next.js production server
- `npm run lint` - Run ESLint
- `npm run server` - Start the Express server only
- `npm run server:install` - Install server dependencies
- `npm run dev:all` - Start both client and server concurrently
- `npm run setup` - Install all dependencies (client and server)

## Project Structure

- `/src/components` - React components
- `/src/context` - React context for state management
- `/public/models` - 3D models for pets
- `/src/types` - TypeScript type definitions
- `/server` - Express.js backend server

## License

[MIT License](https://opensource.org/licenses/MIT)
