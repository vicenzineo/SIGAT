export const notificacaoSchema = {
  type: "object",
  properties: {
    idNotificacao: { type: "integer" },
    mensagem: { type: "string" },
    dataEnvio: { type: "string", format: "date-time" },
    tipo: { type: "string" },
    ordemServicoId: { type: "integer" },
  },
} as const;

export const notificacaoBodySchema = {
  type: "object",
  required: ["mensagem", "dataEnvio", "tipo", "ordemServicoId"],
  properties: {
    mensagem: { type: "string" },
    dataEnvio: { type: "string", format: "date-time" },
    tipo: { type: "string" },
    ordemServicoId: { type: "integer" },
  },
} as const;

const notificacaoIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getNotificacaoSchema = {
  schema: {
    tags: ["Notificacoes"],
    summary: "Lista todas as notificacoes",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: notificacaoSchema } },
  },
};

export const getNotificacaoByIdSchema = {
  schema: {
    tags: ["Notificacoes"],
    summary: "Obtem uma notificacao pelo ID",
    security: [{ bearerAuth: [] }],
    params: notificacaoIdParamsSchema,
    response: { 200: notificacaoSchema },
  },
};

export const postNotificacaoSchema = {
  schema: {
    tags: ["Notificacoes"],
    summary: "Cria uma nova notificacao",
    security: [{ bearerAuth: [] }],
    body: notificacaoBodySchema,
    response: { 201: notificacaoSchema },
  },
};

export const putNotificacaoByIdSchema = {
  schema: {
    tags: ["Notificacoes"],
    summary: "Atualiza uma notificacao pelo ID",
    security: [{ bearerAuth: [] }],
    params: notificacaoIdParamsSchema,
    body: notificacaoBodySchema,
    response: { 200: notificacaoSchema },
  },
};

export const deleteNotificacaoByIdSchema = {
  schema: {
    tags: ["Notificacoes"],
    summary: "Exclui uma notificacao pelo ID",
    security: [{ bearerAuth: [] }],
    params: notificacaoIdParamsSchema,
    response: { 200: notificacaoSchema },
  },
};
