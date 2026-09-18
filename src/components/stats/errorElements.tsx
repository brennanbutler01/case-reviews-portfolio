import { Text } from '@mantine/core'
import React, { useMemo } from 'react'
import { Review } from '@/models/review'

interface Props {
    reviews: Review[]
}

const ErrorElements = ({ reviews }: Props) => {
    const { total, errors } = useMemo(
        () =>
            reviews.reduce(
                (acc, review) => {
                    return {
                        total:
                            acc.total +
                            review.reviewElements.filter(
                                element => element.isReviewed,
                            ).length,
                        errors:
                            acc.errors +
                            review.reviewElements.filter(
                                element =>
                                    element.isReviewed && element.isError,
                            ).length,
                    }
                },
                {
                    total: 0,
                    errors: 0,
                },
            ),
        [reviews],
    )

    return (
        <Text c={'dimmed'}>
            {total === 0 ? (
                'Review more elements to see the percentage of errors'
            ) : (
                <>
                    {total} elements reviewed with {errors}{' '}
                    {errors === 1 ? 'error' : 'errors'} (
                    {((errors / total) * 100).toFixed(2)}%)
                </>
            )}
        </Text>
    )
}

export default ErrorElements
