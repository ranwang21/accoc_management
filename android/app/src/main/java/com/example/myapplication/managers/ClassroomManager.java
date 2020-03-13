package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.Classroom;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;

import java.util.ArrayList;


public class ClassroomManager {

    /**
     * Classroom TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String TITLE = "title";
    private static final String PHONE = "phone";
    private static final String SEAT = "seat";
    private static final String queryGetAll = "select * from " + DataBaseHelper.CLASSROOM_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.CLASSROOM_TABLE_NAME + " where id like ?";
    private static final String queryGetByTitle = "select * from " + DataBaseHelper.CLASSROOM_TABLE_NAME + " where title like ?";
    private static final String queryGetByPhone = "select * from " + DataBaseHelper.CLASSROOM_TABLE_NAME + " where phone like ?";

    /**
     * getAll return all Classroom from DataBase
     *
     * @param context
     * @return ArrayList<Classroom>
     */
    public static ArrayList<Classroom> getAll(Context context) {
        ArrayList<Classroom> classrooms = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            classrooms.add(new Classroom(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getInt(3))
            );
        }
        ConnectionBD.close();
        return classrooms;
    }

    /**
     * getById return a Classroom by id from DataBase
     *
     * @param context
     * @return Classroom
     */
    public static Classroom getById(Context context, int id) {
        Classroom classroom = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        while (cursor.moveToNext()) {
            classroom = new Classroom(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getInt(3)
            );
        }
        ConnectionBD.close();
        return classroom;
    }

    /**
     * getById return a Classroom by title from DataBase
     *
     * @param context
     * @param title
     * @return Classroom
     */
    public static Classroom getByTitle(Context context, String title) {
        Classroom classroom = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByTitle, new String[]{title});
        while (cursor.moveToNext()) {
            classroom = new Classroom(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getInt(3)
            );
        }
        ConnectionBD.close();
        return classroom;
    }

    /**
     * getById return a Classroom by phone from DataBase
     *
     * @param context
     * @param phone
     * @return Classroom
     */
    public static Classroom getByPhone(Context context, String phone) {
        Classroom classroom = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByPhone, new String[]{phone});
        while (cursor.moveToNext()) {
            classroom = new Classroom(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getInt(3)
            );
        }
        ConnectionBD.close();
        return classroom;
    }

    /**
     * Insert Classroom in DataBase
     *
     * @param context
     * @param classroom
     */
    public void insert(Context context, Classroom classroom) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, classroom.get_id());
        contentValues.put(TITLE, classroom.getTitle());
        contentValues.put(PHONE, classroom.getPhone());
        contentValues.put(SEAT, classroom.getSeat());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.CLASSROOM_TABLE_NAME, null, contentValues);
    }

    /**
     * Update Classroom in Database
     *
     * @param context
     * @param classroom
     */
    public void update(Context context, Classroom classroom) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(TITLE, classroom.getTitle());
        contentValues.put(PHONE, classroom.getPhone());
        contentValues.put(SEAT, classroom.getSeat());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.CLASSROOM_TABLE_NAME, contentValues, ID + " = " + classroom.get_id(), null);
    }

    /**
     * Delete Classroom from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, int id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.CLASSROOM_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }
}
