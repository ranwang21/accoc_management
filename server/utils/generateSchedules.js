const User = require('../models/User')
const ClassroomSchedule = require('../models/ClassroomSchedule')
const Day = require('../models/Day')

const generateSchedule = async (startDate, endDate) => {
  const classroomSchedules = await ClassroomSchedule.find().lean()
  const schedule = [] // Declare Array ici

  classroomSchedules.forEach(classroomSchedule => {
    classroomSchedule.id_day.forEach(async idDay => {
      const day = await Day.findById(idDay)
      const childs = await User.find({
        id_classroom: classroomSchedule.id_classroom
      }).lean()
      const dayToIncrement = new Date(startDate)
      const lastDay = new Date(endDate)
      for (
        let today = dayToIncrement;
        today <= lastDay;
        today.setDate(today.getDate() + 1)
      ) {
        if (today.getDay() === day.value) {
          childs.forEach(child => {
            const childJson = {
              id_user: child._id,
              id_classroom: child.id_classroom,
              date: today,
              is_absent: false
            }
            const collabJson = {
              id_user: child.id_collaborater,
              id_classroom: child.id_classroom,
              date: today,
              is_absent: false
            }
            schedule.push(childJson, collabJson)
          })
        }
      }
    })
  })
}

module.exports = generateSchedule
