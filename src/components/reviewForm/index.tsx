import React, { useEffect } from 'react'
import { Programs } from '@/models/programs'
import { PostReview, Review } from '@/models/review'
import { useStaffSWR } from '@/services/staff'
import { createReview, editReview, useReviewSWR } from '@/services/review'
import { v4 as uuid } from 'uuid'
import ReviewElementGroup from '@/components/reviewForm/reviewElementGroup'
import { useSWRConfig } from 'swr'
import { programToReviewElements } from '@/reviewElements/programToReviewElements'
import RadioForPrograms from '@/components/reviewForm/radioForPrograms'
import ReviewElementItem from '@/components/reviewForm/reviewElementItem'
import MagiEligibles from 'src/components/reviewForm/magiEligibles'
import {
    Accordion,
    Button,
    Card,
    Checkbox,
    Group,
    Input,
    Select,
    Stack,
    Textarea,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useAppAuth } from '@/auth/useAppAuth'
import MissingReviewElementsAlert from '@/components/reviewForm/missingReviewElementsAlert'
import {
    ReviewFormProvider,
    useReviewForm,
} from '@/components/reviewForm/context'

interface Props {
    editing?: Review
}
const ReviewForm = ({ editing }: Props) => {
    const { getAccessTokenSilently, user } = useAppAuth()
    const { staff } = useStaffSWR()
    const { mutate } = useSWRConfig()
    const { reviews } = useReviewSWR()
    const form = useReviewForm({
        initialValues: editing
            ? { ...editing }
            : {
                  id: uuid(),
                  program: 0,
                  reviewedBy: user?.sub || '',
                  reviewDate: new Date(),
                  isTargeted: false,
                  isComplete: false,
                  caseNumber: '',
                  otherComments: '',
                  reviewElements: [],
                  reportingSystem: 0,
                  magiSubProgram: 0,
                  nonMagiSubProgram: 0,
                  staffId: staff?.length > 0 ? staff[0].id : undefined,
                  magiEligibles: {
                      id: uuid(),
                      adultsEligibleActual: 0,
                      adultsEligibleCoded: 0,
                      adultsNotEligibleActual: 0,
                      adultsNotEligibleCoded: 0,
                      childrenEligibleActual: 0,
                      childrenEligibleCoded: 0,
                      childrenNotEligibleActual: 0,
                      childrenNotEligibleCoded: 0,
                  },
              },
        validate: (values: Review | PostReview) => {
            return {
                caseNumber: !values.caseNumber
                    ? 'Please enter a case number - It is required'
                    : values.caseNumber.toString().length !== 9
                    ? 'Case numbers are 9 digits'
                    : null,
                staffId: !values.staffId
                    ? 'Please select or create a staff'
                    : null,
                reviewedBy: !values.reviewedBy ? 'Sign in...' : null,
            }
        },
        transformValues: values => ({
            ...values,
            isComplete:
                values.reviewElements.length > 0 &&
                values.reviewElements.every(element => element.isReviewed),
        }),
    })

    const onSubmit = async (values: Review | PostReview) => {
        try {
            if (!editing) {
                await createReview(values, await getAccessTokenSilently())
            } else {
                await editReview(
                    values as Review,
                    await getAccessTokenSilently(),
                )
            }
            await mutate(() => true)
            showNotification({
                color: 'green',
                message: `Successfully ${
                    editing ? 'Edited' : 'Created'
                } Review`,
                title: 'Success!',
                closeButtonProps: { 'aria-label': 'Close notification' },
            })
            closeAllModals()
        } catch (err) {
            showNotification({
                color: 'red',
                title: 'Error',
                withCloseButton: true,
                closeButtonProps: { 'aria-label': 'Close notification' },
                message: `Error ${editing ? 'Editing' : 'Creating'} Review`,
            })
        }
    }

    useEffect(() => {
        if (!form.values.staffId && staff?.length > 0 && !editing) {
            form.setFieldValue('staffId', staff[0].id)
        }
    }, [staff, form, editing])

    useEffect(() => {
        if (editing) {
            const thisReview = reviews?.find(review => review.id === editing.id)

            if (thisReview && form.values.id !== editing.id) {
                form.setValues(thisReview)
            }
        }
    }, [form, reviews, editing])

    return (
        <ReviewFormProvider form={form}>
            <Stack>
                <form
                    id={'review-form'}
                    name={'reviews'}
                    onSubmit={form.onSubmit(onSubmit, errors => {
                        Object.keys(errors).map(errorField =>
                            showNotification({
                                role: 'alert',
                                title: 'Review Form Error',
                                message: errors[errorField],
                            }),
                        )
                    })}
                >
                    <Stack className={'indicator'}>
                        <Card>
                            <Stack>
                                <Stack>
                                    <Stack>
                                        <Stack>
                                            <Select
                                                {...form.getInputProps(
                                                    'program',
                                                )}
                                                value={String(
                                                    form.values.program,
                                                )}
                                                onChange={value => {
                                                    if (value !== null) {
                                                        form.setFieldValue(
                                                            'program',
                                                            Number(value),
                                                        )
                                                        form.setFieldValue(
                                                            'reviewElements',
                                                            [],
                                                        )
                                                    }
                                                }}
                                                name={'program'}
                                                label={'Reviewed Program'}
                                                data={Object.keys(Programs).map(
                                                    (k, i) => ({
                                                        label: k,
                                                        value: String(i),
                                                    }),
                                                )}
                                            />
                                            <Select
                                                {...form.getInputProps(
                                                    'staffId',
                                                )}
                                                label={'Staff Reviewed'}
                                                placeholder={'Rebecca'}
                                                required
                                                data={staff.map(
                                                    staffMember => ({
                                                        label:
                                                            staffMember.firstName +
                                                            ' ' +
                                                            staffMember.lastName,
                                                        value: staffMember.id,
                                                    }),
                                                )}
                                            />
                                            <TextInput
                                                placeholder={'4018009901'}
                                                type={'number'}
                                                label={'Case Number'}
                                                required
                                                {...form.getInputProps(
                                                    'caseNumber',
                                                )}
                                            />
                                            <Checkbox
                                                label={'Is Targeted'}
                                                {...form.getInputProps(
                                                    'isTargeted',
                                                    { type: 'checkbox' },
                                                )}
                                            />
                                        </Stack>
                                        <Stack>
                                            {[
                                                Programs.TANF,
                                                Programs.ERDC,
                                            ].includes(
                                                form.values.program,
                                            ) ? null : (
                                                <RadioForPrograms />
                                            )}
                                            <Textarea
                                                label={'Comments'}
                                                name={'otherComments'}
                                                {...form.getInputProps(
                                                    'otherComments',
                                                )}
                                            />
                                        </Stack>
                                    </Stack>
                                    <Group position={'center'}>
                                        <fieldset style={{ border: 'none' }}>
                                            <Stack spacing={'sm'}>
                                                <Input.Label
                                                    size={'lg'}
                                                    id={'reviewElements'}
                                                >
                                                    Select review elements
                                                </Input.Label>
                                                {form.values.reviewElements
                                                    .length === 0 ? (
                                                    <MissingReviewElementsAlert />
                                                ) : null}
                                                <ReviewElementGroup
                                                    options={Object.entries(
                                                        programToReviewElements[
                                                            form.values.program
                                                        ],
                                                    ).map(([key, value]) => ({
                                                        value,
                                                        label: key,
                                                    }))}
                                                />
                                            </Stack>
                                        </fieldset>
                                    </Group>
                                </Stack>
                                <fieldset style={{ border: 'none' }}>
                                    <Stack spacing={'sm'}>
                                        <Input.Label
                                            id={'reviewElementsLabel'}
                                            size={'lg'}
                                        >
                                            Elements to review
                                        </Input.Label>
                                        <Accordion multiple loop>
                                            {form.values.reviewElements.map(
                                                (element, index) => (
                                                    <ReviewElementItem
                                                        key={element.id}
                                                        reviewedElement={
                                                            element
                                                        }
                                                        review={form.values}
                                                        index={index}
                                                    />
                                                ),
                                            )}
                                        </Accordion>
                                    </Stack>
                                </fieldset>
                                {form.values.program === Programs.MAGI ? (
                                    <MagiEligibles />
                                ) : null}
                                <Button
                                    type={'submit'}
                                    disabled={
                                        form.values.reviewElements.length === 0
                                    }
                                >
                                    {editing ? 'Update' : 'Create'}
                                </Button>
                            </Stack>
                        </Card>
                    </Stack>
                </form>
            </Stack>
        </ReviewFormProvider>
    )
}

export default ReviewForm
