export const compiledMessage = (templateString: string, templateVariables) =>
  templateString.replace(/{(.*?)}/g, (_, g) => templateVariables[g]);
