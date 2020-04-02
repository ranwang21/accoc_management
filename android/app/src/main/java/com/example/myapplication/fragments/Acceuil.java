package com.example.myapplication.fragments;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Switch;
import android.widget.Toast;

import com.example.myapplication.LoginActivity;
import com.example.myapplication.Main2Activity;
import com.example.myapplication.R;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.managers.ClassroomManager;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import java.util.ArrayList;


public class Acceuil extends Fragment {

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
        View view = inflater.inflate(R.layout.fragment_acceuil, container, false);
        for (Classroom c : classrooms) {
            Button button = new Button(getContext());
            button.setText(c.getTitle().toLowerCase());
            button.setBackgroundResource(R.drawable.buttonshape);
            button.setTextAppearance(R.style.TextAppearance_AppCompat_Large);
            button.setTextSize(24);
            button.setTextColor(Color.parseColor("#019193"));
            button.setTypeface(Typeface.MONOSPACE);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(getContext(), LoginActivity.class);
                    startActivity(intent);
                    getActivity().finish();
                }
            });
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 30, 0, 0);
            button.setLayoutParams(params);
            LinearLayout ll_acceuil = view.findViewById(R.id.acceui_layout);
            ll_acceuil.addView(button);
        }
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Acceuil");
    }
//    @Override
//    public void onClick(View view) {
//        Fragment fragment = null;
//        switch (view.getId()) {
//            case R.id.salle1:
//                fragment = new ListesEnfants();
//                break;
//            case R.id.salle2:
//                fragment = new ListesEnfants();
//                break;
//            case R.id.salle3:
//                fragment = new ListesEnfants();
//                break;
//            case R.id.salle4:
//                fragment = new ListesEnfants();
//                break;
//            default:
//                break;
//        }
//        if (fragment != null) {
//            FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
//            FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
//            fragmentTransaction.add(R.id.acceui_layout, fragment).commit();
//            fragmentTransaction.setPrimaryNavigationFragment(fragment);
//        }
//    }
//    @Override
//    public boolean onLongClick(View view) {
//        switch (view.getId()) {
//            case R.id.salle1:
//                Toast.makeText(getActivity(), "status de la salle 1", Toast.LENGTH_SHORT).show();
//                break;
//            case R.id.salle2:
//                Toast.makeText(getActivity(), "status de la salle 2", Toast.LENGTH_SHORT).show();
//                break;
//            case R.id.salle3:
//                Toast.makeText(getActivity(), "status de la salle 3", Toast.LENGTH_SHORT).show();
//                break;
//            case R.id.salle4:
//                Toast.makeText(getActivity(), "status de la salle 4", Toast.LENGTH_SHORT).show();
//                break;
//            default:
//                break;
//        }
//        return false;
//    }
}