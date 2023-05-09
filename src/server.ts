import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./lib/routes";

const app = fastify();
app.register(cors);
app.register(appRoutes)

const PORT = 5000;

app.listen({
  port: PORT,
}).then(()=>{
  console.log(`HTTP Server Running at Port ${PORT}`)
});
