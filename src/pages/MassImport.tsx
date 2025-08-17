import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import { useSnackbar } from '../contexts/SnackbarContext';
import Layout from '../components/Layout';

interface ImportProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
  stock: number;
  selected: boolean;
  status?: 'pending' | 'success' | 'error';
  message?: string;
}

const MassImport: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addProductSilent, reloadProducts } = useProducts();
  const { showMessage } = useSnackbar();
  const [importProducts, setImportProducts] = useState<ImportProduct[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importCompleted, setImportCompleted] = useState(false);

  useEffect(() => {
    const file = location.state?.file;
    if (!file) {
      showMessage('Nenhum arquivo selecionado', 'error');
      navigate('/');
      return;
    }

    parseCSVFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate]); // Removido showMessage das dependências intencionalmente

  const parseCSVFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      
      if (lines.length === 0) return;
      
      // Detectar separador automaticamente
      const firstLine = lines[0];
      const separator = firstLine.includes(';') ? ';' : ',';
      
      const parsedProducts: ImportProduct[] = [];
      
      // Função para fazer parse de uma linha CSV considerando aspas
      const parseCSVLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              // Aspas duplas escapadas
              current += '"';
              i++; // Pular a próxima aspa
            } else {
              // Alternar estado das aspas
              inQuotes = !inQuotes;
            }
          } else if (char === separator && !inQuotes) {
            // Separador fora das aspas
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        
        // Adicionar o último campo
        result.push(current.trim());
        return result;
      };
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const values = parseCSVLine(line);
          if (values.length >= 6) {
            parsedProducts.push({
              name: values[0] || '',
              description: values[1] || '',
              price: parseFloat(values[2] || '0'),
              category: values[3] || '',
              pictureUrl: values[4] || '',
              stock: parseInt(values[5] || '0'),
              selected: false,
              status: 'pending'
            });
          }
        }
      }
      
      setImportProducts(parsedProducts);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleSelectProduct = (index: number) => {
    setImportProducts(prev => 
      prev.map((product, i) => 
        i === index ? { ...product, selected: !product.selected } : product
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = importProducts.every(p => p.selected);
    setImportProducts(prev => 
      prev.map(product => ({ ...product, selected: !allSelected }))
    );
  };

  const handleImport = async () => {
    const selectedProducts = importProducts.filter(p => p.selected);
    if (selectedProducts.length === 0) return;

    setIsImporting(true);

    for (let i = 0; i < importProducts.length; i++) {
      if (importProducts[i].selected) {
        try {
          // Caso o nome, descrição ou categoria estejam vazios, não criar o produto e retorna mensagem abaixo do card
            if (!importProducts[i].name || !importProducts[i].description || !importProducts[i].category) {
                setImportProducts(prev => 
                prev.map((product, index) => {
                    if (index === i) {
                    return { ...product, status: 'error', message: 'Nome, descrição ou categoria não podem estar vazios.' };
                    }
                    return product;
                })
                );
                continue;
            }

          await addProductSilent({
            name: importProducts[i].name,
            description: importProducts[i].description,
            price: importProducts[i].price,
            category: importProducts[i].category,
            pictureUrl: importProducts[i].pictureUrl,
            stock: importProducts[i].stock
          });

          setImportProducts(prev => 
            prev.map((product, index) => {
              if (index === i) {
                return { ...product, status: 'success', message: 'Produto criado com sucesso!' };
              }
              return product;
            })
          );
        } catch (error) {
          setImportProducts(prev => 
            prev.map((product, index) => {
              if (index === i) {
                return { 
                  ...product, 
                  status: 'error', 
                  message: error instanceof Error ? error.message : 'Erro ao criar produto'
                };
              }
              return product;
            })
          );
        }
      }
    }

    setIsImporting(false);
    setImportCompleted(true);
    showMessage('Importação finalizada!', 'info');
  };

  const handleBackToHome = async () => {
    await reloadProducts();
    navigate('/');
  };

  const selectedCount = importProducts.filter(p => p.selected).length;

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Importação em Massa
          </Typography>
          <Button 
            variant="outlined" 
            onClick={importCompleted ? handleBackToHome : () => navigate('/')}
          >
            {importCompleted ? 'Voltar e Atualizar Lista' : 'Voltar'}
          </Button>
        </Box>

        {importProducts.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleSelectAll}
                disabled={isImporting}
              >
                {importProducts.every(p => p.selected) ? 'Desmarcar Todos' : 'Selecionar Todos'}
              </Button>
              <Typography variant="body2" color="text.secondary">
                {selectedCount} de {importProducts.length} produtos selecionados
              </Typography>
            </Box>
            
            {importCompleted && (
              <Box sx={{ mb: 2 }}>
                <Alert severity="info" sx={{ mb: 1 }}>
                  Importação concluída! 
                  {' '}Produtos criados com sucesso: {importProducts.filter(p => p.status === 'success').length}
                  {' '}| Produtos com erro: {importProducts.filter(p => p.status === 'error').length}
                </Alert>
              </Box>
            )}
            
            <Button
              variant="contained"
              onClick={handleImport}
              disabled={selectedCount === 0 || isImporting || importCompleted}
              startIcon={isImporting ? <CircularProgress size={20} /> : null}
            >
              {isImporting ? 'Importando...' : `Enviar (${selectedCount})`}
            </Button>
          </Box>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
          {importProducts.map((product, index) => (
            <Card key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.pictureUrl || '/logo192.png'}
                alt={product.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/logo192.png';
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                  R$ {product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Categoria: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Estoque: {product.stock}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Checkbox
                    checked={product.selected}
                    onChange={() => handleSelectProduct(index)}
                    disabled={isImporting}
                  />
                  <Typography variant="body2">
                    Selecionar para importação
                  </Typography>
                </Box>

                {product.status === 'success' && (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    {product.message}
                  </Alert>
                )}
                
                {product.status === 'error' && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {product.message}
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        {importProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum produto encontrado no arquivo CSV
            </Typography>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default MassImport;
