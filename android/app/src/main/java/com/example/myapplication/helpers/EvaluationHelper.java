package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Evaluation;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class EvaluationHelper {
    public static void getFromAPI(SQLiteDatabase db) {
        String json = GetJson.get("/evaluations");
        if (json != null) {
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<Evaluation>>() {
            }.getType();
            ArrayList<Evaluation> evaluations = gson.fromJson(json, listType);
            for (Evaluation e : evaluations) {
                Log.d("JsonGetlistEvaluation", "id: " + e.get_id() + " title: " + e.getId_schedule());
                db.execSQL("insert into " + DataBaseHelper.EVALUATION_TABLE_NAME + " (id, id_schedule) values " + "('" + e.get_id() + "','" + e.getId_schedule() + "')");
            }
        }
    }
}
