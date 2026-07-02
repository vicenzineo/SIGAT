import type { FastifyReply, FastifyRequest } from "fastify";

type UserRole = "cliente" | "tecnico";

type JwtPayload = {
  tipo?: unknown;
  idCliente?: unknown;
  idTecnico?: unknown;
};

const getJwtPayload = (request: FastifyRequest): JwtPayload => {
  return (request.user ?? {}) as JwtPayload;
};

export const getAuthenticatedRole = (request: FastifyRequest): UserRole | null => {
  const role = getJwtPayload(request).tipo;
  return role === "cliente" || role === "tecnico" ? role : null;
};

export const getAuthenticatedClienteId = (request: FastifyRequest): number | null => {
  const value = getJwtPayload(request).idCliente;
  return typeof value === "number" ? value : null;
};

export const requireRole = (role: UserRole) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const currentRole = getAuthenticatedRole(request);
    if (currentRole !== role) {
      return reply.status(403).send({ message: "Acesso negado para este perfil" });
    }
  };
};
