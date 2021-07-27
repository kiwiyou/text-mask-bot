export const getPlaintext = async (id: string): Promise<string | null> => {
  return MASKED_TEXT.get(id)
}

export const setPlaintext = async (id: string, text: string) => {
  return MASKED_TEXT.put(id, text, {
    expirationTtl: 7 * 24 * 60 * 60,
  })
}
