function conflictError(entity) {
    return {
        type: "conflict",
        message: `Esse ${entity} já foi cadastrado!`
    }
}

function invalidStockError() {
    return {
        type: "invalidStock",
        message: "Não há disponibilidade em estoque."
    };
}

function invalidError(entity) {
    return {
        type: "invalidId",
        message: `${entity} não existe!`
    };
}

function rentNotFinalizedError() {
    return {
        type: "RentNotFinalized",
        message: "O aluguel ainda não foi finalizado!"
    };
}

const errors = {
    invalidError,
    rentNotFinalizedError,
    invalidStockError,
    conflictError
}

export default errors;