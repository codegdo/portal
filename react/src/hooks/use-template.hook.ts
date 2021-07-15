import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

import { mainExternal, mainGeneral, mainInternal } from '../layouts';

export const useTemplate = (name: string): { template: string, fallback: string } => {
  const { layout: { external, internal, general }, session: { loggedIn, user, orgId } } = useSelector((state: AppState) => state);
  document.getElementById('placholder')?.remove();
  const fallback = document.getElementById('root')?.innerHTML.trim() || '';
  let template = `<Content {...props} />`;

  if (loggedIn && orgId) {
    if (user?.roletype === 'internal') {
      template = internal[name] || internal['main'] || mainInternal;
    } else {
      template = external[name] || external['main'] || mainExternal;
    }
  } else {
    template = general[name] || general['main'] || mainGeneral;
  }

  return { template, fallback };
}