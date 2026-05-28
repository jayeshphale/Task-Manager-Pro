# TaskFlow - Your Productive Workspace

A modern, full-stack task management application built with React and Node.js. TaskFlow helps teams and individuals organize their work, track progress, and stay productive without the clutter.

## Live Demo
- Frontend: https://task-manager-pro-mzkm.vercel.app/login
- Backend API: https://task-manager-pro-34bl.onrender.com

## What Makes TaskFlow Different?

Unlike bulky project management tools, TaskFlow focuses on simplicity and elegance. It's designed for teams that want to:
- **Organize tasks** without overwhelming complexity
- **Track progress** with real-time updates
- **Collaborate** with a clean, intuitive interface
- **Stay focused** on what actually matters—getting things done

## Key Features

### Task Management
- **Create Tasks**: Add new tasks with title and description
- **Edit Tasks**: Update task details at any time
- **Delete Tasks**: Remove completed or unwanted tasks
- **Task Status**: Mark tasks as pending or completed
- **Pagination**: Navigate through tasks with ease when you have many items
- **Real-time Sync**: Changes reflect instantly across the application

### Filtering & Search
- **Status Filters**: View tasks by status (All, Pending, Completed)
- **Smart Search**: Find tasks by keywords instantly
- **Combined Filtering**: Search within a specific status for precise results
- **Persistent Filters**: Your selected filters are preserved in the URL for easy sharing

### User Experience
- **User Authentication**: Create an account and log in securely
- **Persistent Sessions**: Stay logged in across browser sessions with JWT tokens
- **Dark Mode Toggle**: Switch between light and dark themes with one click
- **Responsive Layout**: Perfect experience on desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion provides elegant transitions and micro-interactions
- **Toast Notifications**: Get instant feedback for your actions

### Data Persistence
- **Cloud Database**: MongoDB stores all your tasks securely
- **User Data**: Each user has their own isolated task list
- **Automatic Synchronization**: Data updates are reflected immediately
- **No Data Loss**: Tasks are safely stored even after logout

### Performance
- **Fast Load Times**: Vite provides near-instantaneous hot module replacement
- **Optimized Bundle**: Tree-shaking and code splitting for smaller downloads
- **Efficient Queries**: MongoDB indexes for quick data retrieval
- **Client-side Caching**: Axios configuration for smart request handling

## Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Lightning-fast development environment
- **Tailwind CSS** - Utility-first styling for rapid UI development
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons
- **React Router** - Client-side navigation
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Non-intrusive notifications

### Backend
- **Node.js & Express** - Lightweight, scalable server
- **MongoDB** - NoSQL database for flexible data storage
- **JWT** - Secure token-based authentication
- **Mongoose** - ODM for MongoDB data modeling
- **Bcrypt** - Password hashing and security
- **Swagger** - API documentation
- **Helmet** - Security headers middleware
- **CORS** - Cross-origin resource sharing support

## Getting Started

### Prerequisites
Make sure you have these installed:
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or cloud instance)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-pro
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   - Copy `server/.env.example` to `server/.env`
   - Copy `client/.env.example` to `client/.env`
   
   Then update the values for your environment.

   Example `server/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   DEBUG_CORS=true
   ```

   Example `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   NODE_ENV=production
   ```

   > Note: `.env` files are included in `.gitignore` and should not be committed.

5. **Start the backend**
   ```bash
   cd server
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

6. **Start the frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

7. **Open in your browser**
   Navigate to `http://localhost:5173` and start managing your tasks!

## Deployment Checklist

- Ensure `MONGO_URI` is configured in your production host or deployment platform.
- Ensure `JWT_SECRET` is set in production.
- In production, set `VITE_API_URL` to your backend API URL, for example:
  ```env
  VITE_API_URL=https://your-backend-domain.com/api
  ```
- If deploying the backend to Render or another cloud provider, add your app's outbound IP or `0.0.0.0/0` to MongoDB Atlas Network Access while testing.
- Add your frontend URL to `CLIENT_URL` and `ALLOWED_ORIGINS` if using strict CORS in production.
- Disable `DEBUG_CORS` in production by setting it to `false` or removing it.

## Project Structure

