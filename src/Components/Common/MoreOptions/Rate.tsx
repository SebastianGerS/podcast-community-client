import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

const Rate = ({ rating, setRating }: Props): JSX.Element => (
  <div className="rate">
    <button
      type="button"
      className={`star ${rating > 0 ? 'filld' : 'empty'}`}
      value={1.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      type="button"
      className={`star ${rating > 1 ? 'filld' : 'empty'}`}
      value={2.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      type="button"
      className={`star ${rating > 2 ? 'filld' : 'empty'}`}
      value={3.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      type="button"
      className={`star ${rating > 3 ? 'filld' : 'empty'}`}
      value={4.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
    <button
      type="button"
      className={`star ${rating > 4 ? 'filld' : 'empty'}`}
      value={5.0}
      onClick={e => setRating(+e.currentTarget.value)}
    />
  </div>
);

export default Rate;
