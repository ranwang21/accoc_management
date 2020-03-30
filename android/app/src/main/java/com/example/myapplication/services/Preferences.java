package com.example.myapplication.services;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;


public class Preferences {

    public static String PREFERENCE_NAME = "SHOESPREFERENCES";
    public static String TOKEN = "TOKEN";
    public static String CONNEXION_VERSION = "VERSION";
    private static SharedPreferences sharedPreferences;
    private static SharedPreferences.Editor editor;
    private static Activity activity;
    public Preferences(Activity activity) {
        Preferences.activity = activity;
    }
    public void init() {
        sharedPreferences = activity.getPreferences(Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();
        editor.putString(TOKEN, "");
        editor.putInt(CONNEXION_VERSION, 1);
        editor.apply();
    }
    public static void incrementVersion() {
        SharedPreferences sharedPref = activity.getPreferences(Context.MODE_PRIVATE);
        editor.putInt(CONNEXION_VERSION, (sharedPref.getInt(CONNEXION_VERSION, 1)) + 1);
        editor.apply();
    }
    public static int getVersion() {
        SharedPreferences sharedPref = activity.getPreferences(Context.MODE_PRIVATE);
        int lo = sharedPref.getInt(CONNEXION_VERSION, 1);
        return lo;
    }
    public static void setToken(String token) {
        SharedPreferences sharedPref = activity.getPreferences(Context.MODE_PRIVATE);
        editor.putString(TOKEN, token);
        editor.apply();
    }
}
