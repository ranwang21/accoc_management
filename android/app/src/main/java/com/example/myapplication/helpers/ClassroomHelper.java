package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Classroom;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class ClassroomHelper {

    public static void getFromAPI(SQLiteDatabase db) {
        String json = GetJson.get("/classrooms");
        if (json != null) {
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<Classroom>>() {
            }.getType();
            ArrayList<Classroom> classrooms = gson.fromJson(json, listType);
            for (Classroom c : classrooms) {
                Log.d("JsonGetlistClassroom", "id: " + c.get_id() + " title: " + c.getTitle());
                db.execSQL("insert into " + DataBaseHelper.CLASSROOM_TABLE_NAME + " (id, title, phone, seat) values " + "('" + c.get_id() + "','" + c.getTitle() + "','" + c.getPhone() + "','" + c.getSeat() + "')");
            }
        }
    }
}
