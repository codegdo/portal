import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../../store/types';
import { updateSession } from '../../../store/actions';

const LoginComponent: React.FC = (): JSX.Element => {
  const loggedIn = useSelector((state: AppState) => state.session.loggedIn);
  const dispatch = useDispatch();

  return loggedIn ? (
    <Redirect to="/" />
  ) : (
      <>
        <div>
          LOGIN HELLO
        <button
            onClick={() =>
              dispatch(updateSession({ loggedIn: true, user: { name: 'cmr' } }))
            }
          >
            login
        </button>
        </div>
      </>
    );
};

export default LoginComponent;
