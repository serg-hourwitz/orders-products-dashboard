import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/orders');
};

export default HomePage;
