import React, { useEffect } from 'react';

import UserCategory from '../Containers/Subscription/Category';
import { scrollToTop } from '../Helpers/UserAgent';

interface Props {
  params: {
    categoryId: string;
  };
}

function Category({ params }: Props): JSX.Element {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Category">
      <UserCategory categoryId={params.categoryId} />
    </div>
  );
}

export default Category;
