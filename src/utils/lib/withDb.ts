// src/utils/lib/withDb.ts
import dbConnect from '@lib/mongodb';

export function withDb(handler: Function) {
  return async (...args: any[]) => {
    console.log('Requesting MongoDB connection via withDb handler...');

    await dbConnect();
    return handler(...args);
  };
}

