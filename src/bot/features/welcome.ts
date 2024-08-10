import { Composer } from 'grammy'
import { handle } from 'hono/cloudflare-pages'
import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('start', logHandle('command-start'), (ctx) => {
  handleStart(ctx)
})

feature.callbackQuery('start', logHandle('callback-start'), (ctx) => {
  handleStart(ctx)
})

function handleStart(ctx: Context) {
  return ctx.reply(ctx.t('welcome'))
}

export { composer as welcomeFeature }
