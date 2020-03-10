package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.Login;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;

import java.util.ArrayList;


public class LoginManager {

    /**
     * Login TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String ID_USER = "id_user";
    private static final String EMAIL = "email";
    private static final String PASSWORD = "password";
    private static final String queryGetAll = "select * from " + DataBaseHelper.LOGIN_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.LOGIN_TABLE_NAME + " where id like ?";
    private static final String queryGetByEmail = "select * from " + DataBaseHelper.LOGIN_TABLE_NAME + " where email like ?";
    private static final String queryGetByEmailAndPassword = "select * from " + DataBaseHelper.LOGIN_TABLE_NAME + " where email like ? and password like ?";
    /**
     * getAll return all Login from DataBase
     *
     * @param context
     * @return ArrayList<Login>
     */
    public static ArrayList<Login> getAll(Context context) {
        ArrayList<Login> logins = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            logins.add(new Login(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3))
            );
        }
        ConnectionBD.close();
        return logins;
    }
    /**
     * getById return a Login by id from DataBase
     *
     * @param context
     * @return Login
     */
    public static Login getById(Context context, int id) {
        Login login = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        while (cursor.moveToNext()) {
            login = new Login(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3)
            );
        }
        ConnectionBD.close();
        return login;
    }
    /**
     * getById return a Login by email from DataBase
     *
     * @param context
     * @param email
     * @return Login
     */
    public static Login getByEmail(Context context, String email) {
        Login login = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByEmail, new String[]{email});
        while (cursor.moveToNext()) {
            login = new Login(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3)
            );
        }
        ConnectionBD.close();
        return login;
    }
    /**
     * Insert Login in DataBase
     *
     * @param context
     * @param login
     */
    public void insert(Context context, Login login) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, login.get_id());
        contentValues.put(ID_USER, login.getId_user());
        contentValues.put(EMAIL, login.getEmail());
        contentValues.put(PASSWORD, login.getPassword());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.LOGIN_TABLE_NAME, null, contentValues);
    }
    /**
     * Update Login in Database
     *
     * @param context
     * @param login
     */
    public void update(Context context, Login login) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID_USER, login.getId_user());
        contentValues.put(EMAIL, login.getEmail());
        contentValues.put(PASSWORD, login.getPassword());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.LOGIN_TABLE_NAME, contentValues, ID + " = " + login.get_id(), null);
    }
    /**
     * Delete Login from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, int id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.LOGIN_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }
}
