import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

import { defaultExternal, defaultGeneral, defaultInternal } from '../layouts';
import { stringComponentReplace, stringDomReplace, stringVarReplace } from '../utils';

export const useTemplate = (program: string, page: string): { template: string, fallback: string } => {
  const { layout: { external, internal, general }, session: { loggedIn, user, orgId } } = useSelector((state: AppState) => state);
  document.getElementById('placholder')?.remove();
  const fallback = document.getElementById('root')?.innerHTML.trim() || '';
  let template = `<Content {...props} />`;

  console.log('PROGRAM', program);
  console.log('PAGE', page);

  if (loggedIn && orgId) {
    if (user?.roletype === 'internal') {
      template = internal[page] || internal['main'] || defaultInternal;
    } else {
      template = external[page] || external['main'] || defaultExternal;
    }
  } else {
    template = general[page] || general['main'] || defaultGeneral;
  }

  //template = stringDomReplace(template);
  template = stringVarReplace(template, { program });
  //template = stringComponentReplace(template);

  return { template, fallback };
}