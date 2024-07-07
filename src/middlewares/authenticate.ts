import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getToday } from '../helpers/getToday';

const authenticate: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    if (!request.headers.authorization) {
        return response.status(401).json({ error: 'Unauthorized' });
    }

    const [, token] = request.headers.authorization.split(' ');
    if (!token) {
        return response.status(401).json({ error: 'Unauthorized' });
    }

    const currentToken = `${process.env.TOKEN}${getToday()}`;

    if (token !== currentToken) {
        return response.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

export default authenticate;
