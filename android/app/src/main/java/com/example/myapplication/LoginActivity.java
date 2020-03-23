package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.entities.Login;
import com.example.myapplication.entities.User;
import com.example.myapplication.helpers.ClassroomHelper;
import com.example.myapplication.helpers.EvaluationHelper;
import com.example.myapplication.helpers.InconsistencyHelper;
import com.example.myapplication.helpers.LoginHelper;
import com.example.myapplication.helpers.RoleHelper;
import com.example.myapplication.helpers.ScheduleHelper;
import com.example.myapplication.helpers.UserHelper;
import com.example.myapplication.managers.LoginManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.ConnectionBD;

import java.util.ArrayList;


public class LoginActivity extends AppCompatActivity {

    EditText edtEmail;
    EditText edtPassword;
    TextView tvErrorMessage;
    Button btnSignIn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        // tvErrorMessage = findViewById(R.id.tv_error_signin);
        edtEmail = findViewById(R.id.edt_email_signin);
        edtPassword = findViewById(R.id.edt_password_signin);
        btnSignIn = findViewById(R.id.btn_signin);
//        Login login = new Login("admin@gmail.com", "abc123...");
//        String token = LoginManager.getLoginToken(login, "");
//        String logoutSucess = LoginManager.logout();
////        RoleHelper.getFromAPI(ConnectionBD.getBd(LoginActivity.this), token);
////        UserHelper.getFromAPI(ConnectionBD.getBd(this),token);
////        LoginHelper.getFromAPI(ConnectionBD.getBd(this),token);
////        ClassroomHelper.getFromAPI(ConnectionBD.getBd(this),token);
////        ScheduleHelper.getFromAPI(ConnectionBD.getBd(this),token);
////        InconsistencyHelper.getFromAPI(ConnectionBD.getBd(this),token);
////        EvaluationHelper.getFromAPI(ConnectionBD.getBd(this),token);
////        ArrayList<User> users = UserManager.getAll(this);
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), Main2Activity.class);
                startActivity(intent);


            }
        });
    }
    public boolean allFieldsRequired(String strEditText1, String strEditText2) {
        if (TextUtils.isEmpty(strEditText1)) {
            errorMessageFieldsEmpty();
            return true;
        } else if (TextUtils.isEmpty(strEditText2)) {
            errorMessageFieldsEmpty();
            return true;
        }
        return false;
    }
    public void errorMessageFieldsEmpty() {
        tvErrorMessage.setVisibility(View.VISIBLE);
        tvErrorMessage.setText("* Enter your Email address and Password.");
    }
}
