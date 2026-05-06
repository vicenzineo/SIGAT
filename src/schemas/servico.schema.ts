export const servicoSchema = {
  type: "object",
  properties: {
    idServico: { type: "integer" },
    descricao: { type: "string" },
    valorBase: { type: "integer" },
    ordemServicoId: { type: "integer" },
  },
} as const;

export const servicoBodySchema = {
  type: "object",
  required: ["descricao", "valorBase", "ordemServicoId"],
  properties: {
    descricao: { type: "string" },
    valorBase: { type: "integer" },
    ordemServicoId: { type: "integer" },
  },
} as const;

const servicoIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getServicoSchema = {
  schema: {
    tags: ["Servicos"],
    summary: "Lista todos os servicos",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: servicoSchema } },
  },
};

export const getServicoByIdSchema = {
  schema: {
    tags: ["Servicos"],
    summary: "Obtem um servico pelo ID",
    security: [{ bearerAuth: [] }],
    params: servicoIdParamsSchema,
    response: { 200: servicoSchema },
  },
};

export const postServicoSchema = {
  schema: {
    tags: ["Servicos"],
    summary: "Cria um novo servico",
    security: [{ bearerAuth: [] }],
    body: servicoBodySchema,
    response: { 201: servicoSchema },
  },
};

export const putServicoByIdSchema = {
  schema: {
    tags: ["Servicos"],
    summary: "Atualiza um servico pelo ID",
    security: [{ bearerAuth: [] }],
    params: servicoIdParamsSchema,
    body: servicoBodySchema,
    response: { 200: servicoSchema },
  },
};

export const deleteServicoByIdSchema = {
  schema: {
    tags: ["Servicos"],
    summary: "Exclui um servico pelo ID",
    security: [{ bearerAuth: [] }],
    params: servicoIdParamsSchema,
    response: { 200: servicoSchema },
  },
};
