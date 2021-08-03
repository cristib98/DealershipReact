module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("result", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      output: {
          type: Sequelize.TEXT
      }
    });
  
    return Result;
  };