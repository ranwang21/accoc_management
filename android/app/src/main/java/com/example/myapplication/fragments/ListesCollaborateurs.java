package com.example.myapplication.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.myapplication.R;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.RoleManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.ConnectionBD;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.util.ArrayList;


public class ListesCollaborateurs extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        ConnectionBD.copyBdFromAssets(getContext());
        ArrayList<User> users = null;
        ArrayList<Role> roles = RoleManager.getAll(getContext());
        for (Role r : roles) {
            if (r.getTitle().equals("collaborator")) {
                //  users = UserManager.getByRole(getContext(),r.get_id());
            }
        }
        View view = inflater.inflate(R.layout.fragment_listes_collaborateurs, container, false);
        //String[] listviewItems = {"first thing", "second thing", "third thing", "forth thing", "fifth thing"};
        ListView listView = view.findViewById(R.id.list_collab);
//        ArrayAdapter<String> listViewAdapter = new ArrayAdapter<String>(
//                getActivity(),
//                android.R.layout.simple_list_item_activated_1, listviewItems
//        );
//        listView.setAdapter(listViewAdapter);
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Listes des collaborateurs  ");
    }
}
