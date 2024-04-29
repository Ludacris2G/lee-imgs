import { FileObject } from '@supabase/storage-js';

export type GetPicturesResponse = {
  data?: {
    section1: { src: string; width: number; height: number }[] | null;
  };
  error?: any;
};
