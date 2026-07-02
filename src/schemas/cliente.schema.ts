export const clienteSchema = {
  type: "object",
  properties: {
    idCliente: { type: "integer" },
    nome: { type: "string" },
    telefone: { type: "string" },
    email: { type: "string" },
  },
} as const;

const equipamentoSchema = {
  type: "object",
  properties: {
    idEquipamento: { type: "integer" },
    tipo: { type: "string" },
    marca: { type: "string" },
    modelo: { type: "string" },
    numeroSerie: { type: "string" },
    defeitoRelatado: { type: "string" },
    clienteId: { type: "integer" },
  },
} as const;

const ordemServicoSchema = {
  type: "object",
  properties: {
    idOS: { type: "integer" },
    dataAbertura: { type: "string" },
    status: { type: "string" },
    valorServico: { type: "number" },
    equipamentoId: { type: "integer" },
    tecnicoId: { type: "integer" },
  },
} as const;

export const clienteBodySchema = {
  type: "object",
  required: ["nome", "telefone", "email", "senha"],
  properties: {
    nome: { type: "string" },
    telefone: { type: "string" },
    email: { type: "string" },
    senha: { type: "string" },
  },
} as const;

const clienteIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getClienteSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Lista todos os clientes",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: clienteSchema } },
  },
};

export const getClienteByIdSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Obtem um cliente pelo ID",
    security: [{ bearerAuth: [] }],
    params: clienteIdParamsSchema,
    response: { 200: clienteSchema },
  },
};

export const postClienteSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Cria um novo cliente",
    security: [{ bearerAuth: [] }],
    body: clienteBodySchema,
    response: { 201: clienteSchema },
  },
};

export const putClienteByIdSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Atualiza um cliente pelo ID",
    security: [{ bearerAuth: [] }],
    params: clienteIdParamsSchema,
    body: clienteBodySchema,
    response: { 200: clienteSchema },
  },
};

export const deleteClienteByIdSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Exclui um cliente pelo ID",
    security: [{ bearerAuth: [] }],
    params: clienteIdParamsSchema,
    response: { 200: clienteSchema },
  },
};

export const getClienteMeSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Obtem os dados do cliente autenticado",
    security: [{ bearerAuth: [] }],
    response: { 200: clienteSchema },
  },
};

export const putClienteMeSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Atualiza os dados do cliente autenticado",
    security: [{ bearerAuth: [] }],
    body: {
      type: "object",
      required: ["nome", "telefone", "email"],
      properties: {
        nome: { type: "string" },
        telefone: { type: "string" },
        email: { type: "string" },
        senha: { type: "string" },
      },
    },
    response: { 200: clienteSchema },
  },
};

export const getClienteMeEquipamentosSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Lista equipamentos do cliente autenticado",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: equipamentoSchema } },
  },
};

export const getClienteMeOrdemServicoSchema = {
  schema: {
    tags: ["Clientes"],
    summary: "Lista ordens de servico do cliente autenticado",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: ordemServicoSchema } },
  },
};
