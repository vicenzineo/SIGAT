export const itemPecoOSSchema = {
  type: "object",
  properties: {
    idItemPecaOS: { type: "integer" },
    quantidade: { type: "integer" },
    ordemServicoId: { type: "integer" },
    pecaId: { type: "integer" },
  },
} as const;

export const itemPecoOSBodySchema = {
  type: "object",
  required: ["quantidade", "ordemServicoId", "pecaId"],
  properties: {
    quantidade: { type: "integer" },
    ordemServicoId: { type: "integer" },
    pecaId: { type: "integer" },
  },
} as const;

const itemPecoOSIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getItemPecoOSSchema = {
  schema: {
    tags: ["ItensPecaOS"],
    summary: "Lista todos os itens de peca da OS",
    security: [{ bearerAuth: [] }],
    response: { 200: { type: "array", items: itemPecoOSSchema } },
  },
};

export const getItemPecoOSByIdSchema = {
  schema: {
    tags: ["ItensPecaOS"],
    summary: "Obtem um item de peca da OS pelo ID",
    security: [{ bearerAuth: [] }],
    params: itemPecoOSIdParamsSchema,
    response: { 200: itemPecoOSSchema },
  },
};

export const postItemPecoOSSchema = {
  schema: {
    tags: ["ItensPecaOS"],
    summary: "Cria um novo item de peca da OS",
    security: [{ bearerAuth: [] }],
    body: itemPecoOSBodySchema,
    response: { 201: itemPecoOSSchema },
  },
};

export const putItemPecoOSByIdSchema = {
  schema: {
    tags: ["ItensPecaOS"],
    summary: "Atualiza um item de peca da OS pelo ID",
    security: [{ bearerAuth: [] }],
    params: itemPecoOSIdParamsSchema,
    body: itemPecoOSBodySchema,
    response: { 200: itemPecoOSSchema },
  },
};

export const deleteItemPecoOSByIdSchema = {
  schema: {
    tags: ["ItensPecaOS"],
    summary: "Exclui um item de peca da OS pelo ID",
    security: [{ bearerAuth: [] }],
    params: itemPecoOSIdParamsSchema,
    response: { 200: itemPecoOSSchema },
  },
};
