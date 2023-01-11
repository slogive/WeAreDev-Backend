import Boom from '@hapi/boom';

function errorNotFound(req: any, res: any) {
  res.json(Boom.notFound().output.payload);
}

function errorLog(err: any, req: any, res: any, next: any) {
  if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'development') {
    console.log(`⬇ [status: ${err.statusCode} | message: ${err.message}]`);
  }

  if (err.statusCode == 401 || err.status == 401) return next(Boom.unauthorized().output.payload);

  next(err);
}

function errorHandler(
  err: any,
  req: any,
  res: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: any
) {
  res.json(err);
}

export { errorNotFound, errorLog, errorHandler };
