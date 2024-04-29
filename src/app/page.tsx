import { getPictures } from '@/services/utility';
import Landing from './_components/Landing';

export default async function Home() {
  const pictures = await getPictures();

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between bg-light-teal'>
        <Landing {...pictures} />
      </main>
    </>
  );
}
