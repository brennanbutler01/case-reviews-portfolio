import {
    ReviewFormProvider,
    useReviewForm,
} from '@/components/reviewForm/context'
interface Props {
    children: React.ReactNode
}
export const ReviewProviderForTests = ({ children }: Props) => {
    const form = useReviewForm()
    return <ReviewFormProvider form={form}>{children}</ReviewFormProvider>
}
