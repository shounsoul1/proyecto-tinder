import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "users_email_key"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
  }
}
