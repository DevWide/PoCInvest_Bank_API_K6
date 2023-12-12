const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Configurar o MongoDB
mongoose.connect('mongodb://localhost:27017/seuBancoDeDados', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir o Schema do MongoDB
const customerSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  agencia: String,
  conta: String,
  nomeBanco: String
});

const Cliente = mongoose.model('Cliente', customerSchema);

// Middleware
app.use(bodyParser.json());

// Swagger Configuração
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API de Cliente',
      version: '1.0.0',
      description: 'CRUD API para clientes'
    },
  },
  apis: ['./app.js'], // Arquivo principal
};

// Definições do Swagger
/**
 * @swagger
 * definitions:
 *   Cliente:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *       cpf:
 *         type: string
 *       agencia:
 *         type: string
 *       conta:
 *         type: string
 *       nomeBanco:
 *         type: string
 */

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /clientes:
 *   get:
 *     description: Retorna todos os clientes
 *     responses:
 *       200:
 *         description: Sucesso
 */
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /clientes:
 *   post:
 *     description: Adiciona um novo cliente
 *     parameters:
 *       - name: customer
 *         description: Objeto do cliente
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Customer'
 *     responses:
 *       201:
 *         description: Criado com sucesso
 */
app.post('/clientes', async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    const newCliente = await cliente.save();
    res.status(201).json(newCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     description: Retorna um cliente pelo ID
 *     parameters:
 *       - name: id
 *         description: ID do cliente
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Cliente não encontrado
 */
app.get('/clientes/:id', getCliente, (req, res) => {
  res.json(res.cliente);
});

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     description: Atualiza um cliente pelo ID
 *     parameters:
 *       - name: id
 *         description: ID do cliente
 *         in: path
 *         required: true
 *         type: string
 *       - name: customer
 *         description: Objeto do cliente
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Customer'
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *         description: Requisição inválida
 */
app.put('/clientes/:id', getCliente, async (req, res) => {
    try {
      if (!res.cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
  
      // Atualizar propriedades do cliente
      res.cliente.nome = req.body.nome;
      res.cliente.cpf = req.body.cpf;
      res.cliente.agencia = req.body.agencia;
      res.cliente.conta = req.body.conta;
      res.cliente.nomeBanco = req.body.nomeBanco;
  
      // Salvar o documento atualizado
      await Cliente.findByIdAndUpdate(req.params.id, res.cliente, { new: true });
  
      res.json(res.cliente);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     description: Deleta um cliente pelo ID
 *     parameters:
 *       - name: id
 *         description: ID do cliente
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Sucesso
 *       404:
 *         description: Cliente não encontrado
 */
app.delete('/clientes/:id', getCliente, async (req, res) => {
    try {
      if (!res.cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      await Cliente.deleteOne({ _id: req.params.id });
      res.status(204).json({ message: 'Cliente removido com sucesso' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
  

// Middleware para obter um cliente pelo ID
async function getCliente(req, res, next) {
    try {
      const cliente = await Cliente.findById(req.params.id).lean();
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      res.cliente = cliente; // Adicionando o cliente ao objeto de resposta
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
}
  

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
