import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import {
  Container,
  Title,
  ImportFileContainer,
  Footer,
  UploadMessageContainer,
} from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

interface UploadMessage {
  type: 'success' | 'error';
  message: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [uploadMessage, setUploadMessage] = useState<UploadMessage>();
  // const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    uploadedFiles.map(file => data.append('file', file.file, file.name));

    try {
      await api.post('/transactions/import', data);
      // history.push('/');
      setUploadMessage({
        type: 'success',
        message: 'Importação realizada com sucesso!',
      });
    } catch (err) {
      setUploadMessage({
        type: 'error',
        message: 'Ocorreu um erro, tente novamente mais tarde.',
      });
    }
  }

  function submitFile(files: File[]): void {
    const newFiles: FileProps[] = files.map(file => {
      const fileProp = {
        file,
        name: file.name,
        readableSize: file.size.toString(),
      } as FileProps;

      return fileProp;
    });
    setUploadedFiles(newFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
          {!!uploadMessage && (
            <UploadMessageContainer>
              {uploadMessage.type === 'success' ? (
                <FiCheckCircle size={24} style={{ color: '#188521' }} />
              ) : (
                <FiAlertCircle size={24} style={{ color: '#c21919' }} />
              )}
              <p>{uploadMessage.message}</p>
            </UploadMessageContainer>
          )}
          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
