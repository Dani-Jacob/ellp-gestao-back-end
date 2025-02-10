class ValidationError extends Error {
    constructor(status, details = []) {
        // Chama o construtor da classe Error com uma mensagem padrão
        super('Erro de validação');

        this.status = status;  // O código de status HTTP (por exemplo, 400)
        this.details = details;  // Array de detalhes de validação (pode ser uma lista de campos ou erros)
        this.name = this.constructor.name;  // O nome da classe para identificação do erro

    }
}

export default ValidationError;
