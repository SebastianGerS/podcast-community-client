
import { Dispatch } from 'redux';
import * as ActionTypes from './types';
import { Fetch, formatError, Response } from '../../../Helpers/Fetch';
import { atemptSetMessage, SetMessage } from '../../Message';
import { GetSelfSuccess } from '../../Auth';
import { atemptGetSubscriptions, GetSubscriptionsAction } from '../GetSubscriptions';

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
  type: ActionTypes.DELETE_CATEGORY_FAILUR;
}

export const deleteCategoryFailure = (): DeleteCategoryFailure => ({
  type: ActionTypes.DELETE_CATEGORY_FAILUR,
});

export type DeleteCategoryAction = DeleteCategoryStart | DeleteCategorySuccess | DeleteCategoryFailure;

const deleteCategory = (id: string): Promise<Response> => Fetch(`/categories/${id}`, 'DELETE', {});

type AtemptDeleteCategoryAction = (
  dispatch: Dispatch<DeleteCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>
) => Promise<void>;

export const atemptDeleteCategory = (userId: string, categoryId: string): AtemptDeleteCategoryAction => async (
  dispatch: Dispatch<DeleteCategoryAction | SetMessage | GetSubscriptionsAction | GetSelfSuccess>,
): Promise<void> => {
  dispatch(startDeleteCategory());
  const response = await deleteCategory(categoryId).catch(error => error);

  if (response.message === 'Failed to fetch') {
    atemptSetMessage(
      {
        text: 'unable to connect to resource pleas check your internet conection',
        type: 'error',
      },
    )(dispatch);
  }

  if (response.error) {
    dispatch(deleteCategoryFailure());

    atemptSetMessage({ text: formatError(response.error.errmsg), type: 'info' })(dispatch);
  }
  if (response.category) {
    dispatch(catagoryDeleted());
    atemptGetSubscriptions(userId)(dispatch);
  }
};
