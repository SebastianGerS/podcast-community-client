import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

const Rate = ({ rating, setRating }: Props): JSX.Element => (
  <div className="rate">
    <button
      title="1"
      type="button"
      className={`star ${rating > 0 ? 'filld' : 'empty'}`}
      value={1.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      title="2"
      type="button"
      className={`star ${rating > 1 ? 'filld' : 'empty'}`}
      value={2.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      title="3"
      type="button"
      className={`star ${rating > 2 ? 'filld' : 'empty'}`}
      value={3.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      title="4"
      type="button"
      className={`star ${rating > 3 ? 'filld' : 'empty'}`}
      value={4.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      title="5"
      type="button"
      className={`star ${rating > 4 ? 'filld' : 'empty'}`}
      value={5.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
  </div>
);

export default Rate;
