import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 10, // Número de usuários virtuais simulados que irei usar para testar a performance da API
    duration: '30s',
};

export default function () {
    // Adapte a URL conforme necessário, neste caso está a API que montei...
    let apiUrl = 'http://localhost:3000/clientes';

    // Criar um novo Cliente na API
    let payload = JSON.stringify({
        nome: 'Cliente01',
        cpf: '010.101.212-00',
        agencia: '4321',
        conta: '01010-0',
        nomeBanco: 'BankPersonal'
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response = http.post(apiUrl, payload, params);

    // Verificar se a proposta foi bem-sucedida (código 201)
    check(response, {
        'Criar Cliente - status 201': (r) => r.status === 201,
    });

    // Aguardar por 1 segundo entre as operações
    sleep(1);
}