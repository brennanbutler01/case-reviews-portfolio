import { createDemoStore } from '@/demo/store'

describe('portfolio data', () => {
    it('isolates visitors and returns copies of records', () => {
        const first = createDemoStore()
        const second = createDemoStore()
        const review = first.listReviews()[0]
        first.deleteReview(review.id)
        expect(second.listReviews()).toHaveLength(2)
        const staff = first.listStaff()
        staff[0].firstName = 'Changed outside store'
        expect(first.listStaff()[0].firstName).toBe('Alex')
    })
    it('protects linked staff and rejects reviews with missing staff', () => {
        const store = createDemoStore()
        const review = store.listReviews()[0]
        expect(() => store.deleteStaff(review.staffId)).toThrow('reviews first')
        expect(() =>
            store.saveReview({ ...review, staffId: 'missing' }),
        ).toThrow('existing staff')
        store.deleteReview(review.id)
        store.deleteStaff(review.staffId)
        expect(store.listStaff()).toHaveLength(1)
    })
    it('creates and updates reviews without trusting supplied ownership', () => {
        const store = createDemoStore()
        const template = store.listReviews()[0]
        const created = store.saveReview({ ...template, reviewedBy: 'forged' })
        expect(created.id).not.toBe(template.id)
        expect(created.reviewedBy).toBe('portfolio-visitor')
        const updated = store.saveReview(
            { ...created, otherComments: 'Changed' },
            true,
        )
        expect(store.getReview(updated.id).otherComments).toBe('Changed')
        expect(
            updated.reviewElements.every(
                element => element.reviewId === updated.id,
            ),
        ).toBe(true)
    })
})
