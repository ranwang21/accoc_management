const User = require('../models/User')
const ClassroomSchedule = require('../models/ClassroomSchedule')
const Day = require('../models/Day')


const generateSchedule = async (req, res) => {
  const users = User.find()
  const classrooms = Classroom.find()
  const classroomSchedules = ClassroomSchedule.find();
  const dateDebut
  const dateFin
  const dateToInsert = dateDebut
  let schedules 

foreach classroomSchedules  
  foreach id_day 


    while(dateToInsert.now != dateFin.now){
    if(date.getDay() === day && date.now !== dateJourFerie.now())
      {
        
        (await users).filter(users that have the same id_classroom as the classroom)
          foreach students  
              schedules.add(new schedules(id_students,id_classroom,dateToInsert,false,null))
         (await users).filter(collabs that have the same id_students as the students)  
         foreach collab  
               schedules.add(new schedules(id_collab,id_classroom,dateToInsert,false,null))

      }
        dateToInsert+1
    }
}
 post schedules
module.exports = generateSchedule
