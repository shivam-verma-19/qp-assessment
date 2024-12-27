import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/db';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

// Define optional fields for model creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend the Sequelize Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number; // Non-null assertion for required fields
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';

  public readonly createdAt!: Date; // Sequelize automatically adds these fields
  public readonly updatedAt!: Date;
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
