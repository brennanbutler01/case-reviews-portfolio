import React, { useMemo } from 'react'
import buildReviewElements, {
    buildSingleReviewElement,
} from '@/reviewElements/buildReviewElements'
import { programToReviewElements } from '@/reviewElements/programToReviewElements'
import { Button } from '@mantine/core'
import { useReviewFormContext } from '@/components/reviewForm/context'

interface Props {
    options: { label: string; value: number }[]
}

const ReviewElementGroup = ({ options }: Props) => {
    const form = useReviewFormContext()
    const buttons = useMemo(() => {
        const onChange = (newVal: number | 'all') => {
            //if we clicked 'all'*/}
            if (newVal === 'all') {
                form.getInputProps('reviewElements').onChange(
                    buildReviewElements(
                        Object.values(
                            programToReviewElements[form.values.program],
                        ),
                        form.values.program,
                        form.values.id,
                    ),
                )
            }
            //we are clicking an already active item, remove it*/}
            else if (
                form.values.reviewElements.some(
                    reviewElement => reviewElement.reviewedElement === newVal,
                )
            ) {
                //if we have all selected, we should add this element
                form.values.reviewElements.length ===
                Object.keys(programToReviewElements[form.values.program]).length
                    ? form
                          .getInputProps('reviewElements')
                          .onChange([
                              buildSingleReviewElement(
                                  newVal,
                                  form.values.id,
                                  form.values.program,
                              ),
                          ])
                    : //remove it
                      form
                          .getInputProps('reviewElements')
                          .onChange(
                              form.values.reviewElements.filter(
                                  val => val.reviewedElement !== newVal,
                              ),
                          )
            }
            // we are adding a new item*
            else {
                form.getInputProps('reviewElements').onChange([
                    ...form.values.reviewElements,
                    buildSingleReviewElement(
                        newVal,
                        form.values.id,
                        form.values.program,
                    ),
                ])
            }
        }
        return [
            <Button
                key={'all'}
                variant={
                    form.values.reviewElements.length ===
                    Object.values(programToReviewElements[form.values.program])
                        .length
                        ? 'filled'
                        : 'light'
                }
                defaultValue={'all'}
                value={'all'}
                onChange={() => onChange('all')}
                onClick={() => onChange('all')}
            >
                All
            </Button>,
            ...options.map(option => (
                <Button
                    value={option.value}
                    defaultValue={option.label}
                    key={option.label}
                    onClick={() => onChange(option.value)}
                    onChange={() => onChange(option.value)}
                    variant={
                        form.values.reviewElements.length ===
                        Object.values(
                            programToReviewElements[form.values.program],
                        ).length
                            ? 'light'
                            : form.values.reviewElements.some(
                                  reviewElement =>
                                      reviewElement.reviewedElement ===
                                      option.value,
                              )
                            ? 'filled'
                            : 'light'
                    }
                    // isActive={form.values.reviewElements.some(
                    //     reviewElement =>
                    //         reviewElement.reviewedElement === option.value,
                    // )}
                >
                    {option.label}
                </Button>
            )),
        ]
    }, [form, options])

    return (
        <Button.Group
            aria-labelledby={'reviewElements'}
            style={{ flexWrap: 'wrap' }}
            onChange={e => console.log(e)}
        >
            {buttons}
        </Button.Group>
    )
}
export default ReviewElementGroup
