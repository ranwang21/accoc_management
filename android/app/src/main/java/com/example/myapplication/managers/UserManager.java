package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.User;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.PostJson;
import com.google.gson.Gson;

import java.util.ArrayList;


public class UserManager {

    /**
     * PRODUCT TABLE FIELDS
     */
//    String birthday;
//    String img_url;
//    String password;
    private static final String ID = "id";
    private static final String ID_ROLE = "id_role";
    private static final String FIRST_NAME = "first_name";
    private static final String LAST_NAME = "last_name";
    private static final String SEX = "sex";
    private static final String ADDRESS = "address";
    private static final String BIRTHDAY = "birthday";
    private static final String IMG_URL = "img_url";
    /**
     * PRODUCT TABLE'S QUERIES
     */
    private static final String queryGetAll = "select * from " + DataBaseHelper.USER_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where id like ?";
    private static final String queryGetByRole = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where role_id like ?";
    private static final String queryGetByEmail = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where email like ?";
    private static final String queryGetByEmailAndPassword = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where email like ? and password like ?";
    /**
     * getAll return all users from DataBase
     *
     * @param context
     * @return ArrayList<User>
     */
    public static ArrayList<User> getAll(Context context) {
        ArrayList<User> users = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            users.add(new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8))
            );
        }
        ConnectionBD.close();
        return users;
    }
    /**
     * getById return  User by id from DataBase
     *
     * @param context
     * @param id
     * @return User
     */
    public static User getById(Context context, int id) {
        User user = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        if (cursor != null) {
            cursor.moveToFirst();
            user = new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8));
        }
        ConnectionBD.close();
        return user;
    }
    /**
     * getByCategory return all users by roles from DataBase
     *
     * @param context
     * @param idRole
     * @return ArrayList<User>
     */
    public static ArrayList<User> getByRole(Context context, int idRole) {
        ArrayList<User> users = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByRole, new String[]{"" + idRole});
        while (cursor.moveToNext()) {
            users.add(new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8))
            );
        }
        ConnectionBD.close();
        return users;
    }
    /**
     * Insert user in DataBase
     *
     * @param context
     * @param user
     */
    public static void insert(Context context, User user) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, user.get_id());
        contentValues.put(ID_ROLE, user.getId_role());
        contentValues.put(FIRST_NAME, user.getFirst_name());
        contentValues.put(LAST_NAME, user.getLast_name());
        contentValues.put(SEX, user.getSex());
        contentValues.put(ADDRESS, user.getAddress());
        contentValues.put(BIRTHDAY, user.getBirthday());
        contentValues.put(IMG_URL, user.getImg_url());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.USER_TABLE_NAME, null, contentValues);
    }
    /**
     * Update user in Database
     *
     * @param context
     * @param user
     */
    public static void update(Context context, User user) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID_ROLE, user.getId_role());
        contentValues.put(FIRST_NAME, user.getFirst_name());
        contentValues.put(LAST_NAME, user.getLast_name());
        contentValues.put(SEX, user.getSex());
        contentValues.put(ADDRESS, user.getAddress());
        contentValues.put(BIRTHDAY, user.getBirthday());
        contentValues.put(IMG_URL, user.getImg_url());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.USER_TABLE_NAME, contentValues, ID + " = " + user.get_id(), null);
    }
    /**
     * Delete user from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, int id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.USER_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }
    public static void postToAPI(Context context, User user) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(user);
        String jsonFromApi = PostJson.post(jsonToSemd, "/users");
        User userFromApi = gson.fromJson(jsonFromApi, User.class);
        UserManager.insert(context, userFromApi);
    }
}
