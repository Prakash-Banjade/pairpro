import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useBeforeUnload(isDirty: boolean) {
    const router = useRouter();
    useEffect(() => {
        const onBeforeUnload = () => {
            if (isDirty) {
                if (
                    window.confirm(
                        'You have unsaved changes, are you sure you want to leave?'
                    )
                ) {
                    router.events.emit('routeChangeComplete');
                } else {
                    router.events.emit('routeChangeError');
                }
            }
        };
        const handleRouteChangeError = () => {
            throw new Error('Route has been aborted, ignore this message');
        };
        router.events.on('beforeHistoryChange', onBeforeUnload);
        router.events.on('routeChangeError', handleRouteChangeError);
        return () => {
            router.events.off('beforeHistoryChange', onBeforeUnload);
            router.events.off('routeChangeError', handleRouteChangeError);
        };
    }, [isDirty]);
}