import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants';
import getPeople from '../api';
import AWS from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
} from 'react-native-aws-cognito-js';

import awsmobile from '../aws-exports';

export init = async function syncCognitoStorage() {
  const userPool = new CognitoUserPool({
    UserPoolId: awsmobile.aws_user_pools_id, // Your user pool id here
    ClientId: awsmobile.aws_user_pools_web_client_id, // Your client id here
  });

  await new Promise((resolve, reject) => userPool.storage.sync((e, r) => (e ? reject(e) : resolve(r))));

  const session = await new Promise(resolve => getSignInUserSession((e, s) => resolve(e ? null : s)));

  console.log('Auth init', !!session);
};
