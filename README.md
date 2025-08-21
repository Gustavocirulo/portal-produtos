# Site NETLIFY Frontend
https://project-ufscar-ghcirulo.netlify.app/

# Portal de Produtos

Portal de produtos desenvolvido em React com TypeScript e Material-UI para gerenciamento de catálogo de produtos.

## 📋 Sobre o Projeto

Este projeto é uma aplicação web para gerenciamento de produtos, permitindo visualizar, criar, editar e excluir produtos de um catálogo. Foi desenvolvido utilizando tecnologias modernas do React com foco em uma interface responsiva e intuitiva.

## 🚀 Funcionalidades

- **Listagem de Produtos**: Visualização de todos os produtos em cards organizados
- **Pesquisa por ID**: Filtro para encontrar produtos específicos (apenas números)
- **Criação de Produtos**: Formulário completo para adicionar novos produtos
- **Edição de Produtos**: Modal para editar informações de produtos existentes
- **Exclusão de Produtos**: Confirmação segura antes de remover produtos
- **Importação em Massa via CSV**: Upload e processamento de arquivos CSV para criação múltipla de produtos
- **Autenticação JWT**: Sistema de login e proteção de rotas
- **Integração com API**: Conectado com backend para operações CRUD
- **Layout Responsivo**: Interface adaptável para desktop e mobile
- **Navegação**: Menu lateral com diferentes seções do portal
- **Notificações**: Sistema de toasts para feedback das operações


## 🛠 Tecnologias Utilizadas

