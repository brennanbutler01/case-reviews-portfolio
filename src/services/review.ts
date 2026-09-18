import { isPortfolioDemo } from '@/demo/mode'
import { demoStore } from '@/demo/store'
import { typedFetch } from '@/services/fetch'
import useTypedSWR from '@/services/swr'
import { PostReview, Review } from '@/models/review'

const reviewApi = `${import.meta.env.VITE_BACKEND_API}/Review`
const getReviews = async (token: string) =>
    isPortfolioDemo
        ? demoStore.listReviews()
        : await typedFetch<Review[]>({ url: reviewApi, token })
const getReview = async (id: number, token: string) =>
    isPortfolioDemo
        ? demoStore.getReview(String(id))
        : await typedFetch<Review>({ url: reviewApi + '/' + id, token })
export const createReview = async (staff: PostReview, token: string) =>
    isPortfolioDemo
        ? demoStore.saveReview(staff)
        : await typedFetch<Review>({
              url: reviewApi,
              init: {
                  method: 'post',
                  body: JSON.stringify(staff),
              },
              token,
          })

export const editReview = async (review: Review, token: string) =>
    isPortfolioDemo
        ? demoStore.saveReview(review, true)
        : await typedFetch<Review>({
              url: `${reviewApi}/${review.id}`,
              init: {
                  method: 'put',
                  body: JSON.stringify(review),
              },
              token,
          })

export const deleteReview = async (recordToDelete: Review, token: string) =>
    isPortfolioDemo
        ? demoStore.deleteReview(recordToDelete.id)
        : await typedFetch<Review>({
              url: `${reviewApi}/${recordToDelete.id}`,
              init: {
                  method: 'delete',
              },
              token,
          })

export const useReviewSWR = () => {
    const { data, ...rest } = useTypedSWR({
        url: reviewApi,
        fetcher: getReviews,
    })
    return {
        reviews: data || [],
        ...rest,
    }
}

export const useSingularReviewSWR = (id: number) => {
    const { data, ...rest } = useTypedSWR<Review>({
        url: reviewApi + '/' + id,
        fetcher: async (token: string) => await getReview(id, token),
    })

    return {
        review: data,
        ...rest,
    }
}
