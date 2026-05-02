import MainHero from '@/components/MainHero';
import { getBestsellers } from '@/lib/aladinAPI';

const Home = async () => {
  const bestsellers = await getBestsellers();
  console.log('API 연결 완료!?', bestsellers[0]?.title);
  return (
    <div>
      <MainHero />
    </div>
  );
};

export default Home;
