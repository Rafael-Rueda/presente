import { DataTypes } from "sequelize";

import { Student } from "./students.js";
import sequelize from "../../sequelize/sequelize.js";

export const Attendance = sequelize.define(
    "Attendance",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Student,
                key: "id",
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "Date of attendance. NULL means the student was absent.",
        },
    },
    {
        tableName: "attendances",
        indexes: [
            {
                unique: true,
                fields: ["studentId", "date"],
                name: "unique_student_date_attendance",
            },
        ],
    },
);

// Define associations
Student.hasMany(Attendance, {
    foreignKey: "studentId",
    as: "attendances",
});

Attendance.belongsTo(Student, {
    foreignKey: "studentId",
    as: "student",
});
