
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { GetSelfSuccess } from '../../Auth';
import { atemptGetSubscriptions, GetSubscriptionsAction } from '../GetSubscriptions';

interface UpdateCategoryStart {
  type: ActionTypes.UPDATE_CATEGORY_START;
}

export const startUpdateCategory = (): UpdateCategoryStart => ({
  type: ActionTypes.UPDATE_CATEGORY_START,
});

interface UpdateCategorySuccess {
  type: ActionTypes.UPDATE_CATEGORY_SUCCESS;
}

export const catagoryUpdated = (): UpdateCategorySuccess => ({
  type: ActionTypes.UPDATE_CATEGORY_SUCCESS,
});

interface UpdateCategoryFailure {
  type: ActionTypes.UPDATE_CATEGORY_FAILUR;
}

export const updateCategoryFailure = (): UpdateCategoryFailure => ({
  type: ActionTypes.UPDATE_CATEGORY_FAILUR,
});

export type UpdateCategoryAction = UpdateCategoryStart | UpdateCategorySuccess | UpdateCategoryFailure;

const updateCategory = (id: string, body: object): Promise<Response> => Fetch(`/categories/${id}`, 'PUT', body);

export interface UpdateCategory {
  userId: string;
  categoryId: string;
  body: object;
}

type AtemptUpdateCategoryAction = (
  dispatch: Dispatch<UpdateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const atemptUpdateCategory = (
  { userId, categoryId, body }: UpdateCategory,
): AtemptUpdateCategoryAction => async (
  dispatch: Dispatch<UpdateCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startUpdateCategory());
  const response = await updateCategory(categoryId, body).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(updateCategoryFailure());

    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryUpdated());
    atemptGetSubscriptions(userId)(dispatch);
  }
};
