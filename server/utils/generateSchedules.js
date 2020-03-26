const User = require('../models/User')
const ClassroomSchedule = require('../models/ClassroomSchedule')
const Day = require('../models/Day')

const loadSchedule = (dayToIncrement, endDate, day, childs, callBack) => {
  const schedule = [] // Declare Array ici
  while (dayToIncrement < endDate) {
    while (dayToIncrement < endDate) {
      if (dayToIncrement.getDay() === day.value) {
        childs.forEach(async child => {
          const scheduleJson = [
            {
              id_user: child._id,
              id_classroom: child.id_classroom,
              date: dayToIncrement,
              is_absent: false
            },
            {
              id_user: child.id_collaborater,
              id_classroom: child.id_classroom,
              date: dayToIncrement,
              is_absent: false
            }
          ]
          schedule.push(scheduleJson)
          // console.log(schedule) // <--- Schedule Push fonctionne
        })
      } else {
        callBack(schedule)
      }
      dayToIncrement.setDate(dayToIncrement.getDate() + 1)
    }
  }
}

const whatYouWantTodoWithArray = scheduleArray => {
  // Tu fais ce que tu as a faire avec le array ici
  console.log(scheduleArray)
}

const generateSchedule = async (startDate, endDate) => {
  const classroomSchedules = await ClassroomSchedule.find().lean()

  classroomSchedules.forEach(classroomSchedule => {
    classroomSchedule.id_day.forEach(async idDay => {
      const day = await Day.findById(idDay)
      const childs = await User.find({
        id_classroom: classroomSchedule.id_classroom
      }).lean()
      const dayToIncrement = new Date(startDate)
      loadSchedule(
        dayToIncrement,
        endDate,
        day,
        childs,
        whatYouWantTodoWithArray
      )
    })
  })
}

module.exports = generateSchedule
