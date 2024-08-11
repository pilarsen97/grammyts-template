import { chatAction } from '@grammyjs/auto-chat-action'
import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { isAdmin } from '#root/bot/filters/is-admin.js'
import { setCommandsHandler } from '#root/bot/handlers/commands/setcommands.js'
import { logHandle } from '#root/bot/helpers/logging.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private').filter(ctx => isAdmin(ctx.config.botAdmins)(ctx))

feature.command(
  'setcommands',
  logHandle('command-setcommands'),
  chatAction('typing'),
  setCommandsHandler,
)

feature.on(':photo', logHandle('data-photo'), async (ctx) => {
  const photoArray = ctx.message?.photo
  if (photoArray) {
    const photoOriginal = photoArray.at(-1)
    await ctx.reply(`Photo id: <pre>${photoOriginal?.file_id}</pre>`, {
      reply_parameters: {
        message_id: ctx.msg.message_id,
      },
    })
  }
})

feature.on(':video', logHandle('data-video'), async (ctx) => {
  await ctx.reply(`Video id: <pre>${ctx.message?.video?.file_id}</pre>`, {
    reply_parameters: {
      message_id: ctx.msg.message_id,
    },
  })
})

feature.on(':voice', logHandle('data-voice'), async (ctx) => {
  await ctx.reply(`Voice id: <pre>${ctx.message?.voice?.file_id}</pre>`, {
    reply_parameters: {
      message_id: ctx.msg.message_id,
    },
  })
})

export { composer as adminFeature }
