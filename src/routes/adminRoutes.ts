import express from 'express';
import {
  addGroceryItem,
  viewGroceryItems,
  updateGroceryItem,
  deleteGroceryItem,
  updateInventory,
} from '../controllers/adminController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Define routes with controller functions
router.post('/grocery', addGroceryItem);
router.get('/grocery', viewGroceryItems);
router.put('/grocery/:id', updateGroceryItem);
router.delete('/grocery/:id', deleteGroceryItem);
router.patch('/grocery/:id/inventory', updateInventory);

export default router;
