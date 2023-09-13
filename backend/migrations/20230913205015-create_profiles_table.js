'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id_perfil: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      genero: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      ubicacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      intereses: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_photo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: { // Esta es la nueva columna para la relación
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nombre de la tabla a la que hace referencia
          key: 'id_user'  // Nombre de la columna en la tabla users
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
  }
};
