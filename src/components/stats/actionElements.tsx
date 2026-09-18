import { Review } from '@/models/review'
import { Text } from '@mantine/core'
import React, { useMemo } from 'react'

interface Props {
    reviews: Review[]
}

const ActionElements = ({ reviews }: Props) => {
    const { total, actions } = useMemo(
        () =>
            reviews.reduce(
                (acc, review) => {
                    return {
                        total:
                            acc.total +
                            review.reviewElements.filter(
                                element => element.isReviewed,
                            ).length,
                        actions:
                            acc.actions +
                            review.reviewElements.filter(
                                element =>
                                    element.isReviewed && element.hasAction,
                            ).length,
                    }
                },
                {
                    total: 0,
                    actions: 0,
                },
            ),
        [reviews],
    )

    return (
        <Text c={'dimmed'}>
            {total === 0 ? (
                'Review more elements to calculate a percentage of actions'
            ) : (
                <>
                    {total} elements reviewed with {actions}{' '}
                    {actions === 1 ? 'action' : 'actions'} (
                    {((actions / total) * 100).toFixed(2)}
                    %)
                </>
            )}
        </Text>
    )
}

export default ActionElements
