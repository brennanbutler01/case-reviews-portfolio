import { Card, rem, Stack, Text } from '@mantine/core'
import React from 'react'
import { Review } from '@/models/review'

interface Props {
    title: string
    integerStat: string
    percentageStat?: React.ReactElement<{ reviews: Review[] }>
}

const StatCard = ({ title, integerStat, percentageStat }: Props) => {
    return (
        <Card withBorder h={rem(235)}>
            <Card.Section inheritPadding p={'lg'}>
                <Text size={'lg'}>{title}</Text>
            </Card.Section>
            <Card.Section inheritPadding py={'lg'} withBorder>
                <Stack>
                    <Text>{integerStat}</Text>
                    {percentageStat}
                </Stack>
            </Card.Section>
        </Card>
    )
}
export default StatCard
