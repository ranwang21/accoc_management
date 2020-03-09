package com.example.myapplication.helpers;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;


public class DataBaseHelper extends SQLiteOpenHelper {

    // TABLES NAMES
    public static final String SCHEDULE_TABLE_NAME = "schedule";
    public static final String ROLE_TABLE_NAME = "role";
    public static final String USER_TABLE_NAME = "user";
    public static final String LOGIN_TABLE_NAME = "login";
    public static final String INCONSISTENCY_TABLE_NAME = "inconsistency";
    public static final String EVALUATION_TABLE_NAME = "evalutation";
    public static final String URL_SERVER = "http://192.168.0.213:8080";
    // TABLES CREATES STATEMENTS
    private static final String CREATE_TABLE_ROLE = ("create table " + ROLE_TABLE_NAME + "(" + "id text primary key , title text)");
    private static final String CREATE_TABLE_USER = ("create table " + USER_TABLE_NAME + "(" + "id text , role_id text, email text primary key , first_name text, last_name text, img_url text, password text)");
    public DataBaseHelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }
    @Override
    public void onCreate(SQLiteDatabase db) {
        // Creation
        db.execSQL(CREATE_TABLE_ROLE);
        db.execSQL(CREATE_TABLE_USER);
        // Insertions
    }
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Suppressions
        db.execSQL("DROP TABLE IF EXISTS " + USER_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + ROLE_TABLE_NAME);
        // Creation
        onCreate(db);
    }
}
