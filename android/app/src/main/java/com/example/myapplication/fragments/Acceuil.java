package com.example.myapplication.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.myapplication.R;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;


public class Acceuil extends Fragment implements View.OnClickListener, View.OnLongClickListener {

    Button myBtn;
    Button myBtn1;
    Button myBtn2;
    Button myBtn3;
    Button myBtn4;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        View view = inflater.inflate(R.layout.fragment_acceuil, container, false);
        myBtn = view.findViewById(R.id.salle1);
        myBtn = view.findViewById(R.id.salle2);
        myBtn = view.findViewById(R.id.salle3);
        myBtn = view.findViewById(R.id.salle4);
        myBtn1 = view.findViewById(R.id.salle1);
        myBtn1.setOnClickListener(this);
        myBtn1.setOnLongClickListener(this);
        myBtn2 = view.findViewById(R.id.salle2);
        myBtn2.setOnClickListener(this);
        myBtn2.setOnLongClickListener(this);
        myBtn3 = view.findViewById(R.id.salle3);
        myBtn3.setOnClickListener(this);
        myBtn3.setOnLongClickListener(this);
        myBtn4 = view.findViewById(R.id.salle4);
        myBtn4.setOnClickListener(this);
        myBtn4.setOnLongClickListener(this);
        return view;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Acceuil");
    }

    @Override
    public void onClick(View view) {
        Fragment fragment = null;
        switch (view.getId()) {
            case R.id.salle1:
                fragment = new ListesEnfants();
                break;
            case R.id.salle2:
                fragment = new ListesEnfants();
                break;
            case R.id.salle3:
                fragment = new ListesEnfants();
                break;
            case R.id.salle4:
                fragment = new ListesEnfants();
                break;
            default:
                break;
        }
        if (fragment != null) {
            FragmentManager fragmentManager =getActivity().getSupportFragmentManager();
            FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();



            fragmentTransaction.add(R.id.acceui_layout, fragment).commit();
            fragmentTransaction.setPrimaryNavigationFragment(fragment);

    }
    }

    @Override
    public boolean onLongClick(View view) {
        switch (view.getId()) {
            case R.id.salle1:
                Toast.makeText(getActivity(), "status de la salle 1", Toast.LENGTH_SHORT).show();
                break;
            case R.id.salle2:
                Toast.makeText(getActivity(), "status de la salle 2", Toast.LENGTH_SHORT).show();
                break;
            case R.id.salle3:
                Toast.makeText(getActivity(), "status de la salle 3", Toast.LENGTH_SHORT).show();
                break;
            case R.id.salle4:
                Toast.makeText(getActivity(), "status de la salle 4", Toast.LENGTH_SHORT).show();
                break;
            default:
                break;
        }
        return false;
    }
}