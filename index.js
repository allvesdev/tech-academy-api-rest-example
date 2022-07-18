import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();

const PORT = process.env.PORT || 3000;
let users = [
  { id: 1, name: "Thiago Alves", age: 30 },
  { id: 2, name: "Rafael Ribeiro", age: 31 },
];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//rota (recurso que queremos disponibilizar)
app.get("/", (request, response) => {
  return response.send("<h1>Trabalhando com servidor express.</h1>");
});

//retornando uma lista de usuários
app.get("/users", (request, response) => {
  return response.send(users);
});

//retornando um usuário específico
app.get("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const user = users.find((user) => {
    //.find está interessado em retornar o primeiro elemento que atenda uma condição definida
    return user.id === Number(userId);
  });
  return response.send(user);
});

// POST
app.post("/users", (request, response) => {
  const newUser = request.body;

  users.push(newUser); //fez um push no novo usuário

  return response.status(StatusCodes.CREATED).send(newUser); //retornou com o status:201
  //^ não é uma boa prática ficar colocando esse status "na mão". Por isso usamos o StatusCodes
});

app.purge("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const updatedUser = request.body;

  users = users.map((user) => {
    if (Number(userId) === user.id) {
      return updatedUser;
    }

    return user;
  });

  return response.send(updatedUser);
});

app.delete("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  users = users.filter((user) => user.id !== Number(userId));

  return response.status(StatusCodes.NO_CONTENT).send();
});
