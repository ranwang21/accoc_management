package com.example.myapplication.fragments;

import android.content.Intent;
import android.content.SharedPreferences;
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
import com.example.myapplication.adapters.CheckboxAdapter;
import com.example.myapplication.adapters.PresenceAdapter;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.RoleManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.managers.UserManager;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public class Presence extends Fragment {
  //  List<String> listviewItems = new ArrayList<String>(Arrays.asList("one", "two", "three", "four"));
ListView listView;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

      PresenceAdapter presenceAdapter;
      ArrayList<User> users=new ArrayList<>();
      ArrayList<Role> roles = RoleManager.getAll(getContext());
      for (Role r:roles){
          if(r.getTitle().equals("children")){
              users= UserManager.getByRole(getContext(),r.get_id());
          }
      }
      if(users !=null){
          Log.d("Tag","success");
      }
      View view =inflater.inflate(R.layout.fragment_presence,container,false);
      listView =view.findViewById(R.id.list_presence);

      presenceAdapter=new PresenceAdapter(getContext(),R.layout.fragment_presence_row,users);
       listView.setAdapter(presenceAdapter);
       presenceAdapter.notifyDataSetChanged();
       ArrayList<User>finalUsers =users;
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
       CheckBox checkBox =view.findViewById(R.id.checkBox1);


        ArrayAdapter<String> listViewAdapter = new ArrayAdapter<String>(
                getContext(),
                android.R.layout.simple_list_item_checked
        );

        listView.setAdapter(listViewAdapter);
listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Schedule schedule=(Schedule)parent.getItemAtPosition(position);
        Toast.makeText(getContext(),"Clicked on row"+schedule.get_id(),Toast.LENGTH_LONG).show();
    }
});





        return view;
    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Presence");
    }
}
