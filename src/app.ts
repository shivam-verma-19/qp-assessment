import express from 'express';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(bodyParser.json()); // For parsing JSON request bodies

// Routes
app.use('/admin', adminRoutes); // Prefix all admin routes with '/admin'
app.use('/auth', authRoutes);   // Prefix all authentication routes with '/auth'

// Catch-all route for unmatched routes (404 handler)
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware (should be last)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

export default app;
