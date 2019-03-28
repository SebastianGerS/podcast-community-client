
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { attemptSetMessage, SetMessage } from '../../Message';
import { GetSelfSuccess } from '../../Auth';
import { attemptGetSubscriptions, GetSubscriptionsAction } from '../GetSubscriptions';

interface DeleteCategoryStart {
  type: ActionTypes.DELETE_CATEGORY_START;
}

export const startDeleteCategory = (): DeleteCategoryStart => ({
  type: ActionTypes.DELETE_CATEGORY_START,
});

interface DeleteCategorySuccess {
  type: ActionTypes.DELETE_CATEGORY_SUCCESS;
}

export const catagoryDeleted = (): DeleteCategorySuccess => ({
  type: ActionTypes.DELETE_CATEGORY_SUCCESS,
});

interface DeleteCategoryFailure {
  type: ActionTypes.DELETE_CATEGORY_FAILURE;
}

export const deleteCategoryFailure = (): DeleteCategoryFailure => ({
  type: ActionTypes.DELETE_CATEGORY_FAILURE,
});

export type DeleteCategoryAction = DeleteCategoryStart | DeleteCategorySuccess | DeleteCategoryFailure;

const deleteCategory = (id: string): Promise<Response> => Fetch(`/categories/${id}`, 'DELETE', {});

type AttemptDeleteCategoryAction = (
  dispatch: Dispatch<DeleteCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const attemptDeleteCategory = (userId: string, categoryId: string): AttemptDeleteCategoryAction => async (
  dispatch: Dispatch<DeleteCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startDeleteCategory());
  const response = await deleteCategory(categoryId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    attemptSetMessage(
      {
        text: 'Unable to connect to the Thru the Ether Api at this time',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(deleteCategoryFailure());

    attemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryDeleted());
    attemptGetSubscriptions(userId)(dispatch);
  }
};
