import { FileObject } from '@supabase/storage-js';

export type GetPicturesResponse = {
    data?: FileObject[];
    error?: any;
  };