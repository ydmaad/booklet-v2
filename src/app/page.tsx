import BestsellerList from '@/components/BestsellerList';
import MainHero from '@/components/MainHero';
import { getBestsellers } from '@/lib/aladinAPI';

const Home = async () => {
  const bestsellers = await getBestsellers();
  return (
    <div>
      <MainHero />
      <BestsellerList books={bestsellers} />
    </div>
  );
};

export default Home;
