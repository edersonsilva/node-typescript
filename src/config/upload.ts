import path from 'path';
import cripto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..','..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback){
      const filehash = cripto.randomBytes(10).toString('HEX');
      const fileName = `${filehash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};