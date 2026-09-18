import React from 'react'
import { PostStaff, Staff } from '@/models/staff'
import { createStaff, editStaff } from '@/services/staff'
import { useForm } from '@mantine/form'
import { useSWRConfig } from 'swr'
import { Button, Card, Select, Stack, TextInput } from '@mantine/core'
import { Offices } from '@/models/offices'
import { showNotification } from '@mantine/notifications'
import { closeModal } from '@mantine/modals'
import { Modals } from '@/models/modals'
import { useAppAuth } from '@/auth/useAppAuth'

interface Props {
    editing?: Staff
}

const StaffForm = ({ editing }: Props) => {
    const { mutate } = useSWRConfig()
    const { getAccessTokenSilently, user } = useAppAuth()
    const form = useForm<PostStaff | Staff>({
        initialValues: editing
            ? { ...editing }
            : {
                  firstName: '',
                  lastName: '',
                  office: 0,
                  orNumber: '',
                  createdBy: user?.sub || '',
              },
        validate: values => ({
            firstName: values.firstName
                .split('')
                .every(char => Number.isNaN(parseInt(char)))
                ? null
                : 'Names should not have numbers',
            lastName: values.lastName
                .split('')
                .every(char => Number.isNaN(parseInt(char)))
                ? null
                : 'Names should not have numbers',
            orNumber:
                values.orNumber.trim().substring(0, 2).toLowerCase() !== 'or'
                    ? 'OR Numbers begin with "OR"'
                    : values.orNumber
                          .substring(2)
                          .split('')
                          .every(val => Number.isInteger(parseInt(val)))
                    ? null
                    : 'OR Number should begin with "OR" and then have 7 numbers - not letters',
            createdBy: !values.createdBy ? 'You need to sign in...' : null,
        }),
    })

    const onSubmit = async (data: Staff | PostStaff) => {
        try {
            await (editing
                ? editStaff(
                      {
                          ...editing,
                          ...data,
                          office: parseInt(data.office.toString()),
                      },
                      await getAccessTokenSilently(),
                  )
                : createStaff(
                      {
                          ...data,
                          office: parseInt(data.office.toString()),
                      },
                      await getAccessTokenSilently(),
                  ))
            await mutate(() => true)
            showNotification({
                color: 'green',
                title: 'Success!',
                message: `Successfully ${editing ? 'edited' : 'created'} staff`,
                closeButtonProps: { 'aria-label': 'Close notification' },
            })
            closeModal(Modals.STAFF_FORM)
        } catch (e) {
            showNotification({
                color: 'red',
                title: 'Error!',
                message: `Error ${editing ? 'updating' : 'creating'} staff`,
                closeButtonProps: { 'aria-label': 'Close notification' },
            })
        }
    }
    return (
        <Card shadow={'xs'} p={'xl'}>
            <form
                aria-label={'Create/Edit Staff'}
                onSubmit={form.onSubmit(onSubmit)}
            >
                <Card.Section inheritPadding>
                    <Stack>
                        <TextInput
                            minLength={3}
                            placeholder={'Brennan'}
                            required
                            label={'First Name'}
                            name={'firstName'}
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            minLength={3}
                            placeholder={'Butler'}
                            required
                            name={'lastName'}
                            label={'Last Name'}
                            {...form.getInputProps('lastName')}
                        />
                        <TextInput
                            minLength={9}
                            maxLength={9}
                            required
                            placeholder={'OR0123458'}
                            label={'OR Number'}
                            name={'orNumber'}
                            {...form.getInputProps('orNumber')}
                        />
                        <Select
                            placeholder={'St. Johns'}
                            required
                            withinPortal
                            label={'Office'}
                            name={'office'}
                            searchable
                            data={Object.keys(Offices).map((val, i) => ({
                                label: val.toString(),
                                value: String(i),
                            }))}
                            {...form.getInputProps('office')}
                            value={String(form.values.office)}
                            onChange={value => {
                                if (value !== null)
                                    form.setFieldValue('office', Number(value))
                            }}
                        />
                    </Stack>
                </Card.Section>
                <Card.Section inheritPadding mt={'md'}>
                    <Button fullWidth type={'submit'}>
                        Submit
                    </Button>
                </Card.Section>
            </form>
        </Card>
    )
}

export default StaffForm
