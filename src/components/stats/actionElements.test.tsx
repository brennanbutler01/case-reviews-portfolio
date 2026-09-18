import { render, screen } from '@testing-library/react'
import ActionElements from '@/components/stats/actionElements'
import { ReviewElement } from '@/models/reviewElement'
import { Review } from '@/models/review'

describe('ActionElements', () => {
    it('excludes unreviewed elements from the rate', () => {
        render(
            <ActionElements
                reviews={
                    [
                        {
                            reviewElements: [
                                {
                                    reviewedElement: 0,
                                    isReviewed: false,
                                    isError: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    hasAction: false,
                                },
                            ] as ReviewElement[],
                        },
                    ] as Review[]
                }
            />,
        )
        expect(
            screen.getByText(
                text => text.includes('80.00%') && text.includes('action'),
            ),
        ).toBeInTheDocument()
    })

    it('should render our count', () => {
        render(
            <ActionElements
                reviews={
                    [
                        {
                            reviewElements: [
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    hasAction: false,
                                },
                            ] as ReviewElement[],
                        },
                    ] as Review[]
                }
            />,
        )
        expect(
            screen.getByText(
                text => text.includes('0.00%') && text.includes('action'),
            ),
        ).toBeInTheDocument()
    })
})
