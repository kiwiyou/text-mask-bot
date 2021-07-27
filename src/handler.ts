import { Markup, Telegraf } from 'telegraf'
import { InlineQueryResult } from 'telegraf/typings/telegram-types'
import { v4 } from 'uuid'
import { maskerList } from './masker'
import { resolveI18n } from './i18n'
import { getPlaintext, setPlaintext } from './db'

const bot = new Telegraf(BOT_TOKEN)

const DESCRIPTION_OVERFLOW = 30
bot
  .on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    if (inlineQuery!.query.length === 0) {
      return true
    }
    const i18n = resolveI18n(inlineQuery!.from.language_code)
    const keyboard = Markup.inlineKeyboard([
      Markup.callbackButton(i18n.button_reveal, 'dummy'),
    ])
    const results: InlineQueryResult[] = maskerList.map((masker, i) => {
      const text = masker.mask(inlineQuery!.query, i18n)
      const description = text.slice(0, DESCRIPTION_OVERFLOW)
      return {
        type: 'article',
        id: i + '_' + v4(),
        title: i18n[masker.title],
        description,
        input_message_content: {
          message_text: text,
        },
        reply_markup: keyboard,
      }
    })
    return answerInlineQuery(results)
  })
  .on('chosen_inline_result', async ({ chosenInlineResult }) => {
    const { query, inline_message_id } = chosenInlineResult!
    if (inline_message_id) {
      await setPlaintext(inline_message_id, query)
    }
  })
  .on('callback_query', async ({ callbackQuery, answerCbQuery }) => {
    const { inline_message_id } = callbackQuery!
    if (inline_message_id) {
      const text = await getPlaintext(inline_message_id)
      if (text) {
        return answerCbQuery(text, true)
      }
    }
  })

export default bot
