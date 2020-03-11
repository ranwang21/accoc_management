package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Schedule;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class ScheduleHelper {

    public static void getFromAPI(SQLiteDatabase db) {
        String json = GetJson.get("/schedules");
        if (json != null) {
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<Schedule>>() {
            }.getType();
            ArrayList<Schedule> schedules = gson.fromJson(json, listType);
            for (Schedule s : schedules) {
                Log.d("JsonGetlistSchedule", "id: " + s.get_id() + " title: " + s.getDate());
                db.execSQL("insert into " + DataBaseHelper.SCHEDULE_TABLE_NAME + " (id, id_user, id_classroom, date, is_absent, comment) values " + "('" + s.get_id() + "','" + s.getId_user() + "','" + s.getId_classroom() + "','" + s.getDate() + "','" + s.getIs_absent() + "','" + s.getComment() + "')");
            }
        }
    }
}
