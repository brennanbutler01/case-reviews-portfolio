import { createFormContext } from '@mantine/form'
import { PostStaff, Staff } from '@/models/staff'

// You can give context variables any name
export const [StaffFormProvider, useStaffFormContext, useStaffForm] =
    createFormContext<Staff | PostStaff>()