- **React 19.1.0** - Biblioteca principal
- **TypeScript 4.9.5** - Tipagem estática
- **Material-UI 7.2.0** - Componentes de interface
- **React Router DOM 7.7.1** - Roteamento moderno com loaders
- **Axios** - Cliente HTTP para requisições à API
- **JWT** - Autenticação baseada em tokens
- **Jest** - Framework de testes unitários
- **React Testing Library** - Testes de componentes React
- **CSS Modules** - Estilização modular
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx       # Layout principal com sidebar
│   ├── ProductCard.tsx  # Card de produto
│   ├── EditProductModal.tsx     # Modal de edição
│   ├── DeleteConfirmationModal.tsx # Modal de confirmação
│   ├── CSVImportModal.tsx       # Modal de importação CSV
│   └── ProtectedRoute.tsx       # Proteção de rotas
├── contexts/            # Contextos do React
│   ├── ProductsContext.tsx # Estado global dos produtos
│   ├── AuthContext.tsx     # Contexto de autenticação
│   └── SnackbarContext.tsx # Contexto de notificações
├── pages/               # Páginas da aplicação
│   ├── Home.tsx         # Página principal (portal de produtos)
│   ├── NewProduct.tsx   # Formulário de novo produto
│   ├── MassImport.tsx   # Página de importação em massa
│   ├── Login.tsx        # Página de login
│   ├── Categories.tsx   # Página de categorias
│   ├── About.tsx        # Página sobre
│   └── Contact.tsx      # Página de contato
├── services/            # Serviços de API
│   └── apiService.ts    # Cliente HTTP com Axios
├── __tests__/           # Testes unitários
│   └── ProductList.test.tsx # Testes da listagem
└── App.tsx             # Componente raiz
```

## 🎯 Páginas Disponíveis

- **Login (/login)** - Autenticação para acesso ao sistema
- **Home (/)** - Portal de produtos com filtro, busca e botão de importação CSV
- **Novo Produto (/novo-produto)** - Formulário para adicionar produtos
- **Importação em Massa (/importacao-massa)** - Interface para importação de produtos via CSV
- **Categorias (/categories)** - Página de categorias (em desenvolvimento)
- **Sobre (/about)** - Informações sobre o projeto
- **Contato (/contact)** - Página de contato

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para executar

1. Clone o repositório:
```bash
git clone https://github.com/Gustavocirulo/portal-produtos.git
cd portal-produtos-novo
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Abra o navegador em [http://localhost:3000](http://localhost:3000)

## 📱 Interface do Usuário

### Menu de Navegação
- **🏠 Início** - Lista de produtos
- **📂 Categorias** - Organização por categorias  
- **ℹ️ Sobre** - Informações do projeto
- **📞 Contato** - Formulário de contato

### Recursos dos Produtos
- **Visualização**: Cards com imagem, nome, descrição, preço, categoria e estoque
- **Filtro**: Busca por código do produto (apenas números)
- **CRUD Completo**: Criar, editar e excluir produtos via API
- **Importação CSV**: Upload de arquivos CSV para criação em massa
- **Validação**: Formulários com validação de campos obrigatórios
- **Notificações**: Feedback em tempo real das operações

## 🎨 Design e Responsividade

- **Desktop**: Sidebar fixa com conteúdo principal ao lado
- **Mobile**: Menu hambúrguer com drawer lateral
- **Tema**: Material Design com cores personalizadas
- **Tipografia**: Roboto como fonte principal

## 🔄 Gerenciamento de Estado

O projeto utiliza React Context API para gerenciar o estado global:

- **ProductsContext**: Centraliza operações CRUD com integração à API
- **AuthContext**: Gerencia autenticação JWT e proteção de rotas
- **SnackbarContext**: Sistema global de notificações e toasts
- **Estado de Loading**: Indicadores visuais durante operações assíncronas
- **Persistência**: Dados sincronizados com backend via API REST

## 📊 Integração com API

O projeto está integrado com uma API REST para todas as operações:

### Endpoints Utilizados:
- **POST /login** - Autenticação de usuários
- **GET /products** - Listagem de produtos
- **POST /products** - Criação de produtos
- **PUT /products/:id** - Atualização de produtos
- **DELETE /products/:id** - Exclusão de produtos
- **GET /categories** - Listagem de categorias

### Autenticação:
- **JWT Tokens** para autenticação
- **Headers Authorization** em todas as requisições protegidas
- **Refresh Token** para renovação automática

## 📁 Importação CSV

### Funcionalidades:
- **Template CSV**: Download de arquivo modelo com campos corretos
- **Validação de Formato**: Verificação de extensão .csv
- **Codificação UTF-8**: Suporte completo a acentos e caracteres especiais
- **Parser Robusto**: Detecta separadores (vírgula ou ponto e vírgula)
- **Seleção Individual**: Checkboxes para escolher produtos a importar
- **Status Individual**: Feedback de sucesso/erro para cada produto
- **Importação Silenciosa**: Não interfere na interface durante o processo

### Formato do CSV:
```csv
name,description,price,category,pictureUrl,stock
"Produto Exemplo","Descrição com acentos","99.99","Categoria","https://exemplo.com/img.jpg","10"
```

## 🚀 Scripts Disponíveis

## 🚀 Scripts Disponíveis

### `npm start`
Executa a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.\
A página recarrega automaticamente quando você faz alterações.

### `npm test`
Executa os testes unitários usando Jest e React Testing Library.\
Configurado com `jest.config.js` personalizado para suporte a TypeScript e aliases.

### `npm run build`
Gera a build de produção na pasta `build`.\
Otimiza o React para melhor performance em produção.\
Os arquivos são minificados e incluem hashes nos nomes.

### `npm run eject`
⚠️ **Operação irreversível!** Remove a abstração do Create React App.\
Use apenas se precisar de configurações avançadas.

## 🆕 Últimas Atualizações

### v2.0 - Funcionalidades Avançadas
- ✅ **Sistema de Autenticação JWT** completo
- ✅ **Integração com API REST** para todas as operações
- ✅ **Importação em Massa via CSV** com interface intuitiva
- ✅ **Validação de Entrada Numérica** no campo código
- ✅ **Sistema de Notificações** com toasts
- ✅ **Filtro de Busca Aprimorado** com botão dedicado
- ✅ **Proteção de Rotas** baseada em autenticação
- ✅ **Testes Unitários** com React Testing Library
- ✅ **Correção de Codificação UTF-8** para caracteres especiais
- ✅ **Interface de Status Persistente** na importação

### Melhorias Técnicas:
- **React Router v7+** com loaders modernos
- **Axios** substituindo fetch para melhor controle de requisições
- **Context API aprimorado** com múltiplos contextos especializados
- **Estado isolado** para importação em massa
- **Parser CSV robusto** com detecção automática de separadores


## � Testes Unitários

O projeto possui testes automatizados para garantir a corretude da listagem de produtos, incluindo:

- **Exibição dos produtos**: Valida se a lista mostra corretamente os produtos vindos do contexto/loader.
- **Filtragem**: Garante que a busca filtra os produtos exibidos conforme o texto digitado.

Os testes utilizam **React Testing Library** e **Jest**.


### Como rodar os testes

1. Instale as dependências (caso ainda não tenha feito):
	```bash
	npm install
	```
2. Execute os testes:
	```bash
	npm test
	```
	O comando já está configurado para rodar o Jest com o arquivo `jest.config.js` personalizado, garantindo que aliases, paths e outras customizações funcionem corretamente.

> **Nota:**
> O comando padrão do Create React App (`react-scripts test`) ignora o arquivo `jest.config.js` e usa apenas a configuração interna do CRA. Por isso, o script de teste foi alterado no `package.json` para rodar `npx jest --config jest.config.js`, permitindo o uso de aliases TypeScript, mapeamento de módulos e outras configurações avançadas.

Os arquivos de teste ficam em `src/__tests__`.

---

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi criado para fins educacionais como parte do curso da UFSCar.

## 👨‍💻 Desenvolvedor

Desenvolvido como projeto acadêmico para demonstrar conhecimentos em:
- Desenvolvimento Frontend com React
- Gerenciamento de Estado
- Interface Responsiva
- TypeScript
- Material-UI

## 📚 Recursos Úteis

- [Documentação do React](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com/)

---

Desenvolvido usando React + TypeScript + Material-UI
