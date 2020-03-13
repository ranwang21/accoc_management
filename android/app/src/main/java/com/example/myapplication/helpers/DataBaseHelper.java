package com.example.myapplication.helpers;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;


public class DataBaseHelper extends SQLiteOpenHelper {

    //URL OF SERVER
    public static final String URL_SERVER = "http://192.168.0.219:8080";
    // TABLES NAMES
    public static final String SCHEDULE_TABLE_NAME = "schedule";
    public static final String ROLE_TABLE_NAME = "role";
    public static final String USER_TABLE_NAME = "user";
    public static final String LOGIN_TABLE_NAME = "login";
    public static final String INCONSISTENCY_TABLE_NAME = "inconsistency";
    public static final String EVALUATION_TABLE_NAME = "evalutation";
    public static final String CLASSROOM_TABLE_NAME = "classroom";
    // TABLES CREATES STATEMENTS
    private static final String CREATE_TABLE_USER = ("create table " + USER_TABLE_NAME + "(" + "id text primary key , id_role text, first_name text, last_name text, sex text, adress text, birthday text ,img_url text, password text)");
    private static final String CREATE_TABLE_ROLE = ("create table " + ROLE_TABLE_NAME + "(" + "id text primary key , title text)");
    private static final String CREATE_TABLE_LOGIN = ("create table " + LOGIN_TABLE_NAME + "(" + "id text primary key , id_user text, email text, password text)");
    private static final String CREATE_TABLE_CLASSROOM = ("create table " + CLASSROOM_TABLE_NAME + "(" + "id text primary key , title text, phone text, seat integer)");
    private static final String CREATE_TABLE_SCHEDULE = ("create table " + SCHEDULE_TABLE_NAME + "(" + "id text primary key , id_user text, id_classroom text, date text, is_absent integer, comment text)");
    private static final String CREATE_TABLE_INCONSISTENCY = ("create table " + INCONSISTENCY_TABLE_NAME + "(" + "id text primary key , id_schedule text, id_child text, id_collaborator text)");
    private static final String CREATE_TABLE_EVALUATION = ("create table " + EVALUATION_TABLE_NAME + "(" + "id text primary key , id_schedule text)");
    public DataBaseHelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }
    @Override
    public void onCreate(SQLiteDatabase db) {
        // Creation
        db.execSQL(CREATE_TABLE_ROLE);
        db.execSQL(CREATE_TABLE_USER);
        db.execSQL(CREATE_TABLE_LOGIN);
        db.execSQL(CREATE_TABLE_SCHEDULE);
        db.execSQL(CREATE_TABLE_CLASSROOM);
        db.execSQL(CREATE_TABLE_INCONSISTENCY);
        db.execSQL(CREATE_TABLE_EVALUATION);
        // Insertions
//        RoleHelper.getFromAPI(db);
//        UserHelper.getFromAPI(db);
//        LoginHelper.getFromAPI(db);
//        ClassroomHelper.getFromAPI(db);
//        ScheduleHelper.getFromAPI(db);
//        InconsistencyHelper.getFromAPI(db);
//        EvaluationHelper.getFromAPI(db);
    }
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Suppressions
        db.execSQL("DROP TABLE IF EXISTS " + ROLE_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + USER_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + LOGIN_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + SCHEDULE_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + CLASSROOM_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + INCONSISTENCY_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + EVALUATION_TABLE_NAME);
        // Creation
        onCreate(db);
    }
}
