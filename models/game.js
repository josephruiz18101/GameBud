module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.TEXT,
          allowNull: true
      },
      platform: {
          type: DataTypes.STRING,
          allowNull: true
      },
  });

  return Game;
};
