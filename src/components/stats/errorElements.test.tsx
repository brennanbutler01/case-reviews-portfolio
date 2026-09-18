import { render, screen } from '@testing-library/react'
import { ReviewElement } from '@/models/reviewElement'
import { Review } from '@/models/review'
import ErrorElements from '@/components/stats/errorElements'

describe('ErrorElements', () => {
    it('excludes unreviewed elements from the rate', () => {
        render(
            <ErrorElements
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
                                    isError: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    isError: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    isError: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    isError: true,
                                    hasAction: true,
                                },
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    isError: false,
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
                text => text.includes('80.00%') && text.includes('error'),
            ),
        ).toBeInTheDocument()
    })

    it('should render our count', () => {
        render(
            <ErrorElements
                reviews={
                    [
                        {
                            reviewElements: [
                                {
                                    reviewedElement: 0,
                                    isReviewed: true,
                                    isError: false,
                                },
                            ] as ReviewElement[],
                        },
                    ] as Review[]
                }
            />,
        )
        expect(
            screen.getByText(
                text => text.includes('0.00%') && text.includes('error'),
            ),
        ).toBeInTheDocument()
    })
})
