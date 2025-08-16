import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { config } from '../config/environment';

interface UploadImageModalProps {
  open: boolean;
  onClose: () => void;
  productId: number;
  onSuccess?: () => void;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({ open, onClose, productId, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Selecione uma imagem para enviar.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const token = localStorage.getItem(config.AUTH.TOKEN_KEY);
      const response = await fetch(`${config.API_BASE_URL}/products/upload_image/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': token || '',
        },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1200);
      } else {
        setError(data.message || 'Erro ao enviar imagem.');
      }
    } catch (err) {
      setError('Erro ao enviar imagem.');
    } finally {
      setLoading(false);
    }
  };

  // URL da imagem atual do produto, com cache bust
  const imageUrl = `${config.API_BASE_URL}/products/image/${productId}?t=${Date.now()}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Alterar Imagem do Produto</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Imagem ampliada do produto */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img
              src={imageUrl}
              alt="Imagem atual do produto"
              style={{ maxWidth: '100%', maxHeight: 250, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            />
          </Box>
          <Button
            variant="outlined"
            component="label"
            disabled={loading}
          >
            Selecionar Imagem
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Typography variant="body2">Arquivo selecionado: {selectedFile.name}</Typography>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Imagem enviada com sucesso!</Alert>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleUpload} variant="contained" disabled={loading || !selectedFile}>
          {loading ? <CircularProgress size={22} /> : 'Enviar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadImageModal;
