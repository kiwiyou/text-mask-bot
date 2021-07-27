import { I18n, I18nKey } from '../i18n'

export interface Masker {
  title: I18nKey
  mask: (text: string, language: I18n) => string
}

export const maskerList: Masker[] = [
  {
    title: 'masker_block',
    mask: (text) => text.replaceAll(/./gs, '█'),
  },
  {
    title: 'masker_block_no_space',
    mask: (text) => text.replaceAll(/\S/g, '█'),
  },
  {
    title: 'masker_question',
    mask: () => '❓❓❓',
  },
  {
    title: 'masker_expunged',
    mask: (_, language) => language.masker_expunged_replacement,
  },
]
