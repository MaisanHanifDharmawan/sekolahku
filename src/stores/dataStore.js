import { defineStore } from 'pinia'
import seedData from '@/data/seedData.json'
import { useSchoolProfileStore } from './schoolProfile.js'
import { useMajorStore } from './majorStore.js'
import { useExtracurricularStore } from './extracurricularStore.js'
import { useStudentStore } from './studentStore.js'
import { useTeacherStore } from './teacherStore.js'
import { useNewsStore } from './newsStore.js'
import { useGalleryStore } from './galleryStore.js'
import { useMessageStore } from './messageStore.js'

export const useDataStore = defineStore('data', () => {
  const getBackup = () => {
    const profile = useSchoolProfileStore()
    const majors = useMajorStore()
    const extracurriculars = useExtracurricularStore()
    const students = useStudentStore()
    const teachers = useTeacherStore()
    const news = useNewsStore()
    const gallery = useGalleryStore()
    const messages = useMessageStore()

    return {
      schoolProfile: profile.profile,
      majors: majors.items,
      extracurriculars: extracurriculars.items,
      students: students.items,
      teachers: teachers.items,
      news: news.items,
      gallery: gallery.items,
      messages: messages.items,
      exportedAt: new Date().toISOString(),
    }
  }

  const importBackup = (data) => {
    const profile = useSchoolProfileStore()
    const majors = useMajorStore()
    const extracurriculars = useExtracurricularStore()
    const students = useStudentStore()
    const teachers = useTeacherStore()
    const news = useNewsStore()
    const gallery = useGalleryStore()
    const messages = useMessageStore()

    if (data.schoolProfile) profile.loadBackup(data.schoolProfile)
    if (data.majors) majors.loadBackup(data.majors)
    if (data.extracurriculars) extracurriculars.loadBackup(data.extracurriculars)
    if (data.students) students.loadBackup(data.students)
    if (data.teachers) teachers.loadBackup(data.teachers)
    if (data.news) news.loadBackup(data.news)
    if (data.gallery) gallery.loadBackup(data.gallery)
    if (data.messages) messages.loadBackup(data.messages)
  }

  const resetAll = () => {
    const profile = useSchoolProfileStore()
    const majors = useMajorStore()
    const extracurriculars = useExtracurricularStore()
    const students = useStudentStore()
    const teachers = useTeacherStore()
    const news = useNewsStore()
    const gallery = useGalleryStore()
    const messages = useMessageStore()

    profile.reset()
    majors.reset()
    extracurriculars.reset()
    students.reset()
    teachers.reset()
    news.reset()
    gallery.reset()
    messages.reset()
  }

  const exportToFile = () => {
    const data = getBackup()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `backup-sekolah-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    getBackup,
    importBackup,
    resetAll,
    exportToFile,
  }
})
