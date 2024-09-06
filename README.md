# PairPro

PairPro is a web application service designed to facilitate pair programming sessions with individuals from around the world.

## Overview

PairPro allows users to find partners for pair programming sessions, leveraging a range of technologies to create a seamless experience.

## Features

- `Authentication`: Utilizes Clerk Auth for secure user authentication, with user data synchronized with the database.
- `Room Visibility`: Implements room visibility functionality to control who can join programming sessions.
- `Search Functionality`: Enables users to search for rooms by name, tags enhancing discoverability.
- `Video Calling`: Incorporates video calling functionality powered by getstream.io for real-time communication during programming sessions.

## Tech Stack

- `Next.js`: Powers both the frontend and backend of the application.
- `Shadcn`: Utilizes Shadcn-ui for building UI components.
- `PostgreSQL`: Stores application data, managed by Drizzle ORM for seamless database interactions.
- `Drizzle`: ORM tool.
- `Neon Tech`: Utilizes a cloud database powered by Serverless PostgreSQL for scalability and reliability.
- `getstream.io`: Provides video calling functionality for real-time communication.
- `Clerk Auth`: Handles user authentication securely.
- `Vercel`: Hosts the application for easy deployment and management.

## Environment Setup

```bash
DATABASE_URL=

FRONTEND_URL=
NEXT_PUBLIC_FRONTEND_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

WEBHOOK_SECRET=

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_API_KEY=
STREAM_API_SECRET=
```

## Motivation

I created this project because of following reasons:

1. `Utilizing Video Calling`: To leverage the powerful video calling functionality provided by getstream.io.
2. `Learning Drizzle ORM`: To gain experience with Drizzle ORM for efficient database management.
3. `Setting up PostgreSQL`: To understand the process of setting up a PostgreSQL database using Docker containers locally.

## Reference

I was inspired by a youtuber to create this project and learned a lot. You can check out his video: https://www.youtube.com/watch?v=NpyiSEO7a_Y
