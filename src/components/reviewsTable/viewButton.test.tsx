import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { ModalsProvider } from '@mantine/modals'
import { mockReview } from '@/components/reviewsTable/actions.test'
import ViewReviewButton from '@/components/reviewsTable/viewButton'
import { ReviewProviderForTests } from '@/components/reviewForm/ReviewProviderForTests'

describe('view button', () => {
    beforeEach(() => {
        return render(
            <ModalsProvider>
                <ReviewProviderForTests>
                    <ViewReviewButton row={mockReview} />
                </ReviewProviderForTests>
            </ModalsProvider>,
        )
    })

    it('should render a button', () =>
        expect(screen.getByRole('button')).toBeInTheDocument())

    it('opens review details before staff data is available', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByRole('button'))
        expect(
            screen.getByRole('dialog', { name: 'Review Details' }),
        ).toBeInTheDocument()
    })
})
