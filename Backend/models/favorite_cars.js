module.exports = (sequelize, Sequelize) => {
    const FavoriteCar = sequelize.define("favoriteCar", {
      carId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      }
    });
  
    return FavoriteCar;
  };