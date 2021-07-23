import { stringComponentReplace } from "./string-component-replace.util";
import { stringDomReplace } from "./string-dom-replace.util";

export const stringTemplateReplace = (template: string): string => {
  template = stringDomReplace(template);
  template = stringComponentReplace(template);

  return template;
};
