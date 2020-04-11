package com.example.myapplication.fragments;

import android.content.Context;
import android.icu.text.Transliterator;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.adapters.PresenceAdapter;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Login;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.LoginManager;
import com.example.myapplication.managers.RoleManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.Preferences;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public class Presence extends Fragment {
ListView listView;
CheckBox checkBox;
Button btns;
String dateString;
ArrayList<User> users;
ArrayList<Schedule>schedules;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
/*date format with today date*/
        /*SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
        Date date =new Date(System.currentTimeMillis());
        dateString =format.format(date);*/
this.schedules=new ArrayList<Schedule>();
this.schedules.addAll(schedules);
        //user set up
      PresenceAdapter presenceAdapter;
        final ArrayList<User>[] users = new ArrayList[]{new ArrayList<>()};
      ArrayList<Role> roles = RoleManager.getAll(getContext());
      for (Role r:roles){
          if(r.getTitle().equals("children")){
              users[0] = UserManager.getByRole(getContext(),r.get_id());
          }
      }
      if(users[0] !=null){
          Log.d("Tag","success");
      }
      View view =inflater.inflate(R.layout.fragment_presence,container,false);
      listView =view.findViewById(R.id.list_presence);

      presenceAdapter=new PresenceAdapter(getContext(),R.layout.fragment_presence_row, users[0]);
       listView.setAdapter(presenceAdapter);
       presenceAdapter.notifyDataSetChanged();
        checkBox=view.findViewById(R.id.checkBox1);
       //spinner set up
        Spinner spinner=view.findViewById(R.id.spinner_presence);
       ArrayList<Classroom>classrooms= ClassroomManager.getAll(getContext());
       ArrayList<String>listClassroom =new ArrayList<>();
       listClassroom.add("Tous");
       for (Classroom c :classrooms){
           listClassroom.add(c.getTitle());
       }
        ArrayAdapter<String>arrayAdapter=new ArrayAdapter<>(getContext(),android.R.layout.simple_spinner_item,listClassroom);
       arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
       spinner.setAdapter(arrayAdapter);
       spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
         //filtred spinner

           @Override
           public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
               String classroomName = parent.getItemAtPosition(position).toString();
               ArrayList<User> users =UserManager.getAll(getContext());
               if(!classroomName.equals("Tous")){
                   Classroom classroom =ClassroomManager.getByTitle(getContext(),classroomName);
                   users=UserManager.getByIdClassroom(getContext(),classroom.get_id());
               }
               PresenceAdapter presenceAdapter =new PresenceAdapter(getContext(),R.layout.fragment_presence_row,users);
               listView.setAdapter(presenceAdapter);
               presenceAdapter.notifyDataSetChanged();

           }

           @Override
           public void onNothingSelected(AdapterView<?> parent) {

           }
       });

btns=view.findViewById(R.id.button_presence);
checkBox=view.findViewById(R.id.checkBox1);
      /*  ArrayAdapter<String>arrayAdapte=new ArrayAdapter<String>(getContext(),android.R.layout.simple_list_item_checked,schedules);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);

checkBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        CheckBox cb=buttonView.findViewById(R.id.checkBox1);
        Schedule schedule=(Schedule)cb.getTag();
        if(isChecked)
        Toast.makeText(getContext(),
                "Clicked on Checkbox: " + cb.getText() +
                        " is " + cb.isChecked(),
                Toast.LENGTH_LONG).show();
        schedule.setIs_absent(cb.isChecked());

    }
} );



Schedule sc=schedules.get(container.indexOfChild(checkBox));

checkBox.setChecked(sc.getIs_absent());
checkBox.setTag(sc);*/
        ArrayAdapter<String> listViewAdapter = new ArrayAdapter<String>(
                            getContext(),
                               android.R.layout.simple_list_item_checked
                             );
            listView.setAdapter(listViewAdapter);
            ArrayList<Schedule> schedules=ScheduleManager.getAll(getContext());
             for(Schedule sch:schedules){
                     Button btnSave=new Button(getContext());
                        btnSave.findViewById(R.id.button_presence);
                        btnSave.setOnClickListener(new View.OnClickListener() {
     @Override
                public void onClick(View v) {

         SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
         Date date =new Date(System.currentTimeMillis());
         dateString =format.format(date);



                                        Schedule schedule=new Schedule();
                                        schedule.setDate(dateString);
                                        ScheduleManager.insert(getContext(),schedule);
                                        //CheckboxAdapter checkboxAdapter =new CheckboxAdapter(getContext(),R.layout.fragment_presence_row,schedule.get_id());
                                               CheckBox checkBox=view.findViewById(R.id.checkBox1);
                                               checkBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                                                   @Override
                                                   public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                                                       CheckBox cb=buttonView.findViewById(R.id.checkBox1);
                                                       Schedule schedule=(Schedule)cb.getTag();
                                                       if(isChecked)
                                                           Toast.makeText(getContext(),
                                                                   "Clicked on Checkbox: " + cb.getText() +
                                                                           " is " + cb.isChecked(),
                                                                   Toast.LENGTH_LONG).show();
                                                       schedule.setIs_absent(cb.isChecked());

                                                   }
                                               } );
     Toast.makeText(getContext(), "Button Clicked", Toast.LENGTH_LONG).show();
                                    }
         });

                           }

        return view;
    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Presence");
    }
}