```
task-manager-pro/
├── client/                          # React frontend
│   ├── src/
│   │   ├── api/                     # API client configuration
│   │   │   └── axios.js             # Axios instance with base URL
│   │   ├── components/              # Reusable React components
│   │   │   ├── auth/                # Login and signup forms
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── tasks/               # Task-related components
│   │   │   │   ├── TaskCard.jsx     # Individual task display
│   │   │   │   ├── TaskFilters.jsx  # Status filter tabs
│   │   │   │   ├── SearchBar.jsx    # Search input component
│   │   │   │   └── TaskFormModal.jsx# Create/edit modal
│   │   │   ├── layout/              # Navbar and sidebar
│   │   │   │   ├── Navbar.jsx       # Top navigation
│   │   │   │   ├── Sidebar.jsx      # Side navigation
│   │   │   │   └── SidebarItem.jsx
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── Loader.jsx       # Loading spinner
│   │   │   │   ├── EmptyState.jsx   # No tasks state
│   │   │   │   └── Pagination.jsx   # Page navigation
│   │   │   └── ui/                  # UI primitives
│   │   │       ├── AuthCard.jsx     # Auth form container
│   │   │       ├── Button.jsx       # Button component
│   │   │       ├── Card.jsx         # Generic card
│   │   │       ├── FloatingInput.jsx# Label-floating input
│   │   │       ├── Input.jsx        # Standard input
│   │   │       ├── Modal.jsx        # Modal container
│   │   │       └── GradientBackground.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx        # Main task dashboard
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Registration page
│   │   │   └── NotFound.jsx         # 404 page
│   │   ├── context/                 # React context for state
│   │   │   ├── AuthContext.jsx      # User auth state
│   │   │   ├── TaskContext.jsx      # Task state (empty)
│   │   │   ├── ThemeContext.jsx     # Dark/light mode
│   │   │   └── UiContext.jsx        # UI state (mobile nav)
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useAuth.js           # Auth operations hook
│   │   ├── layouts/                 # Layout wrappers
│   │   │   ├── AuthLayout.jsx       # Auth pages layout
│   │   │   └── DashboardLayout.jsx  # Dashboard layout
│   │   ├── routes/                  # Route components
│   │   │   └── ProtectedRoute.jsx   # Auth guard wrapper
│   │   ├── utils/                   # Utility functions
│   │   │   ├── constants.js         # App constants
│   │   │   ├── formatDate.js        # Date formatting
│   │   │   └── validate.js          # Form validation
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React DOM entry
│   │   └── index.css                # Global styles
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   ├── authController.js    # Auth endpoints
│   │   │   └── taskController.js    # Task endpoints
│   │   ├── middleware/              # Custom middleware
│   │   │   ├── authMiddleware.js    # JWT verification
│   │   │   ├── errorMiddleware.js   # Error handling
│   │   │   └── roleMiddleware.js    # Role-based access
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── User.js              # User schema
│   │   │   └── Task.js              # Task schema
│   │   ├── routes/                  # API route definitions
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   └── taskRoutes.js        # Task endpoints
│   │   ├── services/                # Business logic
│   │   │   └── tokenService.js      # JWT operations
│   │   ├── validations/             # Input validation
│   │   │   └── authValidation.js    # Auth validation rules
│   │   ├── utils/                   # Helper functions
│   │   │   ├── ApiError.js          # Custom error class
│   │   │   └── asyncHandler.js      # Async error wrapper
│   │   ├── config/                  # Configuration
│   │   │   ├── db.js                # MongoDB connection
│   │   │   └── swagger.js           # API documentation
│   │   ├── app.js                   # Express app setup
│   │   └── server.js                # Server entry point
│   ├── tests/                       # Test files
│   ├── nodemon.json                 # Nodemon config
│   └── package.json
│
├── docker-compose.yml               # Docker services config
└── README.md                        # This file
```

## Frontend Components Guide

### Page Components
- **Dashboard.jsx**: Main page with task list, filters, and statistics
- **Login.jsx**: User login form with validation
- **Signup.jsx**: User registration with form validation
- **NotFound.jsx**: 404 error page

