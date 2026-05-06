export const diagnosticoSchema = {
  type: "object",
  properties: {
    idDiagnostico: { type: "integer" },
    descricao: { type: "string" },
    dataRegistro: { type: "string", format: "date-time" },
    ordemServicoId: { type: "integer" },
  },
} as const;

export const diagnosticoBodySchema = {
  type: "object",
  required: ["descricao", "dataRegistro", "ordemServicoId"],
  properties: {
    descricao: { type: "string" },
    dataRegistro: { type: "string", format: "date-time" },
    ordemServicoId: { type: "integer" },
  },
} as const;

const diagnosticoIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getDiagnosticoSchema = {
  schema: {
    tags: ["Diagnosticos"],
    summary: "Lista todos os diagnosticos",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: diagnosticoSchema } },
  },
};

export const getDiagnosticoByIdSchema = {
  schema: {
    tags: ["Diagnosticos"],
    summary: "Obtem um diagnostico pelo ID",
    security: [{ bearerAuth: [] }],
    params: diagnosticoIdParamsSchema,
    response: { 200: diagnosticoSchema },
  },
};

export const postDiagnosticoSchema = {
  schema: {
    tags: ["Diagnosticos"],
    summary: "Cria um novo diagnostico",
    security: [{ bearerAuth: [] }],
    body: diagnosticoBodySchema,
    response: { 201: diagnosticoSchema },
  },
};

export const putDiagnosticoByIdSchema = {
  schema: {
    tags: ["Diagnosticos"],
    summary: "Atualiza um diagnostico pelo ID",
    security: [{ bearerAuth: [] }],
    params: diagnosticoIdParamsSchema,
    body: diagnosticoBodySchema,
    response: { 200: diagnosticoSchema },
  },
};

export const deleteDiagnosticoByIdSchema = {
  schema: {
    tags: ["Diagnosticos"],
    summary: "Exclui um diagnostico pelo ID",
    security: [{ bearerAuth: [] }],
    params: diagnosticoIdParamsSchema,
    response: { 200: diagnosticoSchema },
  },
};
