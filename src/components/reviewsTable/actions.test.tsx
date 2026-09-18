import { render, screen } from '@testing-library/react'
import { v4 as uuid } from 'uuid'
import { MRT_Row } from 'mantine-react-table'
import { Review } from '@/models/review'
import ReviewActions from '@/components/reviewsTable/actions'

vi.mock('@react-pdf/renderer', async () => {
    const actual = await vi.importActual<typeof import('@react-pdf/renderer')>(
        '@react-pdf/renderer',
    )
    return {
        ...actual,
        PDFDownloadLink: vi.fn(() => null),
    }
})
export const mockReview = {
    original: {
        id: uuid(),
        reviewedBy: 'Brennan',
        staffId: uuid(),
        program: 0,
        reviewDate: new Date(),
        magiSubProgram: 0,
        nonMagiSubProgram: 0,
        reportingSystem: 0,
        caseNumber: '401123123',
        otherComments: '',
        isComplete: false,
        isTargeted: false,
        magiEligibles: {
            reviewId: '',
            id: uuid(),
            childrenNotEligibleCoded: 0,
            childrenNotEligibleActual: 0,
            childrenEligibleCoded: 0,
            childrenEligibleActual: 0,
            adultsNotEligibleCoded: 0,
            adultsNotEligibleActual: 0,
            adultsEligibleCoded: 0,
            adultsEligibleActual: 0,
        },
        reviewElements: [
            {
                id: uuid(),
                isReviewed: false,
                reviewedElement: 0,
                reviewId: '',
                comments: '',
                program: 0,
                hasAction: false,
                isError: false,
            },
        ],
    },
} as unknown as MRT_Row<Review>

describe('ReviewTableActions', () => {
    beforeEach(() => render(<ReviewActions row={mockReview} />))

    it('should show a view button', () => {
        expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
    })

    it('should show a delete button', () => {
        expect(
            screen.getByRole('button', { name: 'Delete' }),
        ).toBeInTheDocument()
    })

    it('should show a edit button', () => {
        expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    })
})
