import { Grid } from '@mantine/core'
import React, { useMemo } from 'react'
import { useReviewSWR } from '@/services/review'
import { useStaffSWR } from '@/services/staff'
import ActionElements from '@/components/stats/actionElements'
import ErrorElements from '@/components/stats/errorElements'
import StatCard from '@/components/stats/statCard'
import { Review } from '@/models/review'
import { matchesReviewFilters } from '@/components/stats/matchesReviewFilters'

interface Props {
    staffId?: string | null
    office?: number | null
    dates?: [Date | null, Date | null]
    program?: number | null
}

const countErrorsActions = (
    reviews: Review[],
    filter: 'isError' | 'hasAction',
) =>
    reviews.filter(review =>
        review.reviewElements.some(element => element[filter]),
    ).length

const Stats = ({ staffId, office, dates, program }: Props) => {
    const { reviews } = useReviewSWR()
    const { staff } = useStaffSWR()

    const filteredReviews = useMemo(
        () =>
            reviews.filter(review =>
                matchesReviewFilters({
                    review,
                    staff,
                    staffId,
                    office,
                    dates,
                    program,
                }),
            ),
        [staffId, office, dates, program, reviews, staff],
    )

    return (
        <Grid>
            <Grid.Col span={12} sm={6} lg={4}>
                <StatCard
                    title={'# Cases Reviewed'}
                    integerStat={`${filteredReviews.length} cases reviewed`}
                />
            </Grid.Col>
            <Grid.Col span={12} sm={6} lg={4}>
                <StatCard
                    title={'# Cases With Errors'}
                    integerStat={`${countErrorsActions(
                        filteredReviews,
                        'isError',
                    )} cases with errors cited`}
                    percentageStat={<ErrorElements reviews={filteredReviews} />}
                />
            </Grid.Col>
            <Grid.Col span={12} sm={6} lg={4}>
                <StatCard
                    title={'# Cases With Actions'}
                    integerStat={`${countErrorsActions(
                        filteredReviews,
                        'hasAction',
                    )} cases with actions recommended`}
                    percentageStat={
                        <ActionElements reviews={filteredReviews} />
                    }
                />
            </Grid.Col>
        </Grid>
    )
}

export default Stats
