package com.example.myapplication.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;


public class Preferences {

    public static String TOKEN = "TOKEN";
    public static String CONNEXION_VERSION = "VERSION";

    public static void incrementVersion(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putInt(CONNEXION_VERSION, (sharedPref.getInt(CONNEXION_VERSION, -1)) + 1);
        editor.commit();
    }
    public static int getVersion(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        int lo = sharedPref.getInt(CONNEXION_VERSION, -1);
        return lo;
    }
    public static void setToken(Context ctx, String token) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(TOKEN, token);
        editor.commit();
    }    public static void setVersion(Context ctx, int version) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putInt(CONNEXION_VERSION, version);
        editor.commit();
    }
}
