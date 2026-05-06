export const equipamentoSchema = {
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

export const equipamentoBodySchema = {
  type: "object",
  required: [
    "tipo",
    "marca",
    "modelo",
    "numeroSerie",
    "defeitoRelatado",
    "clienteId",
  ],
  properties: {
    tipo: { type: "string" },
    marca: { type: "string" },
    modelo: { type: "string" },
    numeroSerie: { type: "string" },
    defeitoRelatado: { type: "string" },
    clienteId: { type: "integer" },
  },
} as const;

const equipamentoIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getEquipamentoSchema = {
  schema: {
    tags: ["Equipamentos"],
    summary: "Lista todos os equipamentos",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: equipamentoSchema } },
  },
};

export const getEquipamentoByIdSchema = {
  schema: {
    tags: ["Equipamentos"],
    summary: "Obtem um equipamento pelo ID",
    security: [{ bearerAuth: [] }],
    params: equipamentoIdParamsSchema,
    response: { 200: equipamentoSchema },
  },
};

export const postEquipamentoSchema = {
  schema: {
    tags: ["Equipamentos"],
    summary: "Cria um novo equipamento",
    security: [{ bearerAuth: [] }],
    body: equipamentoBodySchema,
    response: { 201: equipamentoSchema },
  },
};

export const putEquipamentoByIdSchema = {
  schema: {
    tags: ["Equipamentos"],
    summary: "Atualiza um equipamento pelo ID",
    security: [{ bearerAuth: [] }],
    params: equipamentoIdParamsSchema,
    body: equipamentoBodySchema,
    response: { 200: equipamentoSchema },
  },
};

export const deleteEquipamentoByIdSchema = {
  schema: {
    tags: ["Equipamentos"],
    summary: "Exclui um equipamento pelo ID",
    security: [{ bearerAuth: [] }],
    params: equipamentoIdParamsSchema,
    response: { 200: equipamentoSchema },
  },
};
