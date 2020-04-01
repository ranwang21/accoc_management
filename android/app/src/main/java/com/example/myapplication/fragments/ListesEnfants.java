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

import com.example.myapplication.ProfilEnfantActivity;
import com.example.myapplication.R;
import com.example.myapplication.SuiviQuotidienActivity;
import com.example.myapplication.adapters.CollaborateurAdaptater;
import com.example.myapplication.adapters.EnfantAdapter;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.User;
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
        ConnectionBD.copyBdFromAssets(getContext());
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

        /*ArrayAdapter<String> listViewAdapter = new ArrayAdapter<String>(
                getActivity(),
                android.R.layout.simple_list_item_activated_1, listviewItems
        );
        listView.setAdapter(listViewAdapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(getActivity(), ProfilEnfantActivity.class);
                startActivity(intent);
            }
        });*/
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Listes D'enfants ");
    }
}
