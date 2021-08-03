module.exports = (sequelize, Sequelize) => {
    const Quiz = sequelize.define("quiz", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      content: {
          type: Sequelize.TEXT
      }
    });
  
    return Quiz;
  };