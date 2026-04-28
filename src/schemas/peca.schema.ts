export const pecaSchema = {
  type: "object",
  properties: {
    idPeca: { type: "integer" },
    nome: { type: "string" },
    quantidadeEstoque: { type: "integer" },
    precoUnitario: { type: "integer" },
  },
} as const;

export const pecaBodySchema = {
  type: "object",
  required: ["nome", "quantidadeEstoque", "precoUnitario"],
  properties: {
    nome: { type: "string" },
    quantidadeEstoque: { type: "integer" },
    precoUnitario: { type: "integer" },
  },
} as const;

const pecaIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getPecaSchema = {
  schema: {
    tags: ["Pecas"],
    summary: "Lista todas as pecas",
    response: { 200: { type: "array", items: pecaSchema } },
  },
};

export const getPecaByIdSchema = {
  schema: {
    tags: ["Pecas"],
    summary: "Obtem uma peca pelo ID",
    params: pecaIdParamsSchema,
    response: { 200: pecaSchema },
  },
};

export const postPecaSchema = {
  schema: {
    tags: ["Pecas"],
    summary: "Cria uma nova peca",
    body: pecaBodySchema,
    response: { 201: pecaSchema },
  },
};

export const putPecaByIdSchema = {
  schema: {
    tags: ["Pecas"],
    summary: "Atualiza uma peca pelo ID",
    params: pecaIdParamsSchema,
    body: pecaBodySchema,
    response: { 200: pecaSchema },
  },
};

export const deletePecaByIdSchema = {
  schema: {
    tags: ["Pecas"],
    summary: "Exclui uma peca pelo ID",
    params: pecaIdParamsSchema,
    response: { 200: pecaSchema },
  },
};
