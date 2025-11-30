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
        url: "http://localhost:3333", // Ok se seu servidor estiver nesta porta
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

// Se você está usando TypeScript com "import", é melhor usar o "export default"
export default swaggerDocs;
// O "module.exports" só é necessário se você estiver usando "require" em outros lugares, mas
// no TypeScript, o "export default" é preferível para manter a consistência.
// Você pode remover o "module.exports" se estiver usando apenas o "export default" no final.
// module.exports = swaggerDocs;
