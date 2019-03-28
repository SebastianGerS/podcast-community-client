
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { GetSelfSuccess } from '../../Auth';
import { attemptGetSubscriptions, GetSubscriptionsAction } from '../GetSubscriptions';

interface CreateCategoryStart {
  type: ActionTypes.CREATE_CATEGORY_START;
}

export const startCreateCategory = (): CreateCategoryStart => ({
  type: ActionTypes.CREATE_CATEGORY_START,
});

interface CreateCategorySuccess {
  type: ActionTypes.CREATE_CATEGORY_SUCCESS;
}

export const catagoryCreated = (): CreateCategorySuccess => ({
  type: ActionTypes.CREATE_CATEGORY_SUCCESS,
});

interface CreateCategoryFailure {
  type: ActionTypes.CREATE_CATEGORY_FAILURE;
}

export const createCategoryFailure = (): CreateCategoryFailure => ({
  type: ActionTypes.CREATE_CATEGORY_FAILURE,
});

export type CreateCategoryAction = CreateCategoryStart | CreateCategorySuccess | CreateCategoryFailure;

const createCategory = (body: object): Promise<Response> => Fetch('/categories', 'POST', body);

export interface CategoryData {
  name: string;
  userId: string;
}

type AttemptCreateCategoryAction = (
  dispatch: Dispatch<CreateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const attemptCreateCategory = ({ name, userId }: CategoryData): AttemptCreateCategoryAction => async (
  dispatch: Dispatch<CreateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startCreateCategory());
  const response = await createCategory({ name }).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(createCategoryFailure());

    attemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryCreated());

    attemptGetSubscriptions(userId)(dispatch);
  }
};
