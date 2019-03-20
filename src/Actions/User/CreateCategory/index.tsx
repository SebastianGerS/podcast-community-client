
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { GetSelfSuccess } from '../../Auth';
import { atemptGetSubscriptions, GetSubscriptionsAction } from '../GetSubscriptions';

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
  type: ActionTypes.CREATE_CATEGORY_FAILUR;
}

export const createCategoryFailure = (): CreateCategoryFailure => ({
  type: ActionTypes.CREATE_CATEGORY_FAILUR,
});

export type CreateCategoryAction = CreateCategoryStart | CreateCategorySuccess | CreateCategoryFailure;

const createCategory = (body: object): Promise<Response> => Fetch('/categories', 'POST', body);

export interface CategoryData {
  name: string;
  userId: string;
}

type AtemptCreateCategoryAction = (
  dispatch: Dispatch<CreateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const atemptCreateCategory = ({ name, userId }: CategoryData): AtemptCreateCategoryAction => async (
  dispatch: Dispatch<CreateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startCreateCategory());
  const response = await createCategory({ name }).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(createCategoryFailure());

    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryCreated());

    atemptGetSubscriptions(userId)(dispatch);
  }
};
