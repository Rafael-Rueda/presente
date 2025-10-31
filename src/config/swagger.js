import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Presente API",
            version: "1.0.0",
            description: "API para gerenciamento de usuários, alunos e validação de presença",
        },
        servers: [
            {
                url: "http://localhost:3333",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            description: "User ID",
                        },
                        name: {
                            type: "string",
                            description: "User name",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "User email",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Creation timestamp",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Last update timestamp",
                        },
                    },
                },
                Student: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            description: "Student ID",
                        },
                        name: {
                            type: "string",
                            description: "Student name",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Student email",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Creation timestamp",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Last update timestamp",
                        },
                    },
                },
                Attendance: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            description: "Attendance ID",
                        },
                        studentId: {
                            type: "string",
                            format: "uuid",
                            description: "Student ID",
                        },
                        date: {
                            type: "string",
                            format: "date",
                            nullable: true,
                            description: "Attendance date (NULL means absent)",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Creation timestamp",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Last update timestamp",
                        },
                        student: {
                            $ref: "#/components/schemas/Student",
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            description: "Error message",
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: "Health",
                description: "Health check endpoint",
            },
            {
                name: "Users",
                description: "User management endpoints",
            },
            {
                name: "Sessions",
                description: "Authentication endpoints",
            },
            {
                name: "Students",
                description: "Student management endpoints",
            },
            {
                name: "Attendances",
                description: "Attendance validation endpoints",
            },
        ],
        paths: {
            "/health": {
                get: {
                    tags: ["Health"],
                    summary: "Health check",
                    description: "Check if the API is running",
                    responses: {
                        200: {
                            description: "API is healthy",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            status: {
                                                type: "string",
                                                example: "ok",
                                            },
                                            timestamp: {
                                                type: "string",
                                                format: "date-time",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/users": {
                post: {
                    tags: ["Users"],
                    summary: "Create a new user",
                    description: "Register a new user (signup)",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["name", "email", "password"],
                                    properties: {
                                        name: {
                                            type: "string",
                                            example: "John Doe",
                                        },
                                        email: {
                                            type: "string",
                                            format: "email",
                                            example: "john@example.com",
                                        },
                                        password: {
                                            type: "string",
                                            example: "password123",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "User created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            user: {
                                                $ref: "#/components/schemas/User",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Missing required fields",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        409: {
                            description: "User with this email already exists",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
                get: {
                    tags: ["Users"],
                    summary: "Get all users",
                    description: "List all users (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "List of users",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            users: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/User",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/users/{id}": {
                get: {
                    tags: ["Users"],
                    summary: "Get user by ID",
                    description: "Get a specific user by ID (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid",
                            },
                            description: "User ID",
                        },
                    ],
                    responses: {
                        200: {
                            description: "User found",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            user: {
                                                $ref: "#/components/schemas/User",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "User not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/users/{userId}": {
                patch: {
                    tags: ["Users"],
                    summary: "Update user",
                    description: "Update user information (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "userId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid",
                            },
                            description: "User ID",
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            example: "John Doe Updated",
                                        },
                                        email: {
                                            type: "string",
                                            format: "email",
                                            example: "john.updated@example.com",
                                        },
                                        password: {
                                            type: "string",
                                            example: "newpassword123",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "User updated successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            user: {
                                                $ref: "#/components/schemas/User",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "User not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ["Users"],
                    summary: "Delete user",
                    description: "Delete a user (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "userId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid",
                            },
                            description: "User ID",
                        },
                    ],
                    responses: {
                        200: {
                            description: "User deleted successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            user: {
                                                $ref: "#/components/schemas/User",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "User not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/sessions": {
                post: {
                    tags: ["Sessions"],
                    summary: "Authenticate user",
                    description: "Login and get JWT token",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["email", "password"],
                                    properties: {
                                        email: {
                                            type: "string",
                                            format: "email",
                                            example: "john@example.com",
                                        },
                                        password: {
                                            type: "string",
                                            example: "password123",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Authentication successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            user: {
                                                $ref: "#/components/schemas/User",
                                            },
                                            token: {
                                                type: "string",
                                                description: "JWT token",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Missing required fields",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Invalid credentials",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/students": {
                post: {
                    tags: ["Students"],
                    summary: "Create a new student",
                    description: "Register a new student (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["name", "email"],
                                    properties: {
                                        name: {
                                            type: "string",
                                            example: "João Silva",
                                        },
                                        email: {
                                            type: "string",
                                            format: "email",
                                            example: "joao@example.com",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Student created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            student: {
                                                $ref: "#/components/schemas/Student",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Missing required fields",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        409: {
                            description: "Student with this email already exists",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
                get: {
                    tags: ["Students"],
                    summary: "Get all students",
                    description: "List all students (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "List of students",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            students: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Student",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/students/{id}": {
                get: {
                    tags: ["Students"],
                    summary: "Get student by ID",
                    description: "Get a specific student by ID (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid",
                            },
                            description: "Student ID",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Student found",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            student: {
                                                $ref: "#/components/schemas/Student",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "Student not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/attendances/validate": {
                post: {
                    tags: ["Attendances"],
                    summary: "Validate student attendance",
                    description:
                        "Register student attendance for a specific date (requires authentication). If date is not provided, current date is used.",
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["studentId"],
                                    properties: {
                                        studentId: {
                                            type: "string",
                                            format: "uuid",
                                            example: "123e4567-e89b-12d3-a456-426614174000",
                                        },
                                        date: {
                                            type: "string",
                                            format: "date",
                                            example: "2025-10-31",
                                            description: "Attendance date (optional, defaults to today)",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Attendance validated successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            attendance: {
                                                $ref: "#/components/schemas/Attendance",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Missing required fields",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "Student not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        409: {
                            description: "Attendance already registered for this student on this date",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/attendances": {
                get: {
                    tags: ["Attendances"],
                    summary: "Get all attendances",
                    description: "List all attendance records (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "List of attendances",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            attendances: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Attendance",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/attendances/student/{studentId}": {
                get: {
                    tags: ["Attendances"],
                    summary: "Get attendances by student",
                    description: "List all attendance records for a specific student (requires authentication)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "studentId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                                format: "uuid",
                            },
                            description: "Student ID",
                        },
                    ],
                    responses: {
                        200: {
                            description: "List of student attendances",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            attendances: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Attendance",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                        404: {
                            description: "Student not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
