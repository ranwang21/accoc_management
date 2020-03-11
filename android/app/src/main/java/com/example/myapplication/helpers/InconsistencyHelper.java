package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Inconsistency;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class InconsistencyHelper {

    public static void getFromAPI(SQLiteDatabase db) {
        String json = GetJson.get("/inconsistencies");
        if (json != null) {
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<Inconsistency>>() {
            }.getType();
            ArrayList<Inconsistency> inconsistencies = gson.fromJson(json, listType);
            for (Inconsistency i : inconsistencies) {
                Log.d("JsonGetInconsistencies", "id: " + i.get_id() + " title: " + i.getId_schedule());
                db.execSQL("insert into " + DataBaseHelper.INCONSISTENCY_TABLE_NAME + " (id, id_shcedule, id_child, id_collaborator) values " + "('" + i.get_id() + "','" + i.getId_schedule() + "','" + i.getId_child() + "','" + i.getId_collaborator() + "')");
            }
        }
    }
}
