# API de Gerenciamento de Clientes

Esta é uma API simples para gerenciamento de clientes com operações CRUD básicas. Utiliza o MongoDB como banco de dados não relacional e foi documentada usando o Swagger. Além disso, inclui scripts de teste de desempenho utilizando o K6.

## Configuração

### Instalação

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

1. Clone este repositório:

````
git clone https://github.com/seu-usuario/api-clientes.git
cd api-clientes
````

# 1. Instale as dependências:
````
npm install
````

# Configuração do Banco de dados
Certifique-se de que o MongoDB esteja em execução. Edite o arquivo `app.js` para ajustar a URL do banco de dados de acordo com a sua configuração.

````
// ...

mongoose.connect('mongodb://localhost:27017/seuBancoDeDados', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ...

````

# Executando a API
Inicie o servidor:

````
node app.js
````

A API estará disponível em http://localhost:3000.

# Documentação Swagger
Acesse a documentação Swagger em http://localhost:3000/api-docs para explorar e testar os endpoints da API.

# Testando a API com K6
Certifique-se de ter o K6 instalado globalmente:

````
npm install -g k6
````

Execute o teste de desempenho:
````
k6 run test.js
````

# Observações:
* Certifique-se de personalizar a configuração da API e do banco de dados de acordo com suas preferências específicas.
* Adapte os scripts de teste conforme necessário, incluindo URLs, payloads e lógica de teste.

