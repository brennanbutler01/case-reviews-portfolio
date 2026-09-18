export interface ReviewElement {
    id: string
    reviewedElement: number
    isReviewed: boolean
    isError: boolean
    hasAction: boolean
    comments: string
    reviewId: string
    program: number
}
