import { ReviewElement } from '@/models/reviewElement'
import { MagiEligibles, PostMagiEligibles } from '@/models/magiEligibles'

export interface Review {
    id: string
    reviewedBy: string
    program: number
    reviewDate: Date
    isTargeted: boolean
    staffId: string
    caseNumber: number
    isComplete: boolean
    otherComments?: string
    reportingSystem?: number
    magiSubProgram?: number
    nonMagiSubProgram?: number
    magiEligibles?: MagiEligibles
    reviewElements: ReviewElement[]
}
export interface PostReview
    extends Omit<Review, 'staffId' | 'caseNumber' | 'magiEligibles'> {
    staffId?: string
    caseNumber?: number | string
    magiEligibles?: PostMagiEligibles
}
