import { Fetch, Response } from '../../../Helpers/Fetch';

export const createEvent = (body: object): Promise<Response> => Fetch('/events', 'POST', body);
