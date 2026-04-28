export const tecnicoSchema = {
  type: "object",
  properties: {
    idTecnico: { type: "integer" },
    nome: { type: "string" },
    especialidade: { type: "string" },
    telefone: { type: "string" },
  },
} as const;

export const tecnicoBodySchema = {
  type: "object",
  required: ["nome", "especialidade", "telefone"],
  properties: {
    nome: { type: "string" },
    especialidade: { type: "string" },
    telefone: { type: "string" },
  },
} as const;

const tecnicoIdParamsSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
} as const;

export const getTecnicoSchema = {
  schema: {
    tags: ["Tecnicos"],
    summary: "Lista todos os tecnicos",
    response: { 200: { type: "array", items: tecnicoSchema } },
  },
};

export const getTecnicoByIdSchema = {
  schema: {
    tags: ["Tecnicos"],
    summary: "Obtem um tecnico pelo ID",
    params: tecnicoIdParamsSchema,
    response: { 200: tecnicoSchema },
  },
};

export const postTecnicoSchema = {
  schema: {
    tags: ["Tecnicos"],
    summary: "Cria um novo tecnico",
    body: tecnicoBodySchema,
    response: { 201: tecnicoSchema },
  },
};

export const putTecnicoByIdSchema = {
  schema: {
    tags: ["Tecnicos"],
    summary: "Atualiza um tecnico pelo ID",
    params: tecnicoIdParamsSchema,
    body: tecnicoBodySchema,
    response: { 200: tecnicoSchema },
  },
};

export const deleteTecnicoByIdSchema = {
  schema: {
    tags: ["Tecnicos"],
    summary: "Exclui um tecnico pelo ID",
    params: tecnicoIdParamsSchema,
    response: { 200: tecnicoSchema },
  },
};
