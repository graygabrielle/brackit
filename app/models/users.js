module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                len: [1]
            }
        },
        isConnected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    })

    User.associate = function(models) {

        User.belongsTo(models.Brackit, {
            foreignKey: {
              allowNull: true
            }
          });

        User.hasMany(models.Vote, {
            onDelete: "cascade"
        });   
    }

    return User;
}