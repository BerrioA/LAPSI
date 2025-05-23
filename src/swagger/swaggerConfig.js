import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestión de LAPSI",
    version: "1.0.0",
    description: "Documentación de la API con Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000/api/lapsi/v1",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/**/*.js"],
};

const spec = swaggerJsdoc(options);
export default spec;
