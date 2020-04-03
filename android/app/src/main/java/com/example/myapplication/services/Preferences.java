package com.example.myapplication.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.example.myapplication.entities.User;


public class Preferences {

    public static String TOKEN = "TOKEN";
    public static String CONNEXION_VERSION = "VERSION";
    public static String USER_FIRSTNAME = "USER_FIRSTNAME";
    public static String USER_LASTNAME = "USER_LASTNAME";
    public static String USER_EMAIL = "USER_EMAIL";
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
    public static void setVersion(Context ctx, int version) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putInt(CONNEXION_VERSION, version);
        editor.commit();
    }
    public static void setToken(Context ctx, String token) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(TOKEN, token);
        editor.commit();
    }
    public static String getToken(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        String lo = sharedPref.getString(TOKEN, "");
        return lo;
    }
    public static void setUserInfos(Context ctx, User user, String email) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(USER_FIRSTNAME, user.getFirst_name());
        editor.putString(USER_LASTNAME, user.getLast_name());
        editor.putString(USER_EMAIL, email);
        editor.commit();
    }
    public static String getUserFirstName(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        String lo = sharedPref.getString(USER_FIRSTNAME, "");
        return lo;
    }
    public static String getUserLastName(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        String lo = sharedPref.getString(USER_LASTNAME, "");
        return lo;
    }
    public static String getUserEmail(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        String lo = sharedPref.getString(USER_EMAIL, "");
        return lo;
    }
}
