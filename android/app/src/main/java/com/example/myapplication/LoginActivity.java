package com.example.myapplication;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.entities.Login;
import com.example.myapplication.entities.User;
import com.example.myapplication.helpers.ClassroomHelper;
import com.example.myapplication.helpers.RoleHelper;
import com.example.myapplication.helpers.UserHelper;
import com.example.myapplication.managers.LoginManager;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.Preferences;


public class LoginActivity extends AppCompatActivity {

    EditText edtEmail;
    EditText edtPassword;
    //    TextView tvErrorMessage;
    Button btnSignIn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        // tvErrorMessage = findViewById(R.id.tv_error_signin);
        edtEmail = findViewById(R.id.edt_email_signin);
        edtPassword = findViewById(R.id.edt_password_signin);
        btnSignIn = findViewById(R.id.btn_signin);
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(this);
        SharedPreferences.Editor editor = sharedPref.edit();
        if (Preferences.getVersion(this) == -1) {
            Preferences.setVersion(this, 1);
        }
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    Preferences.incrementVersion(LoginActivity.this);
                    Login login = new Login(edtEmail.getText().toString(), edtPassword.getText().toString());
                    String token = LoginManager.getLoginToken(login, "");
                    Preferences.setToken(LoginActivity.this, token);
                    User user = LoginManager.getUserFromToken(token);
                    Preferences.setUserInfos(LoginActivity.this,user,edtEmail.getText().toString());
                    Intent intent = new Intent(getApplicationContext(), StartActivity.class);
                    startActivity(intent);
                    finish();
                } catch (Exception e) {
                    Toast.makeText(LoginActivity.this, "Login Failed!", Toast.LENGTH_SHORT).show();
                    Log.d("JsonErrorLogin", e.getMessage());
                }
            }
        });
    }
//    public boolean allFieldsRequired(String strEditText1, String strEditText2) {
//        if (TextUtils.isEmpty(strEditText1)) {
//            errorMessageFieldsEmpty();
//            return true;
//        } else if (TextUtils.isEmpty(strEditText2)) {
//            errorMessageFieldsEmpty();
//            return true;
//        }
//        return false;
//    }
//    public void errorMessageFieldsEmpty() {
//        tvErrorMessage.setVisibility(View.VISIBLE);
//        tvErrorMessage.setText("* Enter your Email address and Password.");
//    }
}
