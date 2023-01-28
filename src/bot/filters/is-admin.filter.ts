import { Role } from "@prisma/client";
import { Context } from "~/bot/types";
import { ContextScopeWith } from "~/bot/types/context";

export const isAdminUser = <C extends Context>(
  ctx: C
): ctx is C & ContextScopeWith<"user"> => {
  return ctx.scope.user?.role === Role.ADMIN;
};
