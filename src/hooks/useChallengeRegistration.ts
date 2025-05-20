import { useState, useEffect, useCallback } from "react";
import {
    registerForChallenge,
    unregisterFromChallenge,
    checkRegistrationStatus,
} from "@/lib/actions/challenge-registration";

export function useChallengeRegistration(challengeId: string) {
    const [isJoined, setIsJoined]     = useState(false);
    const [isLoading, setIsLoading]   = useState(false);
    const [error, setError]           = useState<string | null>(null);
    const [groupId, setGroupId]       = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            setIsLoading(true);
            setError(null);

            try {
                const status = await checkRegistrationStatus(challengeId);
                if (!controller.signal.aborted) {
                    setIsJoined(status.isRegistered);
                    setGroupId(status.groupId);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError("No se pudo obtener el estado de inscripción");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        })();

        return () => { controller.abort() };
    }, [challengeId]);

    const toggleRegistration = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (isJoined) {
                const result = await unregisterFromChallenge(challengeId);
                if (result.success) {
                    setIsJoined(false);
                    setGroupId(null);
                } else {
                    setError(result.message);
                }
            } else {
                const result = await registerForChallenge(challengeId);
                if (result.success) {
                    setIsJoined(true);
                    const status = await checkRegistrationStatus(challengeId);
                    setGroupId(status.groupId);
                } else {
                    setError(result.message);
                }
            }
        } catch {
            setError("Error de red. Intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }, [challengeId, isJoined]);

    return { isJoined, isLoading, error, groupId, toggleRegistration };
}
