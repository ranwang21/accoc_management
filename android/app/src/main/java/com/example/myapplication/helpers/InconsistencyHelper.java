//package com.example.myapplication.helpers;
//
//import android.database.sqlite.SQLiteDatabase;
//import android.util.Log;
//
//import com.example.myapplication.entities.Inconsistency;
//import com.example.myapplication.services.GetJson;
//import com.google.gson.Gson;
//import com.google.gson.reflect.TypeToken;
//
//import java.lang.reflect.Type;
//import java.util.ArrayList;
//
//
//public class InconsistencyHelper {
//    public static void getFromAPI(SQLiteDatabase db) {
//        String json = GetJson.get("/logins");
//        if (json != null) {
//            Gson gson = new Gson();
//            Type listType = new TypeToken<ArrayList<Inconsistency>>() {
//            }.getType();
//            ArrayList<Inconsistency> inconsistencies = gson.fromJson(json, listType);
//            for (Inconsistency I : inconsistencies) {
//                Log.d("JsonGetlistLogin", "id: " + l.get_id() + " title: " + l.getEmail());
//                db.execSQL("insert into " + DataBaseHelper.INCONSISTENCY_TABLE_NAME + " (id, id_user, email, password) values " + "('" + l.get_id() + "','" + l.getId_user() + "','" + l.getEmail() + "','" + l.getPassword() + "')");
//            }
//        }
//    }
//}
