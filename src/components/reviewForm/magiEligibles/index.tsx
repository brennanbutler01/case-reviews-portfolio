import { Accordion, Alert, NumberInput, SimpleGrid, Stack } from '@mantine/core'
import { IconExclamationMark } from '@tabler/icons-react'
import { useReviewFormContext } from '@/components/reviewForm/context'

interface Props {
    readOnly?: boolean
}
const MagiEligibles = ({ readOnly }: Props) => {
    const form = useReviewFormContext()
    const counts = Object.entries(form.values.magiEligibles ?? {})
        .filter(([key]) => key !== 'id' && key !== 'reviewId')
        .map(([, value]) => (typeof value === 'number' ? value : 0))
    return (
        <Stack>
            {counts.reduce((acc, curr) => acc + curr, 0) === 0 ? (
                <Alert
                    color={'orange'}
                    title={'Review Magi Eligibles'}
                    children={'Please add at least one case member below'}
                    icon={<IconExclamationMark />}
                />
            ) : null}
            <Accordion>
                <Accordion.Item value={'eligibility'}>
                    <Accordion.Control>Eligibles</Accordion.Control>
                    <Accordion.Panel>
                        <SimpleGrid
                            cols={1}
                            breakpoints={[{ minWidth: 'md', cols: 2 }]}
                        >
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Adults Eligible Coded'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.adultsEligibleCoded',
                                )}
                            />
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Adults Eligible Actual'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.adultsEligibleActual',
                                )}
                            />
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Adults Not Eligible Coded'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.adultsNotEligibleCoded',
                                )}
                            />
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Adults Not Eligible Actual'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.adultsNotEligibleActual',
                                )}
                            />
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Children Eligible Coded'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.childrenEligibleCoded',
                                )}
                            />
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Children Eligible Actual'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.childrenEligibleActual',
                                )}
                            />
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Children Not Eligible Coded'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.childrenNotEligibleCoded',
                                )}
                            />
                            <NumberInput
                                readOnly={readOnly}
                                placeholder={'0'}
                                label={'Children Not Eligible Actual'}
                                min={0}
                                step={1}
                                type={'number'}
                                {...form?.getInputProps(
                                    'magiEligibles.childrenNotEligibleActual',
                                )}
                            />
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    )
}

export default MagiEligibles
