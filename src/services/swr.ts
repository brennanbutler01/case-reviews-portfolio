import useSWR from 'swr'
import { useAppAuth } from '@/auth/useAppAuth'

interface Props<T> {
    url: string
    fetcher: (token: string) => Promise<T>
}
const useTypedSWR = <T>({ url, fetcher }: Props<T>) => {
    const { getAccessTokenSilently } = useAppAuth()

    const { data, error, isLoading, isValidating } = useSWR(url, async () =>
        fetcher(await getAccessTokenSilently()),
    )
    return {
        data,
        isError: error && !data,
        isLoading: isLoading || isValidating,
    }
}

export default useTypedSWR
