export const pagamentoSchema = {
  type: "object",
  properties: {
    idPagamento: { type: "integer" },
    valor: { type: "number" },
    dataPagamento: { type: "string", format: "date-time" },
    metodo: { type: "string" },
    status: { type: "string" },
    ordemServicoId: { type: "integer" },
  },
} as const;

export const pagamentoBodySchema = {
  type: "object",
  required: ["valor", "dataPagamento", "metodo", "status", "ordemServicoId"],
  properties: {
    valor: { type: "number" },
    dataPagamento: { type: "string", format: "date-time" },
    metodo: { type: "string" },
    status: { type: "string" },
    ordemServicoId: { type: "integer" },
  },
} as const;

const pagamentoIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getPagamentoSchema = {
  schema: {
    tags: ["Pagamentos"],
    summary: "Lista todos os pagamentos",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: pagamentoSchema } },
  },
};

export const getPagamentoByIdSchema = {
  schema: {
    tags: ["Pagamentos"],
    summary: "Obtem um pagamento pelo ID",
    security: [{ bearerAuth: [] }],
    params: pagamentoIdParamsSchema,
    response: { 200: pagamentoSchema },
  },
};

export const postPagamentoSchema = {
  schema: {
    tags: ["Pagamentos"],
    summary: "Cria um novo pagamento",
    security: [{ bearerAuth: [] }],
    body: pagamentoBodySchema,
    response: { 201: pagamentoSchema },
  },
};

export const putPagamentoByIdSchema = {
  schema: {
    tags: ["Pagamentos"],
    summary: "Atualiza um pagamento pelo ID",
    security: [{ bearerAuth: [] }],
    params: pagamentoIdParamsSchema,
    body: pagamentoBodySchema,
    response: { 200: pagamentoSchema },
  },
};

export const deletePagamentoByIdSchema = {
  schema: {
    tags: ["Pagamentos"],
    summary: "Exclui um pagamento pelo ID",
    security: [{ bearerAuth: [] }],
    params: pagamentoIdParamsSchema,
    response: { 200: pagamentoSchema },
  },
};
