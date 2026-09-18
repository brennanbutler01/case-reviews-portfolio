import { ReviewElement } from '@/models/reviewElement'
import { v4 as uuid } from 'uuid'
import { programToReviewElements } from '@/reviewElements/programToReviewElements'

export const buildSingleReviewElement = (
    reviewElement: number,
    reviewId: string,
    program: number,
): ReviewElement => {
    return {
        reviewedElement: reviewElement,
        isReviewed: false,
        isError: false,
        hasAction: false,
        comments: '',
        reviewId,
        id: uuid(),
        program,
    }
}

const buildReviewElements = (
    selectedReviewElements: number[],
    program: number,
    reviewId: string,
) => {
    //we want to add all review elements
    if (
        selectedReviewElements.length ===
        Object.values(programToReviewElements[program]).length
    ) {
        return Object.values(programToReviewElements[program]).map(value =>
            buildSingleReviewElement(value, reviewId, program),
        )
    }

    return selectedReviewElements.map(reviewElement =>
        buildSingleReviewElement(+reviewElement, reviewId, program),
    )
}

export default buildReviewElements