### Task Components
- **TaskCard.jsx**: Displays individual task with edit/delete/toggle options
- **TaskFilters.jsx**: Tab buttons for filtering by status
- **SearchBar.jsx**: Search input for finding tasks
- **TaskFormModal.jsx**: Modal form for creating/editing tasks

### Layout Components
- **Navbar.jsx**: Top navigation with user info, dark mode toggle, logout
- **Sidebar.jsx**: Navigation menu (desktop & mobile)
- **DashboardLayout.jsx**: Main layout wrapper with sidebar and navbar

### UI Components
- **Button.jsx**: Reusable button with variants and states
- **FloatingInput.jsx**: Input with floating label animation
- **Modal.jsx**: Modal dialog container
- **AuthCard.jsx**: Card container for auth forms
- **Loader.jsx**: Loading spinner animation
- **EmptyState.jsx**: Display when no tasks exist
- **Pagination.jsx**: Page navigation for task list

## Backend Models

### User Model
```javascript
{
  name: String (required, 3-50 characters),
  email: String (required, unique, valid email),
  password: String (required, hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String (optional),
  status: String (enum: ["pending", "completed"]),
  owner: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## Database Schema

### MongoDB Collections
1. **users** - Stores user account information and authentication data
2. **tasks** - Stores all task entries with ownership references

### Indexes
- users.email - Unique index for fast login lookups
- tasks.owner - Index for filtering tasks by user
- tasks.status - Index for status-based filtering

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
  - Body: `{ name, email, password }`
  - Returns: User data and JWT token
- `POST /api/auth/login` - Log in and get JWT token
  - Body: `{ email, password }`
  - Returns: User data and JWT token
- `POST /api/auth/logout` - Log out (client-side token removal)
  - No body required

### Tasks
- `GET /api/tasks` - Fetch all tasks (with pagination, search, filtering)
  - Query Params: `page`, `search`, `status`
  - Returns: Array of tasks and pagination info
- `POST /api/tasks` - Create a new task
  - Body: `{ title, description, status }`
  - Returns: Created task object
- `GET /api/tasks/:id` - Get a single task
  - Returns: Task object
- `PUT /api/tasks/:id` - Update a task
  - Body: `{ title, description, status }`
  - Returns: Updated task object
- `DELETE /api/tasks/:id` - Delete a task
  - Returns: Success message
- `PATCH /api/tasks/:id/toggle` - Toggle task completion status
  - Returns: Updated task with toggled status

### Authentication Header
All task endpoints require authentication. Include the JWT token in the request header:
```
Authorization: Bearer <your-jwt-token>
```

## Environment Variables Configuration

### Backend (.env file in server directory)

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/task-manager
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Environment
NODE_ENV=development

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:5173
```

### Frontend (Vite automatically loads from .env)

```env
VITE_API_URL=http://localhost:5000/api
```

## State Management

### React Context Usage
- **AuthContext**: Manages user authentication state, login, signup, logout
- **ThemeContext**: Handles dark/light mode toggle
- **UiContext**: Controls mobile navigation menu state

### Context API Pattern
```javascript
// Using the AuthContext
const { user, login, logout } = useAuth();

// Using the ThemeContext
const { dark, setDark } = useContext(ThemeContext);

// Using the UiContext
const { mobileNavOpen, setMobileNavOpen } = useContext(UiContext);
```

## Authentication Flow

### Sign Up Process
1. User fills signup form (name, email, password)
2. Frontend validates form inputs
3. Sends POST request to `/api/auth/signup`
4. Backend validates and creates user in database
5. Hashes password with bcrypt (salt rounds: 10)
6. Returns JWT token in response
7. Frontend stores token in localStorage
8. Redirects to dashboard

### Login Process
1. User enters email and password
2. Frontend sends POST request to `/api/auth/login`
3. Backend finds user and compares hashed passwords
4. Creates JWT token (expires in 7 days by default)
5. Frontend stores token and sets axios default headers
6. Redirects to dashboard

### Protected Routes
- Dashboard and all task endpoints require valid JWT
- ProtectedRoute component checks token validity
- Redirects to login if token is missing or invalid

## Troubleshooting

### Issue: "Cannot POST /api/tasks"
- **Cause**: Backend server not running
- **Solution**: Run `npm run dev` in the server directory and ensure port 5000 is free

