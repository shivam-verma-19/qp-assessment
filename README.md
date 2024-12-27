# Grocery Booking API

This is a Node.js and TypeScript-based RESTful API for managing a grocery booking system. It supports two roles: Admin and User. Admins can manage grocery items and inventory, while users can browse and book groceries.

## Features

### Admin Responsibilities:

1. **Add Grocery Items**: Add new items to the system.
2. **View Grocery Items**: Retrieve a list of all grocery items.
3. **Update Grocery Items**: Modify details (e.g., name, price) of existing grocery items.
4. **Delete Grocery Items**: Remove items from the system.
5. **Manage Inventory**: Update inventory levels for grocery items.

### User Responsibilities:

1. **View Grocery Items**: Browse available grocery items.
2. **Book Groceries**: Place orders for multiple grocery items in a single booking.

### Advanced Features:

- **Dockerized Application**: Easily deployable with Docker and Docker Compose.

## Technologies Used

- **Node.js** with **Express.js** for the backend.
- **TypeScript** for type safety.
- **Sequelize** ORM for database management.
- **PostgreSQL** as the database.
- **JWT Authentication** for securing endpoints.
- **Docker** for containerization.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/grocery-booking-api.git
   cd grocery-booking-api
   ```
