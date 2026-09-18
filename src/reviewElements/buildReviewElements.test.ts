import buildReviewElements, {
    buildSingleReviewElement,
} from '@/reviewElements/buildReviewElements'
import { v4 as uuid } from 'uuid'

describe('BuildReviewElements', () => {
    it('single review elements should build just one review element', () => {
        const reviewId = uuid()
        const { id, ...rest } = buildSingleReviewElement(0, reviewId, 0)
        expect(id).toMatch(/^[0-9a-f-]{36}$/)
        expect(rest).toEqual({
            isError: false,
            hasAction: false,
            isReviewed: false,
            comments: '',
            reviewId,
            reviewedElement: 0,
            program: 0,
        })
    })

    it('buildReviewElements should create an array entry for each selectedReviewElement', () => {
        const res = buildReviewElements([0, 1, 2, 3], 0, uuid())
        expect(res).toHaveLength(4)
    })
})
