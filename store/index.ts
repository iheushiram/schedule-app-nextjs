import create from 'zustand'
import { EditedSchedule } from '../types'

type State = {
  editedSchedule: EditedSchedule
  updateEditedSchedule: (payload: EditedSchedule) => void
  resetEditedSchedule: () => void
}

const useStore = create<State>((set) => ({
  editedSchedule: {
    scheduleId: '',
    title: '',
    scheduledDate: null,
    startTime: null,
    endTime: null,
    place: '',
  },
  updateEditedSchedule: (payload) =>
    set({
      editedSchedule: {
        scheduleId: payload.scheduleId,
        title: payload.title,
        scheduledDate: payload.scheduledDate,
        startTime: payload.startTime,
        endTime: payload.endTime,
        place: payload.place,
      },
    }),
  resetEditedSchedule: () =>
    set({
      editedSchedule: {
        scheduleId: '',
        title: '',
        scheduledDate: null,
        startTime: null,
        endTime: null,
        place: '',
      },
    }),
}))

export default useStore
