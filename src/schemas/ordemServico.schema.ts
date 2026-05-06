export const ordemServicoSchema = {
  type: "object",
  properties: {
    idOS: { type: "integer" },
    dataAbertura: { type: "string", format: "date-time" },
    status: { type: "string" },
    valorServico: { type: "number" },
    equipamentoId: { type: "integer" },
    tecnicoId: { type: "integer" },
  },
} as const;

export const ordemServicoBodySchema = {
  type: "object",
  required: [
    "dataAbertura",
    "status",
    "valorServico",
    "equipamentoId",
    "tecnicoId",
  ],
  properties: {
    dataAbertura: { type: "string", format: "date-time" },
    status: { type: "string" },
    valorServico: { type: "number" },
    equipamentoId: { type: "integer" },
    tecnicoId: { type: "integer" },
  },
} as const;

const ordemServicoIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getOrdemServicoSchema = {
  schema: {
    tags: ["OrdensServico"],
    summary: "Lista todas as ordens de servico",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: ordemServicoSchema } },
  },
};

export const getOrdemServicoByIdSchema = {
  schema: {
    tags: ["OrdensServico"],
    summary: "Obtem uma ordem de servico pelo ID",
    security: [{ bearerAuth: [] }],
    params: ordemServicoIdParamsSchema,
    response: { 200: ordemServicoSchema },
  },
};

export const postOrdemServicoSchema = {
  schema: {
    tags: ["OrdensServico"],
    summary: "Cria uma nova ordem de servico",
    security: [{ bearerAuth: [] }],
    body: ordemServicoBodySchema,
    response: { 201: ordemServicoSchema },
  },
};

export const putOrdemServicoByIdSchema = {
  schema: {
    tags: ["OrdensServico"],
    summary: "Atualiza uma ordem de servico pelo ID",
    security: [{ bearerAuth: [] }],
    params: ordemServicoIdParamsSchema,
    body: ordemServicoBodySchema,
    response: { 200: ordemServicoSchema },
  },
};

export const deleteOrdemServicoByIdSchema = {
  schema: {
    tags: ["OrdensServico"],
    summary: "Exclui uma ordem de servico pelo ID",
    security: [{ bearerAuth: [] }],
    params: ordemServicoIdParamsSchema,
    response: { 200: ordemServicoSchema },
  },
};
