import { Database } from '../../types/supabase';
import { createClient } from '@supabase/supabase-js';
import { GetPicturesResponse } from '../../types/types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(SUPABASE_URL || '', ANON_KEY || '');

export const getPictures = async (): Promise<
  GetPicturesResponse | undefined
> => {
  try {
    let photos;

    const { data: section1, error } = await supabase.storage
      .from('landing')
      .list('landing-gallery', {
        limit: 104,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });
    if (error) console.log(error);

    if (section1) {
      photos = section1.map((item: any) => ({
        src:
          'https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-gallery/' +
          item.name,
        width: 1,
        height: 1,
      }));
    }
    const data: any = {
      section1: photos,
    };

    if (data) {
      return { data };
    }
  } catch (error) {
    throw error;
  }
};
