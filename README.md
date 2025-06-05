
<h1 align="center">Api de Aluguéis de imóveis com Node.js (Em Desenvolvimento...)</h1>

<p align="center">
  <a href="#instalação">🚀 Instalação</a> •
  <a href="#rotas">📡 Rotas</a> •
  <a href="#dev">👨‍💻 Dev</a>
</p>

<br/>

<p>
 Esta é uma api completa de gestão de imóveis e aluguel que pode ser utilizada tanto por usuários que desejam alugar o seu imóvel, quanto para administradores e corretores que a utilizaram pra fazer a gestão do sistema
</p>

<h2>Tecnologias</h2>

[![TypeScript](https://img.shields.io/badge/TypeScript-4323d5.svg?style=for-the-badge&logo=TypeScript&logoColor=white)]()
[![NodeJs](https://img.shields.io/badge/Node.js-4323d5.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
[![Fastify](https://img.shields.io/badge/Fastify-4323d5.svg?style=for-the-badge&logo=Fastify&logoColor=white)]()
[![Postgresql](https://img.shields.io/badge/PostgreSQL-4323d5.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)]()
[![Prisma](https://img.shields.io/badge/Prisma-4323d5.svg?style=for-the-badge&logo=Prisma&logoColor=white)]()
[![Redis](https://img.shields.io/badge/Redis-4323d5.svg?style=for-the-badge&logo=Redis&logoColor=white)]()
[![Docker](https://img.shields.io/badge/Docker-4323d5.svg?style=for-the-badge&logo=Docker&logoColor=white)]()
[![Zod](https://img.shields.io/badge/Zod-4323d5.svg?style=for-the-badge&logo=Zod&logoColor=white)]()
[![Insomnia](https://img.shields.io/badge/Insomnia-4323d5.svg?style=for-the-badge&logo=Insomnia&logoColor=white)]()
[![Swagger](https://img.shields.io/badge/Swagger-4323d5.svg?style=for-the-badge&logo=Swagger&logoColor=white)]()

<h2 id="instalação">🚀 Instalação</h2>

### ✅ Requisitos

- [Docker](https://www.docker.com/get-started/) Instalado
- [Wsl](https://learn.microsoft.com/pt-br/windows/wsl/install) Inslação opcional (Só instá-le caso esteja utilizando Windows)

---

### ⚙️ Passos para instalação

#### 1. Clone o repositório

```bash
git clone https://github.com/gabriel8programmer/rental-api
cd rental-api
```

#### 2. Crie o arquivo `.env` com o seguinte formato:

```env
PORT=3000 #PADRÃO 3000 MAS VOCÊ PODE TROCÁ-LA NOS ARQUIVOS DE (DOCKERFILE E COMPOSE.YAML)
DATABASE_URL= #VAI SER CRIADA AUTOMATICAMENTE PELO PRISMA SÓ TERÁ QUE CONFIGURÁ-LA
```

---

#### 3. Rode o [docker compose](https://docs.docker.com/compose/install/) com o seguinte comando:

```bash
docker compose up
```

Aviso: Se não tiver as imagens necessárias para o container do docker ele vai instalá-las e isso pode demorar um pouco, garanta um espaço interessante no disco:

---

## 🛰️ Uso da API

A API será executada localmente em:

```
http://localhost:PORT
```

Substitua `PORT` pelo valor definido no seu arquivo `.env`

---

## 🧪 Testando a API

Você pode testar as rotas utilizando ferramentas como:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

<h2 id="rotas">📡 Rotas</h2>

<h2 id="dev">👨‍💻 Desenvolvedor</h2>

Este projeto foi desenvolvido por Gabriel Pereira, com foco em aprendizado de nodejs, express, mongodb e documentação básica de API com swagger.

<div>
  <img  style="height: 150px" src="https://github.com/user-attachments/assets/c4df01b4-a935-4613-9eb9-aaf04d07b296" alt="Foto de perfil" />
</div>

<a href="mailto:gabriel8webprogrammer@gmail.com" target="_blank">
  <img src="https://img.shields.io/badge/Gmail-4323d5?style=for-the-badge&logo=gmail&logoColor=white" alt="gmail"/>
</a>

<a href="https://github.com/gabriel8programmer" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-4323d5.svg?style=for-the-badge&logo=GitHub&logoColor=white" alt="Github" />
</a>

<a href="https://www.linkedin.com/in/gabrielwebprogrammer" target="_blank">
  <img src="https://img.shields.io/badge/linkedin-4323d5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin"/>
</a>

<a href="https://portfolio-backend-bay-two.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/Portfolio-4323d5.svg?style=for-the-badge&logo=firefox&logoColor=white" alt="Portfólio" />
</a>

Sinta-se à vontade para entrar em contato em caso de dúvidas, sugestões ou propostas de colaboração!

