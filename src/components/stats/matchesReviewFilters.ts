import dayjs from '@/dayjs'
import { Review } from '@/models/review'
import { Staff } from '@/models/staff'

export function matchesReviewFilters({
    review,
    staff,
    staffId,
    office,
    dates,
    program,
}: {
    review: Pick<Review, 'staffId' | 'program' | 'reviewDate'>
    staff: Pick<Staff, 'id' | 'office'>[]
    staffId?: string | null
    office?: number | null
    dates?: [Date | null, Date | null]
    program?: number | null
}): boolean {
    if (staffId && review.staffId !== staffId) return false
    if (
        office != null &&
        staff.find(member => member.id === review.staffId)?.office !== office
    )
        return false
    if (program != null && review.program !== program) return false
    if (dates?.[0] && dates[1]) {
        return dayjs(review.reviewDate).isBetween(
            dayjs(dates[0]),
            dayjs(dates[1]),
            'day',
            '[]',
        )
    }
    return true
}
