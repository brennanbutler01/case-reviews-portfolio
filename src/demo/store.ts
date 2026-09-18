import { ProgramReviewElements } from '@/models/programReviewElements'
import { Staff, PostStaff } from '@/models/staff'
import { Review, PostReview } from '@/models/review'

const owner = 'portfolio-visitor'

// Each page load gets independent synthetic data. Nothing is sent to a server.
export function createDemoStore() {
    let staff: Staff[] = [
        {
            id: 'demo-staff-alex',
            firstName: 'Alex',
            lastName: 'Sample',
            orNumber: 'OR0000001',
            office: 0,
            createdBy: owner,
        },
        {
            id: 'demo-staff-jordan',
            firstName: 'Jordan',
            lastName: 'Example',
            orNumber: 'OR0000002',
            office: 1,
            createdBy: owner,
        },
    ]
    let reviews: Review[] = staff.map((person, index) => ({
        id: `demo-review-${index}`,
        reviewedBy: owner,
        program: 0,
        reviewDate: new Date(),
        isTargeted: false,
        staffId: person.id,
        caseNumber: 900000001 + index,
        isComplete: index === 0,
        otherComments: 'Invented sample case for the portfolio demo.',
        reportingSystem: 0,
        reviewElements: [
            {
                id: `demo-element-${index}`,
                reviewedElement: ProgramReviewElements.HOUSEHOLD_COMPOSITION,
                isReviewed: index === 0,
                isError: index === 0,
                hasAction: index === 0,
                comments:
                    index === 0
                        ? 'Sample finding: confirm household composition.'
                        : '',
                reviewId: `demo-review-${index}`,
                program: 0,
            },
        ],
    }))
    const copy = <T>(value: T): T => structuredClone(value)
    const requireStaff = (id: string | undefined) => {
        if (!id || !staff.some(person => person.id === id))
            throw new Error('Select an existing staff member.')
        return id
    }
    const normalizeReview = (input: PostReview, id: string): Review => {
        const staffId = requireStaff(input.staffId)
        const caseNumber = Number(input.caseNumber)
        if (
            !Number.isInteger(caseNumber) ||
            !/^\d{9}$/.test(String(caseNumber))
        )
            throw new Error('Case numbers must have nine digits.')
        if (!input.reviewElements.length)
            throw new Error('Select review elements.')
        return copy({
            ...input,
            id,
            staffId,
            caseNumber,
            reviewedBy: owner,
            isComplete: input.reviewElements.every(
                element => element.isReviewed,
            ),
            reviewElements: input.reviewElements.map(element => ({
                ...element,
                reviewId: id,
            })),
            magiEligibles: input.magiEligibles
                ? {
                      ...input.magiEligibles,
                      id: input.magiEligibles.id || crypto.randomUUID(),
                      reviewId: id,
                  }
                : undefined,
        })
    }
    return {
        listStaff: () => copy(staff),
        listReviews: () => copy(reviews),
        getReview: (id: string) => {
            const review = reviews.find(value => value.id === id)
            if (!review) throw new Error('Review not found.')
            return copy(review)
        },
        saveStaff: (input: PostStaff, editing = false) => {
            if (!input.firstName.trim() || !input.lastName.trim())
                throw new Error('Names are required.')
            if (editing && !staff.some(value => value.id === input.id))
                throw new Error('Staff not found.')
            const saved: Staff = copy({
                ...input,
                id: editing && input.id ? input.id : crypto.randomUUID(),
                createdBy: owner,
            })
            staff = editing
                ? staff.map(value => (value.id === saved.id ? saved : value))
                : [...staff, saved]
            return copy(saved)
        },
        deleteStaff: (id: string) => {
            requireStaff(id)
            if (reviews.some(review => review.staffId === id))
                throw new Error('Remove this staff member’s reviews first.')
            const deleted = staff.find(value => value.id === id)
            staff = staff.filter(value => value.id !== id)
            return copy(deleted)
        },
        saveReview: (input: PostReview, editing = false) => {
            if (editing && !reviews.some(value => value.id === input.id))
                throw new Error('Review not found.')
            const saved = normalizeReview(
                input,
                editing ? input.id : crypto.randomUUID(),
            )
            reviews = editing
                ? reviews.map(value => (value.id === saved.id ? saved : value))
                : [...reviews, saved]
            return copy(saved)
        },
        deleteReview: (id: string) => {
            const deleted = reviews.find(value => value.id === id)
            if (!deleted) throw new Error('Review not found.')
            reviews = reviews.filter(value => value.id !== id)
            return copy(deleted)
        },
    }
}
export const demoStore = createDemoStore()
