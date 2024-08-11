import { Composer } from 'grammy'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { User } from '#root/bot/models/index.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('start', logHandle('command-start'), (ctx) => {
  handleStart(ctx)
})

feature.callbackQuery('start', logHandle('callback-start'), (ctx) => {
  handleStart(ctx)
})

function handleStart(ctx: Context) {
  const username: string = ctx.from!.username ?? ''
  const user: User = new User(ctx.from!.id)

  user.upsert(ctx.from!.id, username)

  return ctx.reply(ctx.t('welcome'))
}

export { composer as welcomeFeature }
