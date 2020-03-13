package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.Schedule;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;

import java.util.ArrayList;


public class ScheduleManager {

    /**
     * Schedule TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String ID_USER = "id_user";
    private static final String ID_CLASSROOM = "id_classroom";
    private static final String DATE = "date";
    private static final String IS_ABSENT = "is_absent";
    private static final String COMMENT = "comment";
    private static final String queryGetAll = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where id like ?";
    private static final String queryGetByIdUser = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where id_user like ?";
    private static final String queryGetByIdClassroom = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where id_classroom like ?";
    private static final String queryGetByDate = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where date like ?";

    /**
     * getAll return all Schedule from DataBase
     *
     * @param context
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getAll(Context context) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getInt(4),
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }

    /**
     * getById return a Schedule by id from DataBase
     *
     * @param context
     * @return Schedule
     */
    public static Schedule getById(Context context, int id) {
        Schedule schedule = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        while (cursor.moveToNext()) {
            schedule = new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getInt(4),
                    cursor.getString(5)
            );
        }
        ConnectionBD.close();
        return schedule;
    }

    /**
     * getById return all Schedule by id_user from DataBase
     *
     * @param context
     * @param id_user
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getByIdUser(Context context, String id_user) {
        ArrayList<Schedule> schedules = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdUser, new String[]{id_user});
        while (cursor.moveToNext()) {
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getInt(4),
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }

    /**
     * getById return all Schedule by id_classroom from DataBase
     *
     * @param context
     * @param id_classroom
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getByIdClassroom(Context context, String id_classroom) {
        ArrayList<Schedule> schedules = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdClassroom, new String[]{id_classroom});
        while (cursor.moveToNext()) {
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getInt(4),
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }

    /**
     * getById return all Schedule by date from DataBase
     *
     * @param context
     * @param date
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getByDate(Context context, String date) {
        ArrayList<Schedule> schedules = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByDate, new String[]{date});
        while (cursor.moveToNext()) {
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getInt(4),
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }

    /**
     * Insert Schedule in DataBase
     *
     * @param context
     * @param schedule
     */
    public void insert(Context context, Schedule schedule) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, schedule.get_id());
        contentValues.put(ID_USER, schedule.getId_user());
        contentValues.put(ID_CLASSROOM, schedule.getId_classroom());
        contentValues.put(DATE, schedule.getDate());
        contentValues.put(IS_ABSENT, schedule.getIs_absent());
        contentValues.put(COMMENT, schedule.getComment());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.SCHEDULE_TABLE_NAME, null, contentValues);
    }

    /**
     * Update Schedule in Database
     *
     * @param context
     * @param schedule
     */
    public void update(Context context, Schedule schedule) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID_USER, schedule.getId_user());
        contentValues.put(ID_CLASSROOM, schedule.getId_classroom());
        contentValues.put(DATE, schedule.getDate());
        contentValues.put(IS_ABSENT, schedule.getIs_absent());
        contentValues.put(COMMENT, schedule.getComment());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.SCHEDULE_TABLE_NAME, contentValues, ID + " = " + schedule.get_id(), null);
    }

    /**
     * Delete Schedule from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, int id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.SCHEDULE_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }
}
