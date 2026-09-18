import { isPortfolioDemo } from '@/demo/mode'
import { demoStore } from '@/demo/store'
import { typedFetch } from '@/services/fetch'
import { PostStaff, Staff } from '@/models/staff'
import useTypedSWR from '@/services/swr'

const staffApi = `${import.meta.env.VITE_BACKEND_API}/Staff`
const getStaff = async (token: string) =>
    isPortfolioDemo
        ? demoStore.listStaff()
        : await typedFetch<Staff[]>({ url: staffApi, token })
export const createStaff = async (staff: PostStaff, token: string) =>
    isPortfolioDemo
        ? demoStore.saveStaff(staff)
        : await typedFetch<Staff>({
              url: staffApi,
              init: {
                  method: 'post',
                  body: JSON.stringify(staff),
              },
              token,
          })

export const editStaff = async (staff: Staff, token: string) =>
    isPortfolioDemo
        ? demoStore.saveStaff(staff, true)
        : await typedFetch<Staff>({
              url: `${staffApi}/${staff.id}`,
              init: {
                  method: 'put',
                  body: JSON.stringify(staff),
              },
              token,
          })

export const deleteStaff = async (recordToDelete: Staff, token: string) =>
    isPortfolioDemo
        ? demoStore.deleteStaff(recordToDelete.id)
        : await typedFetch<Staff>({
              url: `${staffApi}/${recordToDelete.id}`,
              init: {
                  method: 'delete',
              },
              token,
          })

export const useStaffSWR = () => {
    const { data, ...rest } = useTypedSWR({
        url: staffApi,
        fetcher: getStaff,
    })
    return {
        staff: data || [],
        ...rest,
    }
}
