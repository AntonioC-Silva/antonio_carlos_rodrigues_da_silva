import axios from 'axios';

// configura url base da api
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// intercepta requisicoes antes do envio
api.interceptors.request.use((configuracao) => {
    // recupera token do armazenamento
    const token = localStorage.getItem('tokenAcesso');
    
    console.log("Token enviado:", token); 

    // injeta token no cabecalho se existir
    if (token) {
        configuracao.headers.Authorization = `Bearer ${token}`;
    }
    return configuracao;
});

// trata erros 
api.interceptors.response.use(
    (resposta) => resposta,
    (erro) => {
        // verifica se o token expirou ou e invalido
        if (erro.response && erro.response.status === 401) {
            console.warn("Sessão expirada ou token inválido. Redirecionando...");
            
            // limpa dados e forca mandar pro login
            localStorage.removeItem('tokenAcesso');
            localStorage.removeItem('tokenAtualizacao');
            window.location.href = '/login'; 
        }
        return Promise.reject(erro);
    }
);

export default api;