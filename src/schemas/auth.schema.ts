const loginBodySchema = {
  type: "object",
  required: ["email", "senha"],
  properties: {
    email: { type: "string" },
    senha: { type: "string" },
  },
} as const;

const loginClienteBodySchema = {
  type: "object",
  required: ["email", "senha"],
  properties: {
    email: { type: "string" },
    senha: { type: "string" },
  },
} as const;

const loginResponseSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
} as const;

const loginResponse = {
  200: loginResponseSchema,
  401: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
} as const;

export const postAuthLoginTecnicoSchema = {
  schema: {
    tags: ["Auth"],
    summary: "Gera token JWT para tecnico por email e senha",
    body: loginBodySchema,
    response: loginResponse,
    security: [],
  },
};

export const postAuthLoginClienteSchema = {
  schema: {
    tags: ["Auth"],
    summary: "Gera token JWT para cliente por email e senha",
    body: loginClienteBodySchema,
    response: loginResponse,
    security: [],
  },
};
