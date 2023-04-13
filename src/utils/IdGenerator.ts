import * as crypto from 'crypto';

export default () =>
  crypto.createHash('sha256').update(crypto.randomBytes(16)).digest('hex');
