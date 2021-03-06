import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { status, data } = useSession();
  const router = useRouter();

  const hasSession = status === 'authenticated';

  const handleSubscribe = async () => {
    if (!hasSession) {
      signIn('github');
      return;
    }

    if (data.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe'); 
      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}