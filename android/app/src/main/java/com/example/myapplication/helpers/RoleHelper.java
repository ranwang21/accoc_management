package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Role;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class RoleHelper {

    public static void getFromAPI(SQLiteDatabase db) {
        String json = GetJson.get("/roles");
        if (json != null) {
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<Role>>() {
            }.getType();
            ArrayList<Role> roles = gson.fromJson(json, listType);
            for (Role r : roles) {
                Log.d("JsonGetlistRole", "id: " + r.get_id() + " title: " + r.getTitle());
                db.execSQL("insert into " + DataBaseHelper.ROLE_TABLE_NAME + " (id,title) values " + "('" + r.get_id() + "','" + r.getTitle() + "')");
            }
        }
    }
}
