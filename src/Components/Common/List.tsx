import React, { ComponentType } from 'react';
import uuid from 'uuid';
import { Episode } from '../../Models/Episode';
import { Podcast } from '../../Models/Podcast';
import { User } from '../../Models/User';
import { Category } from '../../Models/Category';
import { Notification } from '../../Models/Notification';

type ListItem = Episode | Podcast | User | Category | Notification;
interface ListItemProps {
  data: ListItem;
}

interface Props<T> {
  component: ComponentType<ListItemProps | T>;
  data: ListItem[];
  props?: T;
}

const List = <T extends object>({ component: Component, data, ...props }: Props<T>): JSX.Element => (
  <div className="list">
    {data.map((elementData: ListItem) => <Component data={elementData} key={uuid.v4()} {...props as T} />)}
  </div>
);

export default List;