### Issue: "Connection refused on localhost:5000"
- **Cause**: Backend not listening on correct port
- **Solution**: Check `.env` file for PORT setting and ensure MongoDB is running

### Issue: "JWT token expired"
- **Cause**: Token has been used for more than 7 days
- **Solution**: Log out and log in again to get a fresh token

### Issue: "Task not found or not authorized"
- **Cause**: Trying to access another user's task
- **Solution**: Each user can only see and modify their own tasks

### Issue: "Email already exists"
- **Cause**: Attempting to sign up with an existing email
- **Solution**: Log in instead or use a different email

### Issue: Vite dev server not accessible on 127.0.0.1:5173
- **Cause**: Vite listening only on IPv6
- **Solution**: Ensure `vite.config.js` has `--host 0.0.0.0` or check `package.json` dev script

### Issue: "Cannot connect to MongoDB"
- **Cause**: MongoDB service not running
- **Solution**: Start MongoDB: `mongod` (local) or check MongoDB Atlas connection string

### Issue: Styles not loading (Tailwind CSS)
- **Cause**: CSS build process failed
- **Solution**: Clear node_modules, run `npm install`, then `npm run dev`

## Performance Optimization Tips

### Frontend Optimization
1. **Lazy Loading**: Routes are automatically code-split by React Router
2. **Image Optimization**: Use Lucide icons instead of PNG files
3. **CSS Purging**: Tailwind automatically removes unused CSS in production
4. **Bundle Analysis**: Run `npm run build` to see bundle size

### Backend Optimization
1. **Database Indexes**: Ensure proper indexing for common queries
2. **Pagination**: Tasks are paginated to avoid loading too many at once
3. **Compression**: Enable gzip compression on Express server
4. **Caching**: Implement redis for session caching (future enhancement)

### Best Practices
1. Keep component size small and reusable
2. Use useCallback for expensive operations
3. Debounce search input to reduce API calls
4. Implement proper error handling on all requests

## Future Roadmap

### Planned Features
- User profile management and avatar upload
- Task categories/labels
- Task priority levels (High, Medium, Low)
- Task due dates and reminders
- Task comments and activity log
- Team collaboration features
- Task templates for quick creation
- Export tasks to CSV/PDF
- Mobile app (React Native)
- Advanced filtering and sorting options
- Task statistics and analytics dashboard
- Email notifications

### Technology Improvements
- Migration to TypeScript for type safety
- Unit and integration testing with Jest
- E2E testing with Cypress
- Redis caching layer
- GraphQL API alternative
- WebSocket support for real-time collaboration
- Docker containerization for easier deployment
- CI/CD pipeline setup

### Infrastructure
- AWS/Digital Ocean deployment configuration
- Docker Compose for multi-container setup
- Environment-specific configurations
- Database backup strategies

## Development Workflow

### Building for Production

Frontend:
```bash
cd client
npm run build
```

Backend is ready to run as-is with:
```bash
cd server
npm start
```

### Running Tests

Currently, the test suite is in development. Check back soon!

### Code Quality

We use **ESLint** for code linting. Run it with:
```bash
cd client
npm run lint
```

## Security Features

- **JWT Authentication**: Secure token-based user sessions
- **Password Hashing**: Bcrypt encryption for password storage
- **CORS Protection**: Configured to allow only trusted origins
- **Security Headers**: Helmet middleware for HTTP header protection
- **Input Validation**: Server-side validation for all requests
- **Role-based Access**: Task ownership validation

## User Interface

TaskFlow features a modern, premium interface with:
- **Clean Design**: Minimal, focused layout
- **Dark Mode**: Professional dark theme
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive Layout**: Adapts perfectly to any screen size
- **Accessibility**: Semantic HTML and ARIA labels

## Available Scripts

### Frontend
```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

## Known Issues & Improvements

We're continuously improving TaskFlow. Check the GitHub issues for what we're working on next!

## Contributing

We'd love your help! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Questions & Support

Have questions? Feel free to open an issue or reach out to the team. We're here to help!

---

**Happy task managing!**

Built with passion for productive teams everywhere.
