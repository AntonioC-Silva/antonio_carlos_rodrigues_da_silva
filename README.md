# Sense - Plataforma de Monitorização de sensores

**Sense** é uma aplicação web desenvolvida com o objetivo de centralizar a gestão de dispositivos IoT em ambientes urbanos e industriais. A plataforma permite que os usuários monitorem sensores em tempo real, visualizem detalhes técnicos e analisem o histórico de medições.

---

## Passo a Passo para Instalação e Execução

### 1. Abrir o Projeto no VS Code

1. Baixe ou clone este repositório no seu computador.
2. Abra o **VS Code**.
3. Vá ao menu **File > Open Folder...** (Ficheiro > Abrir Pasta) e selecione a pasta raiz do projeto.
4. Abra o terminal integrado do VS Code:
   * No menu superior, clique em **Terminal > New Terminal**.
   * Ou utilize o atalho `Ctrl + J`.

### 2. Executando o Backend (API)

No terminal do VS Code (certifique-se de estar na raiz do projeto), execute os comandos:
**Execute Linha por Linha**

1. Entre na pasta do servidor:
   ```bash
   cd back
   cd smartcity
2. Criando venv e ativando (Ambiente onde baixaremos as biliotecas necessárias).
   ```bash
   py -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
3. Iniciando Servidor.
   ```bash
    py manage.py runserver
   
### 3. Executando o Frontend

 Servidor rodando Agora vamos para o Front, na lateral direita na parte de cima do terminal clique no mais para abrir outro terminal.
 Nesse terminal iremos executar os seguintes comandos:

 1. Entre na pasta do Front:
    ```bash
    cd front
  2. Baixe o gerenciador de pacotes Node Modules.
     ```bash
     npm i
  3. Execute o Frontend.
     ```bash
     npm run dev
  4. no terminal será visivel uma URL Clique nela segurando o Ctrl do seu teclado ou acesse http://localhost:5173/

### 5. Credenciais
  1. Para logar use Usuário: `senai` Senha: `123` 
