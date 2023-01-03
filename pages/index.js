import { useRouter } from 'next/router';
import { navigationMenuItems } from '../settings';

export default function Index() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    router.push(navigationMenuItems[0].href);
  }

  return <></>;
}
