module.exports = function(sequelize, DataTypes) {
    const Brackit = sequelize.define("Brackit", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        numberCandidates: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        socket: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    Brackit.associate = function(models) {

        Brackit.belongsTo(models.Admin, {
            foreignKey: {
              allowNull: false
            }
          });


        Brackit.hasMany(models.User, {
            onDelete: "cascade"
        });
        
        Brackit.hasMany(models.Candidate, {
            onDelete: "cascade"
        })
    }

    return Brackit;
}
