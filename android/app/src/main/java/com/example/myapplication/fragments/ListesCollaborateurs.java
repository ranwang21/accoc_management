package com.example.myapplication.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.myapplication.ProfilCollabActivity;
import com.example.myapplication.ProfilEnfantActivity;
import com.example.myapplication.R;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public class ListesCollaborateurs extends Fragment {

    ListView listView;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        View view = inflater.inflate(R.layout.fragment_listes_collaborateurs, container, false);
        String[] listviewItems = {"first thing", "second thing", "third thing", "forth thing", "fifth thing"};
        listView = view.findViewById(R.id.list_collab);
        ArrayAdapter<String> listViewAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_activated_1, listviewItems
        );

        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Listes des collaborateurs  ");
    }
}
