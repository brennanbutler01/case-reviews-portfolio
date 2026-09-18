import { createFormContext } from '@mantine/form'
import { PostReview, Review } from '@/models/review'

// You can give context variables any name
export const [ReviewFormProvider, useReviewFormContext, useReviewForm] =
    createFormContext<Review | PostReview>()
