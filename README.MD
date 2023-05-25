<div align="center">
  <br>
    <h1 style="font-weight: bold;"><span style="color: rgb(6, 182, 212);">SAO</span>ITR 🚗</h1>
    <h2>Sistema de Ocorrências de Trânsito</h2>
</div>

<br>

<div>
<p>O projeto consiste em uma aplicação web para o gerenciamento de ocorrências de trânsito. Os usuários têm a capacidade de cadastrar ocorrências, fornecendo informações detalhadas sobre cada incidente, como local, data, descrição e outros detalhes relevantes. Além disso, outros usuários podem filtrar as ocorrências com base em critérios específicos, como localidade, data ou tipo de incidente, permitindo uma visualização mais personalizada e direcionada das ocorrências de trânsito.</p>
</div>

<br>

<div>
<h2 style="font-weight: bold;">Tecnologias BackEnd</h2>
<span><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS"></span>
<span><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js"></span>
<span><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></span>
<span><img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT"></span>
</div>

<br>

<div>
<h2 style="font-weight: bold;">Tecnologias FrontEnd</h2>
<span><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"></span>
<span><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></span>
<span><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></span>
</div>

<br>

### Como executar o projeto

#### Pré-requisitos

<div>
<ul>
  <li><a href="https://nodejs.org/en/" targer="_blank">Node.js</a></li>
  <li><a href="https://www.mongodb.com/" targer="_blank">MongoDB</a></li>
</ul>
</div>

Se você possuir o <a href="https://www.docker.com/" targer="_blank">Docker</a> instalado, pode executar o arquivo `docker-compose.yml` para criar um container com o MongoDB.

```bash
$ docker compose up -d
```

#### BackEnd

```bash
# Clone este repositório
$ git clone

# Acesse a pasta do projeto no terminal/cmd
$ cd backend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:20000 - acesse http://localhost:20000
```

#### FrontEnd

```bash
# Clone este repositório
$ git clone

# Acesse a pasta do projeto no terminal/cmd
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000
```
