'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Toy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Toy.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Toy',
    }
  )
  return Toy
}
