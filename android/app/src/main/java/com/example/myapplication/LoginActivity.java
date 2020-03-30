package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.entities.Login;
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
        Preferences preferences = new Preferences(LoginActivity.this);
        preferences.init();
        Log.d("Json", "onCreate: "+preferences.getVersion());;
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    preferences.incrementVersion();
                    Login login = new Login(edtEmail.getText().toString(), edtPassword.getText().toString());
                    String token = LoginManager.getLoginToken(login, "");
                    RoleHelper.getFromAPI(ConnectionBD.getBd(LoginActivity.this), token);
                    UserHelper.getFromAPI(ConnectionBD.getBd(LoginActivity.this), token);
                    ClassroomHelper.getFromAPI(ConnectionBD.getBd(LoginActivity.this), token);
                    Preferences.setToken(token);
                    Intent intent = new Intent(getApplicationContext(), Main2Activity.class);
                    startActivity(intent);
                } catch (Exception e) {
                    Toast.makeText(LoginActivity.this, "Login Failed!", Toast.LENGTH_SHORT).show();
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
