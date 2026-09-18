import { Alert, Button } from '@mantine/core'
import { IconExclamationMark } from '@tabler/icons-react'
import buildReviewElements from '@/reviewElements/buildReviewElements'
import { programToReviewElements } from '@/reviewElements/programToReviewElements'
import React from 'react'
import { useReviewFormContext } from '@/components/reviewForm/context'

const MissingReviewElementsAlert = () => {
    const form = useReviewFormContext()
    return (
        <>
            <Alert
                role={'alert'}
                icon={<IconExclamationMark />}
                title={'Add Review Elements'}
                color={'orange'}
            >
                Select at least one element to review.
            </Alert>
            <Button
                className='btn btn-sm'
                onClick={() =>
                    form.setFieldValue(
                        'reviewElements',
                        buildReviewElements(
                            Object.values(
                                programToReviewElements[form.values.program],
                            ),
                            form.values.program,
                            form.values.id,
                        ),
                    )
                }
            >
                Select All
            </Button>
        </>
    )
}
export default MissingReviewElementsAlert
