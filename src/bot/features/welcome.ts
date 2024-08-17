import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle } from "#root/bot/helpers/logging.js";
import { prisma } from "#root/prisma/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), async (ctx) => {
  const userId: number = ctx.from.id;
  const userName: string = ctx.from.username ?? "";

  await prisma.user.upsert({
    where: {
      telegramId: userId,
    },
    update: {
      updatedAt: new Date(),
      username: userName,
    },
    create: {
      telegramId: userId,
      username: userName,
    },
  });

  await ctx.reply(`welcome @${userName || "USER"}`);
});

export { composer as welcomeFeature };
