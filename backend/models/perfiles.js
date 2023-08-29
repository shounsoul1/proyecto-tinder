import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class perfiles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_perfil: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'perfiles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "perfiles_pkey",
        unique: true,
        fields: [
          { name: "id_perfil" },
        ]
      },
    ]
  });
  }
}
