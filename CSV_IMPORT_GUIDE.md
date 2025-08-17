# Funcionalidade de Importação CSV

## Melhorias Implementadas

### 1. Correção de Codificação
- **Problema**: Caracteres com acento (como "Descrição") apareciam como "DescriÃ§Ã£o" 
- **Solução**: 
  - Adicionado BOM (Byte Order Mark) UTF-8 no template (`\uFEFF`)
  - Especificado charset UTF-8 no Blob: `type: 'text/csv;charset=utf-8'`
  - Leitura do arquivo com codificação UTF-8: `reader.readAsText(file, 'UTF-8')`

### 2. Parser CSV Robusto
- **Detecção automática de separador**: Suporta tanto vírgula (`,`) quanto ponto e vírgula (`;`)
- **Tratamento de aspas**: Campos entre aspas podem conter vírgulas e ponto e vírgulas
- **Aspas escapadas**: Suporte para aspas duplas (`""`) dentro de campos

### 3. Template Melhorado
- Campos entre aspas para evitar problemas com vírgulas e caracteres especiais
- Exemplos com acentuação para demonstrar funcionamento
- Instruções claras sobre codificação UTF-8

## Como Usar

1. **Baixar Template**: Clique em "Baixar Template CSV" para obter um arquivo de exemplo
2. **Editar Arquivo**: Abra o arquivo em um editor que preserve UTF-8 (Excel, LibreOffice, etc.)
3. **Importar**: Selecione o arquivo preenchido e clique em "Importar"

## Formato do CSV

```csv
name,description,price,category,pictureUrl,stock
"Produto Exemplo","Descrição do produto exemplo com acentos","99.99","Categoria Exemplo","https://exemplo.com/imagem.jpg","10"
"Outro Produto","Descrição com vírgula, ponto e vírgula; e acentuação","199.99","Categoria Teste","https://exemplo.com/imagem2.jpg","5"
```

## Notas Técnicas

- O arquivo é salvo com BOM UTF-8 para garantir compatibilidade com editores
- Campos são opcionalmente envolvidos em aspas para evitar problemas com separadores
- O parser detecta automaticamente se o separador é vírgula ou ponto e vírgula
