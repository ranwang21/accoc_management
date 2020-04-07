package com.example.myapplication.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;

import com.example.myapplication.ProfilCollabActivity;
import com.example.myapplication.ProfilEnfantActivity;
import com.example.myapplication.R;
import com.example.myapplication.SuiviQuotidienActivity;
import com.example.myapplication.adapters.CollaborateurAdaptater;
import com.example.myapplication.adapters.EnfantAdapter;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.RoleManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.ConnectionBD;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.util.ArrayList;


public class ListesEnfants extends Fragment {

    ListView listView;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        EnfantAdapter enfantAdapter;
        ArrayList<User> users = new ArrayList<>();
        ArrayList<Role> roles = RoleManager.getAll(getContext());
        for (Role r : roles) {
            if (r.getTitle().equals("children")) {
                users = UserManager.getByRole(getContext(), r.get_id());
            }
        }
        if (users != null) {
            Log.d("Tag", "successs");
        }
        View view = inflater.inflate(R.layout.fragment_listes_enfants, container, false);
        listView = view.findViewById(R.id.list_enfant);
        enfantAdapter = new EnfantAdapter(getContext(), R.layout.collaborateur_listview, users);
        listView.setAdapter(enfantAdapter);
        enfantAdapter.notifyDataSetChanged();
        ArrayList<User> finalUsers = users;
        //spinner + sort by classroom
        Spinner spinner = view.findViewById(R.id.spinner_colab);
        ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
        ArrayList<String> listClassroom = new ArrayList<>();
        listClassroom.add("Tous");
        for (Classroom c : classrooms) {
            listClassroom.add(c.getTitle());
        }
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, listClassroom);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
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
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                User u = UserManager.getById(getContext(),finalUsers.get(position).getId_collaborater());
                Log.d("Json", "onItemClick: " + u.getFirst_name());
                String first_name = finalUsers.get(position).getFirst_name();
                String last_name = finalUsers.get(position).getLast_name();
                String birthday = finalUsers.get(position).getBirthday();
                String sexe = finalUsers.get(position).getSex();
                String address = finalUsers.get(position).getAddress();
                String image = finalUsers.get(position).getImg_url();
                Bundle bundle = new Bundle();
                bundle.putString("user_firstname", first_name);
                bundle.putString("user_lastname", last_name);
                bundle.putString("user_birthday", birthday);
                bundle.putString("user_sex", sexe);
                bundle.putString("user_address", address);
                bundle.putString("user_image", image);
                Intent intent = new Intent(getActivity(), ProfilEnfantActivity.class);
                intent.putExtra("bundle", bundle);
                startActivity(intent);
            }
        });
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Listes D'enfants ");
    }
}
