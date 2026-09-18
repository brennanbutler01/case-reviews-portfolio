import { render, screen } from '@testing-library/react'
import MissingReviewElementsAlert from '@/components/reviewForm/missingReviewElementsAlert'
import { ReviewProviderForTests } from '@/components/reviewForm/ReviewProviderForTests'

describe('ReviewElementsAlert', () => {
    it('should render an alert', () => {
        render(
            <ReviewProviderForTests>
                <MissingReviewElementsAlert />
            </ReviewProviderForTests>,
        )
        expect(
            screen.getByRole('alert', {
                name: 'Add Review Elements',
            }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Select All' }),
        ).toBeInTheDocument()
    })
})
