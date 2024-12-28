import { Request, Response } from 'express';
import GroceryItem from '../models/GroceryItem';

export const addGroceryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    // Logic to add a grocery item
    res.status(201).json({ message: 'Grocery item added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding grocery item', error });
  }
};

export const viewGroceryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    // Logic to fetch grocery items
    res.status(200).json({ message: 'Grocery items retrieved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grocery items', error });
  }
};

export const updateGroceryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  try {
    const groceryItem = await GroceryItem.findByPk(id);
    if (!groceryItem) {
      res.status(404).json({ message: 'Grocery item not found' });
      return;
    }

    // Update the item
    groceryItem.name = name || groceryItem.name;
    groceryItem.price = price || groceryItem.price;
    groceryItem.quantity = quantity || groceryItem.quantity;
    await groceryItem.save();

    res.status(200).json({ message: 'Grocery item updated successfully', groceryItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grocery item', error });
  }
};

// Delete an existing grocery item
export const deleteGroceryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const groceryItem = await GroceryItem.findByPk(id);
    if (!groceryItem) {
      res.status(404).json({ message: 'Grocery item not found' });
      return;
    }

    // Delete the item
    await groceryItem.destroy();
    res.status(200).json({ message: 'Grocery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grocery item', error });
  }
};

// Update inventory for a grocery item
export const updateInventory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const groceryItem = await GroceryItem.findByPk(id);
    if (!groceryItem) {
      res.status(404).json({ message: 'Grocery item not found' });
      return;
    }

    // Update the inventory
    groceryItem.quantity = quantity;
    await groceryItem.save();

    res.status(200).json({ message: 'Inventory updated successfully', groceryItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
};