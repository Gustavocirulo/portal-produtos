import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Input,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';

interface CSVImportModalProps {
  open: boolean;
  onClose: () => void;
}

const CSVImportModal: React.FC<CSVImportModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDownloadTemplate = () => {
    const csvTemplate = `name;description;price;category;pictureUrl;stock
"Produto Exemplo";"Descrição do produto exemplo com acentos";"99.99";"Categoria Exemplo";"https://exemplo.com/imagem.jpg";"10"
"Outro Produto";"Descrição com vírgula, ponto e vírgula; e acentuação";"199.99";"Categoria Teste";"https://exemplo.com/imagem2.jpg";"5"`;
    
    // Criar Blob com codificação UTF-8 explícita e BOM
    const blob = new Blob(['\uFEFF' + csvTemplate], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template_produtos.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showMessage('Template CSV baixado com sucesso!', 'success');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        showMessage('Extensão de arquivo inválida', 'error');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      // Navegar para página de importação em massa passando o arquivo
      navigate('/importacao-massa', { state: { file: selectedFile } });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Importação de Produtos via CSV</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
          {/* Botão para baixar template */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              1. Baixar Template
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Baixe o template CSV com os campos necessários para importação. O arquivo será salvo com codificação UTF-8 para preservar acentos e caracteres especiais.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleDownloadTemplate}
              fullWidth
            >
              Baixar Template CSV
            </Button>
          </Box>

          {/* Seleção de arquivo */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              2. Selecionar Arquivo
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Selecione o arquivo CSV com os produtos para importação. Certifique-se de que o arquivo está salvo com codificação UTF-8 para evitar problemas com acentos.
            </Typography>
            <Input
              type="file"
              inputProps={{ accept: '.csv' }}
              onChange={handleFileSelect}
              fullWidth
            />
            {selectedFile && (
              <Alert severity="success" sx={{ mt: 1 }}>
                Arquivo selecionado: {selectedFile.name}
              </Alert>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          variant="contained" 
          onClick={handleImport}
          disabled={!selectedFile}
        >
          Importar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CSVImportModal;
