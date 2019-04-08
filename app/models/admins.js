module.exports = function (sequelize, DataTypes) {
    const Admin = sequelize.define("Admin", {
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    })

    Admin.associate = function(models) {

        Admin.hasMany(models.Bracket, {
            onDelete: "cascade"
        })
        
    }

    return Admin;
}