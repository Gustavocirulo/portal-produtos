# Portal de Produtos

Portal de produtos desenvolvido em React com TypeScript e Material-UI para gerenciamento de catálogo de produtos.

## 📋 Sobre o Projeto

Este projeto é uma aplicação web para gerenciamento de produtos, permitindo visualizar, criar, editar e excluir produtos de um catálogo. Foi desenvolvido utilizando tecnologias modernas do React com foco em uma interface responsiva e intuitiva.

## 🚀 Funcionalidades

- **Listagem de Produtos**: Visualização de todos os produtos em cards organizados
- **Pesquisa por ID**: Filtro para encontrar produtos específicos
- **Criação de Produtos**: Formulário completo para adicionar novos produtos
- **Edição de Produtos**: Modal para editar informações de produtos existentes
- **Exclusão de Produtos**: Confirmação segura antes de remover produtos
- **Layout Responsivo**: Interface adaptável para desktop e mobile
- **Navegação**: Menu lateral com diferentes seções do portal

## 🛠️ Tecnologias Utilizadas

- **React 19.1.0** - Biblioteca principal
- **TypeScript 4.9.5** - Tipagem estática
- **Material-UI 7.2.0** - Componentes de interface
- **React Router DOM 6.29.0** - Roteamento
- **CSS Modules** - Estilização modular
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx       # Layout principal com sidebar
│   ├── ProductCard.tsx  # Card de produto
│   ├── EditProductModal.tsx     # Modal de edição
│   └── DeleteConfirmationModal.tsx # Modal de confirmação
├── contexts/            # Contextos do React
│   └── ProductsContext.tsx # Estado global dos produtos
├── pages/               # Páginas da aplicação
│   ├── Home.tsx         # Página principal
│   ├── NewProduct.tsx   # Formulário de novo produto
│   ├── Categories.tsx   # Página de categorias
│   ├── About.tsx        # Página sobre
│   └── Contact.tsx      # Página de contato
├── mock.json           # Dados de exemplo
└── App.tsx             # Componente raiz
```

## 🎯 Páginas Disponíveis

- **Home (/)** - Lista de produtos com filtro e botão para criar novo produto
- **Novo Produto (/novo-produto)** - Formulário para adicionar produtos
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
- **Visualização**: Cards com imagem, nome, descrição, preço e categoria
- **Filtro**: Busca por ID do produto
- **CRUD Completo**: Criar, editar e excluir produtos
- **Validação**: Formulários com validação de campos obrigatórios

## 🎨 Design e Responsividade

- **Desktop**: Sidebar fixa com conteúdo principal ao lado
- **Mobile**: Menu hambúrguer com drawer lateral
- **Tema**: Material Design com cores personalizadas
- **Tipografia**: Roboto como fonte principal

## 🔄 Gerenciamento de Estado

O projeto utiliza React Context API para gerenciar o estado global dos produtos:

- **ProductsContext**: Centraliza operações CRUD
- **Estado de Loading**: Indicadores visuais durante operações
- **Persistência**: Dados mantidos em memória durante a sessão

## 📊 Dados de Exemplo

O arquivo `mock.json` contém produtos de exemplo com as seguintes propriedades:
- `id` - Identificador único
- `name` - Nome do produto
- `description` - Descrição detalhada
- `price` - Preço em reais
- `category` - Categoria do produto
- `pictureUrl` - URL da imagem

## 🚀 Scripts Disponíveis

## 🚀 Scripts Disponíveis

### `npm start`
Executa a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.\
A página recarrega automaticamente quando você faz alterações.

### `npm test`
Executa os testes em modo interativo.\
Veja mais informações sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`
Gera a build de produção na pasta `build`.\
Otimiza o React para melhor performance em produção.\
Os arquivos são minificados e incluem hashes nos nomes.

### `npm run eject`
⚠️ **Operação irreversível!** Remove a abstração do Create React App.\
Use apenas se precisar de configurações avançadas.

## 🤝 Contribuição

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
