class Cliente {
    constructor(
        private idClient: number,
        private nome: string,
        private telefone: string,
        private email: string,
        private equipamentos: Equipamento[]
    ) {}

}

class Equipamento{
    constructor(
        private idEquipamento: number,
        private tipo: string,
        private marca: string,
        private modelo: string,
        private numeroSerie: string,
        private defeitoRelatado: string,
        private cliente: Cliente,
        private ordensServico: OrdemServico[]
    ) {}
}

class Pagamento{
    constructor(
        private idPagamento: number,
        private valor: number,
        private dataPagamento: Date,
        private metodo: string,
        private status: string,
        private ordemServico: OrdemServico
    ) {}
}

class OrdemServico{
    constructor(
        private idOS: number,
        private dataAbertura: Date,
        private status: string,
        private valorServico: number,
        private equipamento: Equipamento,
        private servicos: Servico[],
        private itensPecasOS: ItemPecaOS[] = [],
        private notificacoes: Notificacao[],
        private tecnico: Tecnico,
        private diagnosticos: Diagnostico[] = [],
        private pagamento?: Pagamento
    ) {}
}

class Notificacao{
    constructor(
        private idNotificacao: number,
        private mensagem: string,
        private dataEnvio: Date,
        private tipo: string,
        private ordemServico: OrdemServico
    ) {}
}

class Tecnico{
    constructor(
        private idTecnico: number,
        private nome: string,
        private especialidade: string,
        private telefone: string,
        private ordensServicos: OrdemServico[]
    ) {}
}

class Servico{
    constructor(
        private idServico: number,
        private descricao: string,
        private valorBase: number
    ) {}
}

class Diagnostico{
    constructor(
        private idDiagnostico: number,
        private descricao: string,
        private dataRegistro: Date,
    ) {}
}

class ItemPecaOS {
    constructor(
        private idItemPecaOS: number,
        private quantidade: number,
        private subtotal: number,
        private peca: Peca
    ) {}
}

class Peca{
    constructor(
        private idPeca: number,
        private nome: string,
        private quantidadeEstoque: number,
        private precoUnitario: number,
        private itensPecasOS: ItemPecaOS[]
    ) {}
}