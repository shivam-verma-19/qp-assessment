import { Request, Response } from 'express';
import GroceryItem from '../models/GroceryItem';


/**
 * The function `addGroceryItem` is an asynchronous function in TypeScript that adds a grocery item and
 * returns a success message or an error message.
 * @param {Request} req - The `req` parameter in the `addGroceryItem` function represents the incoming
 * request object in an Express route handler. It contains information about the HTTP request made to
 * the server, such as the request headers, body, parameters, and query strings. This parameter is used
 * to access data sent from
 * @param {Response} res - The `res` parameter in the function `addGroceryItem` is an object
 * representing the HTTP response that the server sends back to the client. It allows you to send data
 * back to the client, set response headers, and control the response status. In this case, the
 * function is using `
 */
export const addGroceryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    // Logic to add a grocery item
    res.status(201).json({ message: 'Grocery item added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding grocery item', error });
  }
};

/**
 * The function `viewGroceryItems` fetches grocery items and returns a success message or an error
 * message.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the function `viewGroceryItems` is an object
 * representing the HTTP response that the server sends back to the client. It allows you to send data,
 * set status codes, and perform other operations related to the response that will be returned to the
 * client making the request.
 */
export const viewGroceryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    // Logic to fetch grocery items
    res.status(200).json({ message: 'Grocery items retrieved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grocery items', error });
  }
};

/**
 * This TypeScript function updates a grocery item based on the provided request data.
 * @param {Request} req - The `req` parameter in the `updateGroceryItem` function stands for the
 * request object, which contains information about the HTTP request made to the server. It includes
 * details such as the request headers, parameters, body, and other relevant data sent by the client to
 * the server. In this case
 * @param {Response} res - The `res` parameter in the function `updateGroceryItem` is an object
 * representing the HTTP response that the function will send back to the client. It is of type
 * `Response`, which is typically provided by an Express.js server. This object allows you to send data
 * back to the client,
 * @returns The function `updateGroceryItem` is returning a Promise<void>. Within the function, it
 * updates a grocery item based on the provided request parameters and body data. If the grocery item
 * is not found, it returns a 404 status with a message indicating that the item was not found. If
 * there is an error during the update process, it returns a 500 status with a message indicating an
 * error
 */
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
/**
 * The function `deleteGroceryItem` deletes a grocery item by its ID and returns a success message if
 * the deletion is successful.
 * @param {Request} req - The `req` parameter in the `deleteGroceryItem` function stands for the
 * request object. It contains information about the HTTP request that triggered the function, such as
 * request headers, parameters, body, and more. In this case, `req.params` is used to extract the `id`
 * @param {Response} res - The `res` parameter in the function `deleteGroceryItem` is an object
 * representing the HTTP response that the server sends back to the client. It allows you to send a
 * response with status codes, headers, and data. In this function, `res` is used to send JSON
 * responses with
 * @returns The `deleteGroceryItem` function is returning a Promise that resolves to void. This means
 * that the function does not explicitly return a value, but it is expected to perform the deletion of
 * a grocery item based on the provided ID and send an appropriate response back to the client.
 */
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
/**
 * The function `updateInventory` updates the quantity of a grocery item in the database and returns a
 * success message or an error message accordingly.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `updateInventory` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this function, it is used to send JSON responses with status codes such as 200 for successful
 * updates, 404
 * @returns The `updateInventory` function is returning a JSON response with a status code and a
 * message. If the operation is successful, it returns a status code of 200 along with a message
 * stating "Inventory updated successfully" and the updated `groceryItem` object. If there is an error
 * during the update process, it returns a status code of 500 along with a message stating "Error
 * updating inventory
 */
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