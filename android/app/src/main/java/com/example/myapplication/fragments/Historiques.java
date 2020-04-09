package com.example.myapplication.fragments;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CalendarView;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.adapters.EnfantAdapter;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.managers.UserManager;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


public class Historiques extends Fragment {

    Spinner spinner_salle;
    Spinner spinner_date;
    ListView listView;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        View view = inflater.inflate(R.layout.fragment_historique, container, false);
        ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
        ArrayList<String> listClassroom = new ArrayList<>();
        listClassroom.add("Tous");
        for (Classroom c : classrooms) {
            listClassroom.add(c.getTitle());
        }
        listView = view.findViewById(R.id.list_enfant_par_salle);
        ArrayList<User> users = UserManager.getAll(getContext());
        EnfantAdapter enfantAdapter = new EnfantAdapter(getContext(), R.layout.collaborateur_listview, users);
        listView.setAdapter(enfantAdapter);
        /** Spinner pour afficher par date  */
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T00:00:00Z'");
        Date date = new Date(System.currentTimeMillis());
        String dateString = formatter.format(date);
//        String dateString = sdf.format(date);
        ArrayList<Schedule> schedules = ScheduleManager.getAll(getContext());
        ArrayList<String> dateToDisplay = ScheduleManager.getUniquesDates(getContext(), dateString);
        ArrayAdapter<String> arrayAdapterdate = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, dateToDisplay);
        arrayAdapterdate.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner_date = view.findViewById(R.id.spinner_date);
        spinner_date.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String classroomName = parent.getItemAtPosition(position).toString();
                if (!classroomName.equals("Tous")) {
                    Classroom classroom = ClassroomManager.getByTitle(getContext(), classroomName);
//                    users = UserManager.getByIdClassroom(getContext(), classroom.get_id());
                }
//
//                }
//                ArrayList<Schedule> schedule = ScheduleManager.getByDateAndIdClassroom(getContext(), schedules.get(position).getDate(), classroomName);
//                for (Schedule shedul : schedule) {
//                    if (shedul.getId_user().equalsIgnoreCase("children")) {
//                        ArrayList<User> user = UserManager.getAll(getContext());
//                        for (User user1 : user) {
//                            String first_name = user1.getFirst_name();
//                            String last_name = user1.getFirst_name();
//                            String birthday = user1.getBirthday();
//                            String adresse = user1.getAddress();
//                            String sexe = user1.getSex();
//                        }
//                    }
//                }
//                Log.d("schedule", "schedule at position " + schedule);
//                Toast.makeText(getContext(), "Hello Javatpoint", Toast.LENGTH_SHORT).show();
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        spinner_salle = view.findViewById(R.id.spinner_salle);
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, listClassroom);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner_date.setAdapter(arrayAdapterdate);
        spinner_salle.setAdapter(arrayAdapter);
        spinner_salle.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String classroomName = parent.getItemAtPosition(position).toString();
                ArrayList<User> users = UserManager.getAll(getContext());
                if (!classroomName.equals("Tous")) {
                    Classroom classroom = ClassroomManager.getByTitle(getContext(), classroomName);
                    users = UserManager.getByIdClassroom(getContext(), classroom.get_id());
                }
                EnfantAdapter enfantAdapter = new EnfantAdapter(getContext(), R.layout.collaborateur_listview, users);
                listView.setAdapter(enfantAdapter);
                enfantAdapter.notifyDataSetChanged();
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Historiques ");
    }
}
