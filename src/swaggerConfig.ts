const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação da API CowuAI",
      version: "1.0.0",
      description: "Documentação da API para o projeto CowuAI",
    },
    servers: [
      {
        url: "http://localhost:3333",
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
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  }, // CORREÇÃO AQUI: Caminho para encontrar todos os arquivos *.routes.ts dentro de modules
  apis: ["./src/modules/**/*.routes.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;