import React from 'react';
import { Markup } from 'interweave';
import moment from 'moment';
import { Event } from '../../Models/Event';
import ArrowRight from '../../Assets/Icons/arrow-right-fat.svg';
import ImageLink from '../Common/ImageLink';
import { setMaxLength } from '../../Helpers/Utils';
import InfoBox from '../Common/InfoBox';
import Rating from '../Common/Rating';

interface Props {
  data: Event;
}
const EventComponent = ({ data }: Props): JSX.Element | null => {
  const {
    agent, object, type, target, date,
  } = data;

  const maxLengthFifty = (word: string): string => setMaxLength(word, 50);
  const maxLengthFifteen = (word: string): string => setMaxLength(word, 15);

  const agentName = maxLengthFifty((agent.name && typeof agent.name === 'string') ? agent.name : '');
  const targetName = setMaxLength(target.name && typeof target.name === 'string' ? target.name : '', 100);
  const objectName = setMaxLength(object.name && typeof object.name === 'string' ? object.name : '', 100);

  const agentThumbnail = typeof agent.image === 'string'
    ? agent.image
    : '';
  const targetThumbnail = target.image && typeof target.image === 'string' ? target.image : '';
  const objectThumbnail = object.image && typeof object.image === 'string' ? object.image : '';

  const formatedTime = moment(typeof date === 'string' ? date : '').format('HH:mm');
  const formatedDate = moment(typeof date === 'string' ? date : '').format('YYYY-MM-DD');

  let message;
  let eventImages = null;

  switch (type) {
    case 'subscribe':
      message = `${agentName} subscribed to ${targetName}`;
      eventImages = (
        <div className="event-images">
          <ImageLink
            imageSrc={agentThumbnail}
            imageAlt={agentName}
            linkTo={`/profile/${agent._id}`}
            caption={maxLengthFifteen(agentName)}
          />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <ImageLink
            imageSrc={targetThumbnail}
            imageAlt={targetName}
            linkTo={`/podcasts/${target._id}`}
            caption={maxLengthFifteen(targetName)}
          />
        </div>
      );
      break;
    case 'confirm':
      message = `${targetName} is now following ${agentName}`;
      eventImages = (
        <div className="event-images">
          <ImageLink
            imageSrc={targetThumbnail}
            imageAlt={targetName}
            linkTo={`/profile/${target._id}`}
            caption={maxLengthFifteen(targetName)}
          />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <ImageLink
            imageSrc={agentThumbnail}
            imageAlt={agentName}
            linkTo={`/profile/${agent._id}`}
            caption={maxLengthFifteen(agentName)}
          />
        </div>
      );
      break;
    case 'follow':
      message = `${agentName} is now following ${targetName}`;
      eventImages = (
        <div className="event-images">
          <ImageLink
            imageSrc={agentThumbnail}
            imageAlt={agentName}
            linkTo={`/profile/${agent._id}`}
            caption={maxLengthFifteen(agentName)}
          />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <ImageLink
            imageSrc={targetThumbnail}
            imageAlt={targetName}
            linkTo={`/profile/${target._id}`}
            caption={maxLengthFifteen(targetName)}
          />
        </div>
      );
      break;
    case 'recommend':
      const {
        kind, _id,
      } = object;

      message = kind === 'Episode'
        ? `${agentName} recomended: ${objectName} from ${object.parent_name} to ${targetName}`
        : `${agentName} recomended: ${objectName} to ${targetName}`;

      eventImages = (
        <div className="event-images">
          <ImageLink
            imageSrc={agentThumbnail}
            imageAlt={agentName}
            linkTo={`/profile/${agent._id}`}
            caption={maxLengthFifteen(agentName)}
          />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <ImageLink
            imageSrc={objectThumbnail}
            imageAlt={objectName}
            linkTo={`/${kind === 'Episode' ? 'episodes' : 'podcasts'}/${_id}`}
          />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <ImageLink
            imageSrc={targetThumbnail}
            imageAlt={targetName}
            linkTo={`/profile/${target._id}`}
            caption={maxLengthFifteen(targetName)}
          />
        </div>
      );
      break;
    case 'rating':
      const { rating } = object;

      message = `${agentName} gave the episode ${targetName} from ${target.parent_name} a rating of ${rating}`;
      eventImages = (
        <div className="event-images">
          <ImageLink
            imageSrc={agentThumbnail}
            imageAlt={agentName}
            linkTo={`/profile/${agent._id}`}
            caption={maxLengthFifteen(agentName)}
          />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <Rating rating={rating || 0} />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <ImageLink
            imageSrc={targetThumbnail}
            imageAlt={targetName}
            linkTo={`/episodes/${target._id}`}
            caption={maxLengthFifteen(targetName)}
          />
        </div>
      );
      break;
    case 'newEpisode':
      message = `${agentName} relesed a new episode: ${objectName}`;
      eventImages = (
        <div className="event-images">
          <ImageLink
            imageSrc={agentThumbnail}
            imageAlt={agentName}
            linkTo={`/podcasts/${agent._id}`}
            caption={maxLengthFifteen(agentName)}
          />
          <ImageLink imageSrc={ArrowRight} imageAlt="arrow right" />
          <ImageLink
            imageSrc={objectThumbnail}
            imageAlt={objectName}
            linkTo={`/episodes/${object._id}`}
            caption={maxLengthFifteen(objectName)}
          />
        </div>
      );
      break;
    default:
      message = '';
      break;
  }

  return (
    <div className="event">
      {eventImages}
      <div className="event-description">
        <Markup content={message} tagName="p" />
      </div>
      <div className="date">
        <InfoBox text={formatedDate} />
        <InfoBox text={formatedTime} />
      </div>
    </div>
  );
};

export default EventComponent;
