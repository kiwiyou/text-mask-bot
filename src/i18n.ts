import { I18nResolver } from 'i18n-ts'

const en = {
  masker_block: 'Block',
  masker_block_no_space: 'Block, Except Space',
  masker_question: 'Question Mark',
  masker_expunged: 'Data Expunged',
  masker_expunged_replacement: '[DATA EXPUNGED]',
  button_reveal: '👁️ Reveal',
}

const ko = {
  masker_block: '블록',
  masker_block_no_space: '블록 (공백 제외)',
  masker_question: '물음표',
  masker_expunged: '데이터 말소',
  masker_expunged_replacement: `[데이터 말소]`,
  button_reveal: '👁️ 보이기',
}

const i18n = {
  en: en,
  ko: ko,
  default: en,
}

export type I18n = typeof en
export const resolveI18n = (language?: string): I18n => {
  return new I18nResolver(i18n, language).translation
}
export type I18nKey = keyof typeof en
