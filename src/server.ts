import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify();
app.register(cors);

app.listen({
  port: 5000,
}).then(()=>{
  console.log('HTTP Server Running')
});
