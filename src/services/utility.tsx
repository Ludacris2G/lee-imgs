import { Database } from '../../types/supabase';
import { createClient, QueryData } from '@supabase/supabase-js';
import { GetPicturesResponse } from '../../types/types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(SUPABASE_URL || '', ANON_KEY || '');

export const getPictures = async (): Promise<
  GetPicturesResponse | undefined
> => {
  try {
    const { data, error } = await supabase.storage
      .from('landing')
      .list('landing', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });
    if (data) {
      return { data };
    }
  } catch (error) {
    throw error;
  }
};
