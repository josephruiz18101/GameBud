module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      platform: {
        type: DataTypes.STRING,
      },
      release_year: {
        type: DataTypes.INTEGER,
      },
    }, {
      tableName: 'games', // Use lowercase 'games' table
    });
    
    return Game;
  };
  