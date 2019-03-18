import React, {
  useState, useEffect, DragEvent, TouchEvent,
} from 'react';
import { getStartingPoint, getSecondsPerPixel } from '../../Helpers/UserAgent';
import { formatTime, getSecondsFromTimeString } from '../../Helpers/Time';
import { Episode } from '../../Models/Episode';

interface Props {
  getDuration: () => number;
  pos: number;
  seek: (time?: number) => void;
  episode: Episode;
}

function ProgressBar({
  getDuration, seek, pos, episode,
}: Props): JSX.Element {
  const [isDraging, setIsDraging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);

  useEffect(() => {
    if (isDraging) {
      setIsDraging(false);
    }
  }, [pos]);

  const duration = typeof getDuration() === 'number' ? getDuration() : getSecondsFromTimeString(
    typeof episode.audio_length === 'string' ? episode.audio_length : '0:0:0',
  );
  let precent;

  if (isDraging) {
    precent = dragPosition && duration ? (dragPosition / duration) * 100 : 0;
  } else {
    precent = pos && duration ? (pos / duration) * 100 : 0;
  }

  const style = {
    width: `${precent > 100 ? 100 : precent}%`,
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    const newPosition = ((e.clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    seek(newPosition);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    if (!isDraging) {
      setIsDraging(true);
    }

    const newPosition = ((e.clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    setDragPosition(newPosition);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>): void => {
    const { clientX } = e.changedTouches[0];
    const newPosition = ((clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    seek(newPosition);
  };

  const handleTouch = (e: TouchEvent<HTMLDivElement>): void => {
    if (!isDraging) {
      setIsDraging(true);
    }
    const { clientX } = e.changedTouches[0];
    const newPosition = ((clientX - getStartingPoint()) * getSecondsPerPixel(duration));

    setDragPosition(newPosition);
  };

  return (
    <div className="progress-bar">
      <div className="info">
        <p>{typeof pos === 'number' ? formatTime(pos) : formatTime(0)}</p>
        <p>{`- ${typeof pos === 'number' ? formatTime(duration - pos) : formatTime(duration)}`}</p>
      </div>
      <div className="bar">
        <div className="start" />
        <div className="line">
          <div className="progress" style={style} onDragEnd={e => handleDragEnd(e)}>
            <div
              draggable
              className="marker"
              onDragEnd={handleDragEnd}
              onTouchEnd={handleTouchEnd}
              onDrag={handleDrag}
              onTouchMove={handleTouch}
            />
          </div>
        </div>
        <div className="end" style={precent >= 100 ? { backgroundColor: '#FEF6F6' } : {}} />
      </div>
    </div>
  );
}

export default ProgressBar;
