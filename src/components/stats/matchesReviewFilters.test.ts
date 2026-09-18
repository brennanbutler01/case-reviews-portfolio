import { describe, expect, it } from 'vitest'
import { matchesReviewFilters } from '@/components/stats/matchesReviewFilters'

const review = {
    staffId: 'first',
    program: 0,
    reviewDate: new Date('2026-09-17T12:00:00Z'),
}
const staff = [
    { id: 'first', office: 0 },
    { id: 'second', office: 1 },
]
describe('review statistics filters', () => {
    it('filters office zero instead of treating it as no selection', () => {
        expect(matchesReviewFilters({ review, staff, office: 0 })).toBe(true)
        expect(
            matchesReviewFilters({
                review: { ...review, staffId: 'second' },
                staff,
                office: 0,
            }),
        ).toBe(false)
    })
    it('looks up the review staff member when no individual staff filter is selected', () => {
        expect(matchesReviewFilters({ review, staff, office: 1 })).toBe(false)
        expect(
            matchesReviewFilters({
                review: { ...review, staffId: 'second' },
                staff,
                office: 1,
            }),
        ).toBe(true)
    })
    it('combines staff, program and inclusive date filters', () => {
        const dates: [Date, Date] = [
            new Date('2026-09-17T00:00:00Z'),
            new Date('2026-09-17T00:00:00Z'),
        ]
        expect(
            matchesReviewFilters({
                review,
                staff,
                dates,
                program: 0,
                staffId: 'first',
            }),
        ).toBe(true)
        expect(matchesReviewFilters({ review, staff, dates, program: 1 })).toBe(
            false,
        )
        expect(
            matchesReviewFilters({ review, staff, dates, staffId: 'second' }),
        ).toBe(false)
    })
})
