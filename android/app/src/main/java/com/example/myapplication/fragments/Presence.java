package com.example.myapplication.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import com.example.myapplication.R;
import com.example.myapplication.adapters.PresenceAdapter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public class Presence extends Fragment {
    List<String> listviewItems = new ArrayList<String>(Arrays.asList("one", "two", "three", "four"));

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        View view = inflater.inflate(R.layout.fragment_presence, container, false);


        ListView listView = view.findViewById(R.id.list_presence);
        /*
        ArrayAdapter<String> listViewAdapter = new ArrayAdapter<String>(
                getActivity(),
                android.R.layout.simple_list_item_checked,listviewItems
        );
        listView.setAdapter(listViewAdapter);*/
        PresenceAdapter adapter = new PresenceAdapter(getActivity(), listviewItems);
        listView.setAdapter(adapter);
        return view;
    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Presence");
    }
}
