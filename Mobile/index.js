const PORT = 80;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
let counter = 3;
let lista = [
  { id: 1, nome: "amazon", cnpj:"00.000.000/0000-00", email:"amazon@hotmail.com", senha:"123456" },
  { id: 2, nome: "youtube", cnpj:"11.111.111/1111-11", email:"youtube@gmail.com", senha:"444444" },
];
app.get("/acao", (request, response) => {
  console.log("GET Contato acessado");
  response.status(200).json(lista);
});
app.post("/acao", (request, response) => {
  console.log("POST Contato acessado");
  const obj = { ...request.body, id: counter };
  lista.push(obj);
  counter++;
  response.status(201).json({ status: "ok" });
});
app.put("/acao", (request, response) => {
  console.log("PUT Contato acessado");
  const obj = {...request.body};
  // lista = lista.map(item => { 
  //   if (obj.id === item.id) {
  //     return obj
  //   } else {
  //     return item
  //   }
  // })

  // lista = lista.map( item => obj.id === item.id ? obj : item );

  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    if (item.id === obj.id) {
      lista.splice(i, 1, obj);
      response.status(200).json({status: "ok"})
      return
    }
  } 
  response.status(404).json({status: "id não encontrado"})
});

app.delete("/acao/:id", (request, response)=> {
  const id = request.params.id;
  console.log("DELETE Contato acessado para o ID : " + id);
  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    if (item.id === parseInt(id)) {
      lista.splice(i, 1);
      response.status(200).json({status: "ok"});
      return
    }
  }
  response.status(404).json({status: "id não encontrado"});
});

app.listen(PORT, () => {
  console.log("Servidor iniciado e ouvindo na porta " + PORT);
})