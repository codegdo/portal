import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

export const useAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
