import { DataTypes } from "sequelize";

import sequelize from "../../sequelize/sequelize.js";

export const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "students",
    },
);
