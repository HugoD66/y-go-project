// multer.config.ts
import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Dossier de destination
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
};
