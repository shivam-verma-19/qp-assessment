import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/db';

interface GroceryItemAttributes {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface GroceryItemCreationAttributes extends Optional<GroceryItemAttributes, 'id'> {}

class GroceryItem extends Model<GroceryItemAttributes, GroceryItemCreationAttributes> implements GroceryItemAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;
}

GroceryItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize, modelName: 'GroceryItem' }
);

export default GroceryItem;
