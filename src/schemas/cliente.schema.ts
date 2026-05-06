export const clienteSchema = {
  type: "object",
  properties: {
    idCliente: { type: "integer" },
    nome: { type: "string" },
    telefone: { type: "string" },
    email: { type: "string" },
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
