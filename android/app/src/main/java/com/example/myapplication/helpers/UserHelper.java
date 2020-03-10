package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.User;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class UserHelper {

    public static void getFromAPI(SQLiteDatabase db) {
        String json = GetJson.get("/users");
        if (json != null) {
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<User>>() {
            }.getType();
            ArrayList<User> users = gson.fromJson(json, listType);
            for (User u : users) {
                Log.d("JsonGetlistUser", "id: " + u.get_id() + " title: " + u.getFirst_name());
                db.execSQL("insert into " + DataBaseHelper.USER_TABLE_NAME + " (id, id_role, first_name, last_name, sex, address, birthday, img_url) values " + "('" + u.get_id() + "','" + u.getId_role() + "','" + u.getFirst_name() + "','" + u.getLast_name() + "','" + u.getSex() + "','" + u.getAddress() + "','" + u.getBirthday() + "','" + u.getImg_url() + "')");
            }
        }
    }
}
