import { PostReview, Review } from '@/models/review'
import { ReviewElement } from '@/models/reviewElement'
import { ProgramReviewElements } from '@/models/programReviewElements'
import {
    Accordion,
    Badge,
    Checkbox,
    Group,
    Stack,
    Text,
    Textarea,
} from '@mantine/core'
import { useReviewFormContext } from '@/components/reviewForm/context'

interface Props {
    review: Review | PostReview
    readOnly?: boolean
    index: number
    reviewedElement: ReviewElement
}
const ReviewElementItem = ({
    review,
    index,
    reviewedElement,
    readOnly,
}: Props) => {
    const form = useReviewFormContext()
    return (
        <Accordion.Item
            aria-labelledby={'reviewElementsLabel'}
            value={reviewedElement.id}
            key={review.id}
        >
            <Accordion.Control>
                <Group position={'apart'}>
                    <Text truncate>
                        {
                            Object.keys(ProgramReviewElements)[
                                reviewedElement.reviewedElement
                            ]
                        }
                    </Text>
                    <Badge
                        color={
                            reviewedElement.isReviewed
                                ? reviewedElement.isError
                                    ? 'red'
                                    : reviewedElement.hasAction
                                    ? 'orange'
                                    : 'green'
                                : 'yellow'
                        }
                    >
                        {reviewedElement.isReviewed
                            ? reviewedElement.isError
                                ? 'Error'
                                : reviewedElement.hasAction
                                ? 'Action'
                                : 'Reviewed'
                            : 'Incomplete'}
                    </Badge>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Stack>
                    <Checkbox
                        readOnly={readOnly}
                        label={'Reviewed?'}
                        {...form?.getInputProps(
                            `reviewElements.${index}.isReviewed`,
                            { type: 'checkbox' },
                        )}
                    />
                    <Checkbox
                        readOnly={readOnly}
                        label={'Error'}
                        {...form?.getInputProps(
                            `reviewElements.${index}.isError`,
                            {
                                type: 'checkbox',
                            },
                        )}
                    />
                    <Checkbox
                        readOnly={readOnly}
                        label={'Action Required'}
                        {...form?.getInputProps(
                            `reviewElements.${index}.hasAction`,
                            {
                                type: 'checkbox',
                            },
                        )}
                    />
                    <Textarea
                        readOnly={readOnly}
                        label={'Comments'}
                        name={`values.${index}.comments`}
                        {...form?.getInputProps(
                            `reviewElements.${index}.comments`,
                        )}
                        placeholder={'any comments to add?'}
                    />
                </Stack>
            </Accordion.Panel>
        </Accordion.Item>
    )
}
export default ReviewElementItem
