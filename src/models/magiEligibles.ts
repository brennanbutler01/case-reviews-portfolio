export interface MagiEligibles {
    id: string
    adultsEligibleActual: number
    adultsEligibleCoded: number
    adultsNotEligibleActual: number
    adultsNotEligibleCoded: number
    childrenEligibleActual: number
    childrenEligibleCoded: number
    childrenNotEligibleActual: number
    childrenNotEligibleCoded: number
    reviewId: string
}

export interface PostMagiEligibles
    extends Omit<MagiEligibles, 'id' | 'reviewId'> {
    id?: string
    reviewId?: string
}
