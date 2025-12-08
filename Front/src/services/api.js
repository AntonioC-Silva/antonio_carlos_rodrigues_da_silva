import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});


api.interceptors.request.use((configuracao) => {
    const token = localStorage.getItem('tokenAcesso');
    

    console.log("Token enviado:", token); 

    if (token) {
        configuracao.headers.Authorization = `Bearer ${token}`;
    }
    return configuracao;
});

// trata erros
api.interceptors.response.use(
    (resposta) => resposta,
    (erro) => {
        // Se o erro for 401 limpa tudo e manda pro login
        if (erro.response && erro.response.status === 401) {
            console.warn("Sessão expirada ou token inválido. Redirecionando...");
            localStorage.removeItem('tokenAcesso');
            localStorage.removeItem('tokenAtualizacao');
            window.location.href = '/login'; // Redireciona forçado para a login
        }
        return Promise.reject(erro);
    }
);

export default api;