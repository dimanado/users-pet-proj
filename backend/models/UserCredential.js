const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const UserCredential = sequelize.define('UserCredential', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
  }, {
    hooks: {
      beforeCreate: async (credentials) => {
        const salt = await bcrypt.genSalt(10);
        credentials.password = await bcrypt.hash(credentials.password, salt);
      },
      beforeUpdate: async (credentials) => {
        if (credentials.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          credentials.password = await bcrypt.hash(credentials.password, salt);
        }
      },
    },
  });

  UserCredential.associate = (models) => {
    UserCredential.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return UserCredential;
};
